import { GRID_DESCRIPTION } from "./grid";
import "babel-polyfill";
import {
  MAZE_HEIGHT,
  MAZE_WIDTH,
  WALL_STRATEGY,
  ROOM_STRATEGY
} from "./config";
import colors from "./colors";

const findNeighborWalls = ({ grid, point }) =>
  findNeighborsOfType({
    grid,
    point,
    types: [GRID_DESCRIPTION.WALL_CLOSED]
  });

//TODO: padd grid to ensure that to ensure that the the maze is walled in?
export function* carveMaze({
  grid,
  selectStartRoom = ROOM_STRATEGY,
  selectWallToWisit = WALL_STRATEGY
}) {
  const rooms = grid.findIndexOfType([
    GRID_DESCRIPTION.ROOM,
    GRID_DESCRIPTION.ROOM_ON_PATH
  ]);

  const startPosition =
    rooms[
      selectStartRoom({
        grid,
        rooms
      })
    ];

  console.log(
    `generating maze from pos (${startPosition[0]}, ${startPosition[1]})`
  );

  grid.set(startPosition, GRID_DESCRIPTION.ROOM_ON_PATH);

  yield [[...startPosition, colors.room]];

  const wallsToWisit = grid.findNeighborsOfType({
    point: startPosition,
    types: [GRID_DESCRIPTION.WALL_CLOSED]
  });

  while (wallsToWisit.length > 0) {
    const index = selectWallToWisit({
      walls: wallsToWisit,
      start: startPosition
    });
    const [wall] = wallsToWisit.splice(index, 1);

    const adjacentRooms = grid.findNeighborsOfType({
      point: wall,
      types: [GRID_DESCRIPTION.ROOM, GRID_DESCRIPTION.ROOM_ON_PATH]
    });

    if (adjacentRooms.length == 2) {
      const roomsNotOnPath = adjacentRooms.filter(
        adjacentRooms => adjacentRooms[2] === GRID_DESCRIPTION.ROOM
      );

      if (roomsNotOnPath.length == 1) {
        grid.set(wall, GRID_DESCRIPTION.WALL_OPEN);

        const roomNotOnPath = roomsNotOnPath.pop();
        grid.set(roomNotOnPath, GRID_DESCRIPTION.ROOM_ON_PATH);

        grid
          .findNeighborsOfType({
            point: roomNotOnPath,
            types: [GRID_DESCRIPTION.WALL_CLOSED]
          })
          .forEach(elm => wallsToWisit.push(elm));
        yield [[...wall, colors.wall], [...roomNotOnPath, colors.wall]];
      }
    }
  }
}
