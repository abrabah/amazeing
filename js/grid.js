import colormap from "./colors";

//TODO: does kernels belong here?
const kernels = {
  blueWhiteRed: {
    width: 2,
    height: 2,
    map: [[colormap.red, colormap.blue], [colormap.blue, colormap.background]]
  }
};

export const GRID_DESCRIPTION = {
  WALL_CLOSED: "wc",
  WALL_OPEN: "wo",
  PILLAR: "pi",
  ROOM: "r",
  ROOM_ON_PATH: "ro_p"
};

export const generateGrid = ({
  seed,
  isWall = ({ seed, point }) => seed[point[0]][point[1]] === colormap.blue,
  isRoom = ({ seed, point }) =>
    seed[point[0]][point[1]] === colormap.background,
  isPillar = ({ seed, point }) => seed[point[0]][point[1]] === colormap.red
}) =>
  seed.map((column, x) =>
    column.map((elm, y) => {
      const point = [x, y];
      if (isWall({ seed, point })) return GRID_DESCRIPTION.WALL_CLOSED;
      if (isRoom({ seed, point })) return GRID_DESCRIPTION.ROOM;
      if (isPillar({ seed, point })) return GRID_DESCRIPTION.PILLAR;

      throw Error(`unknown type detected at ${point}`);
    })
  );

export const generateSeed = ({
  gridHeight,
  gridWidth,
  kernel = kernels.blueWhiteRed
}) => {
  return new Array(gridWidth)
    .fill(0)
    .map((_, x) =>
      new Array(gridHeight)
        .fill(0)
        .map((_, y) => kernel.map[x % kernel.width][y % kernel.height])
    );
};
