import { GRID_DESCRIPTION } from "./grid";

export const containsPoint = ([x, y] = point) => ([_x, _y] = otherPoint) =>
  _x == x && _y == y;

export const findRoomsNotOnPath = ({ grid, candidates = [] }) =>
  candidates.filter(([x, y]) => grid[x][y] === GRID_DESCRIPTION.ROOM);

export const findNeighborsOfType = ({
  grid,
  point,
  types = [GRID_DESCRIPTION.ROOM]
}) =>
  [[0, -1], [-1, 0], [1, 0], [0, 1]]
    .map(([x, y] = elm) => [x + point[0], y + point[1]])
    .filter(([x, y] = point) => grid[x] && types.includes(grid[x][y]));

const getRooms = (column, column_number) =>
  column
    .map((elm, y) => {
      return { elm, point: [column_number, y] };
    })
    .filter(
      ({ elm }) =>
        elm === GRID_DESCRIPTION.ROOM || elm === GRID_DESCRIPTION.ROOM_ON_PATH
    )
    .map(({ point }) => point);

export const listIndicesOfAllRooms = grid =>
  grid.reduce(
    (acc, column, column_number) => acc.concat(getRooms(column, column_number)),
    []
  );
