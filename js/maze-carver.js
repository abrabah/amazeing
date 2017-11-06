import { GRID_DESCRIPTION } from "./grid";
import "babel-polyfill";
import { GRID_HEIGHT, GRID_WIDTH } from "./config";

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
    rooms: listIndicesOfAllRooms(grid)
  });
  grid[startPosition[0]][startPosition[1]] = GRID_DESCRIPTION.ROOM_ON_PATH;

  const wallsToWisit = findNeighborWalls({ grid, point: startPosition });

  while (wallsToWisit.length > 0) {
    const index = selectWallToWisit(wallsToWisit);
    const [wall] = wallsToWisit.splice(index, 1);

    const adjacentRooms = findNeighborsOfType({
      grid,
      point: wall,
      types: [GRID_DESCRIPTION.ROOM, GRID_DESCRIPTION.ROOM_ON_PATH]
    });

    if (adjacentRooms.length == 2) {
      const roomsNotOnPath = findRoomsNotOnPath({
        grid,
        candidates: adjacentRooms
      });

      if (roomsNotOnPath.length == 1) {
        grid[wall[0]][wall[1]] = GRID_DESCRIPTION.WALL_OPEN;
        const roomNotOnPath = roomsNotOnPath.pop();
        grid[roomNotOnPath[0]][roomNotOnPath[1]] =
          GRID_DESCRIPTION.ROOM_ON_PATH;
        findNeighborWalls({ grid, point: roomNotOnPath }).forEach(elm =>
          wallsToWisit.push(elm)
        );
        yield grid;
      }
    }
  }
}
