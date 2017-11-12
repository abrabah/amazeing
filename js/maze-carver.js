import { GRID_DESCRIPTION } from "./grid";
import "babel-polyfill";
import { MAZE_HEIGHT, MAZE_WIDTH } from "./config";
import colors from "./colors";

import {
  findNeighborsOfType,
  findRoomsNotOnPath,
  listIndicesOfAllRooms
} from "./grid-helper";

const findNeighborWalls = ({ grid, point }) =>
  findNeighborsOfType({
    grid,
    point,
    types: [GRID_DESCRIPTION.WALL_CLOSED]
  });

//TODO: padd grid to ensure that to ensure that the the maze is walled in?
export function* carveMaze({
  grid,
  selectStartRoom = ({ grid, rooms }) => rooms[0],
  selectWallToWisit = walls => Math.floor(Math.random() * walls.length)
}) {
  const startPosition = selectStartRoom({
    grid,
    rooms: grid.findIndexOfType([
      GRID_DESCRIPTION.ROOM,
      GRID_DESCRIPTION.ROOM_ON_PATH
    ])
  });

  grid.set(startPosition, GRID_DESCRIPTION.ROOM_ON_PATH);

  yield [[...startPosition, colors.background]];

  const wallsToWisit = grid.findNeighborsOfType({
    point: startPosition,
    types: [GRID_DESCRIPTION.WALL_CLOSED]
  });

  while (wallsToWisit.length > 0) {
    const index = selectWallToWisit(wallsToWisit);
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
        yield [
          [...wall, colors.background],
          [...roomNotOnPath, colors.background]
        ];
      }
    }
  }
}
