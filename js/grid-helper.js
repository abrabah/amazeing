import { GRID_DESCRIPTION } from "./grid";

export const containsPoint = ([x, y] = point) => ([_x, _y] = otherPoint) =>
  _x == x && _y == y;

export const findRoomsNotOnPath = ({ grid, candidates = [] }) =>
  candidates.filter(([x, y]) => grid[y][x] !== GRID_DESCRIPTION.ROOM_ON_PATH);

export const findNeighborsOfType = ({
  grid,
  point,
  types = [GRID_DESCRIPTION.ROOM]
}) =>
  [[0, -1], [-1, 0], [1, 0], [0, 1]]
    .map(([x, y] = elm) => [x + point[0], y + point[1]])
    .filter(([x, y] = point) => grid[y] && types.includes(grid[y][x]));

const getRooms = (row, row_number) =>
  row
    .filter(
      elm => elm === GRID_DESCRIPTION.ROOM || GRID_DESCRIPTION.ROOM_ON_PATH
    )
    .map((elm, x) => [x, row_number]);

export const listIndicesOfAllRooms = grid =>
  grid.reduce(
    (acc, row, row_number) => acc.concat(getRooms(row, row_number)),
    []
  );
