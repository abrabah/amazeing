import { GRID_DESCRIPTION } from "./grid";

const elementsNotContained = (array, elements) =>
  elements.filter(!Array.includes);
const findAdjacentWalls = ({ grid, point, blacklist }) => {
  // find all adjacent rooms in grid given point = {x,y}
  // return any such walls not contained in the blacklist
  return [];
};

const findAdjacentRooms = ({ grid, point = { x, y } }) =>
  [1, 0, -1]
    .reduce(
      (acc, _x) =>
        acc.concat(
          [1, 0, -1].map(_y => {
            return { _x, _y };
          })
        ),
      []
    )
    .filter((point = { _x, _y }) => !(_x == 0 && _y == 0))
    .map((point = { _x, _y }) => {
      return { x: x + _x, y: y + _y };
    })
    .filter((point = { _x, _y }) => grid[_y][_x] === GRID_DESCRIPTION.ROOM);

const selectWallToWisit = walls => {
  // given a list of walls = [ {x,y}, ... ]. select the wall to wisit
  // this can be done randomly..
  if (walls.length == 0)
    throw Error("oh, the list of possible walls to wisit first is empty :/");
  else return walls[0];
};

const selectStartRoom = rooms => {
  // given a list of rooms = [ {x,y}, ... ]. select the first room to wisit
  // this can be done randomly..
  if (walls.length == 0)
    throw Error("oh, the list of possible rooms to wisit first is empty :/");
  else return rooms[0];
};

export const listRooms = seed =>
  seed.reduce((acc, row, y) =>
    acc.concat(
      row
        .map((elm, x) => ({ x, y }))
        .filter(({ x, y }) => grid[y][x] === GRID_DESCRIPTION.ROOM),
      []
    )
  );

//TODO: padd grid to ensure that to ensure that the the maze is walled in?
export default ({
  grid,
  gridWidth,
  gridHeight,
  selectStartRoom = selectStartRoom,
  findAdjacentWalls = findAdjacentWalls,
  selectWallToWisit = selectWallToWisit
}) => {
  // convert grid to maze, carve out maze..

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
