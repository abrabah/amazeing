const elementsNotContained = (array, elements) =>
  elements.filter(!Array.includes);
const findAdjacentWalls = ({ grid, point, blacklist }) => {
  // find all adjacent rooms in grid given point = {x,y}
  // return any such walls not contained in the blacklist
  return [];
};

const findAdjacentRooms = ({ grid, point }) => {
  // find all adjacent rooms in grid given point = {x,y}
  return [];
};

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

const listRooms = grid => {
  // return a list of all the rooms = [ {x,y}, ..] in the grid.
  //     export const listRooms = ({ grid, isRoom }) => grid.reduce((acc, row, y) =>
  //     acc.concat(
  //         row.map((elm, x) => ({x, y}))
  //         .filter(({x,y}) => isRoom({grid,x,y}))),
  // []);

  return [];
};

export default ({
  grid,
  gridWidth,
  gridHeight,
  //startpos padding prodection?
  selectStartRoom = selectStartRoom,
  findAdjacentWalls = findAdjacentWalls,
  findAdjacentRooms = findAdjacentRooms,
  selectWallToWisit = selectWallToWisit,
  listRooms = listRooms
}) => {
  const path = [selectStartRoom({ grid, rooms: listRooms(grid) })];

  if (path.length == 0)
    throw Error("no start room selected.. Cannot continue :/ ");

  const wallsToWisit = [findAdjacentWalls(grid, path[0], [])];
  const openWalls = [];

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
