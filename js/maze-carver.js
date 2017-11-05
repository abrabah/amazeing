import { GRID_DESCRIPTION } from "./grid";
import {
  findNeighborsOfType,
  findRoomsNotOnPath,
  listIndicesOfAllRooms
} from "./grid-helper";

const findNeighborWalls = ({ grid, point }) =>
  findNeighborsOfType({
    grid,
    point,
    types: [GRID_DESCRIPTION.CLOSED_WALL_TYPE]
  });

//TODO: padd grid to ensure that to ensure that the the maze is walled in?
export const carveMaze = ({
  grid,
  gridWidth,
  gridHeight,
  selectStartRoom = ({ grid, rooms }) => rooms[0],
  selectWallToWisit = walls => 0
}) => {
  const startPosition = selectStartRoom({
    grid,
    rooms: listIndicesOfAllRooms(grid)
  });
  grid[startPosition[1]][startPosition[0]] = GRID_DESCRIPTION.ROOM_ON_PATH;

  const wallsToWisit = [findNeighborWalls({ grid, point: startPosition })];

  while (wallsToWisit.length > 0) {
    const { index } = selectWallToWisit(wallsToWisit);
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
        grid[wall.y][wall.x] = GRID_DESCRIPTION.WALL_OPEN;
        const [roomNotNotPath_x, roomNotOnPath_y] = roomsNotOnPath.pop();
        grid[roomNotOnPath_y][roomNotNotPath_x] = GRID_DESCRIPTION.ROOM_ON_PATH;
      }
    }
  }
};
