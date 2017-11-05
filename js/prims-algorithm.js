import { GRID_DESCRIPTION } from "./grid";
import { findNeighborsOfType, listRooms } from "./grid-helper";

const elementsNotContained = (array, elements) =>
  elements.filter(!Array.includes);

const findAdjacentWalls = ({ grid, point, blacklist }) => {
  // find all adjacent rooms in grid given point = [x,y}
  // return any such walls not contained in the blacklist
  return [];
};

//TODO: padd grid to ensure that to ensure that the the maze is walled in?
export default ({
  grid,
  gridWidth,
  gridHeight,
  selectStartRoom = rooms => rooms[0],
  selectWallToWisit = walls => 0
}) => {
  const path = [selectStartRoom({ grid, rooms: listRooms(grid) })];

  if (path.length == 0)
    throw Error("no start room selected.. Cannot continue :/ ");

  const wallsToWisit = [findAdjacentWalls(grid, path[0], [])];

  while (wallsToWisit.length > 0) {
    const { index } = selectWallToWisit(wallsToWisit);
    const [wall] = wallsToWisit.splice(index, 1);

    const adjacentRooms = findAdjacentRooms({ grid, x: wall.x, y: wall.y });

    if (adjacentRooms.length == 2) {
      const roomsNotInPath = elementsNotContained(path, adjacentRooms);
      if (roomsNotInPath.length == 1) {
        openWalls.push(wall);
        path.append(roomsNotInPath[0]);
        findAdjacentWalls(grid, roomsNotInPath[0], path).forEach(
          wallsToWisit.append
        );
      }
    }
  }
};
