import colormap from "./colors";

//TODO: does kernels belong here?
const kernels = {
  blueWhite: {
    width: 2,
    height: 2,
    map: [
      [colormap.blue, colormap.white],
      [colormap.white, colormap.blue],
      [colormap.blue, colormap.white]
    ]
  }
};

export const GRID_DESCRIPTION = {
  WALL_CLOSED: 0,
  WALL_OPEN: 1,
  PILLAR: 2,
  ROOM: 3,
  ROOM_ON_PATH: 4
};

export const generateGrid = ({ seed, isWall, isRoom, isPillar }) =>
  seed.map((row, y) =>
    row.map((elm, c) => {
      if (isWall({ grid, point })) return GRID_DESCRIPTION.WALL_CLOSED;

      if (isRoom({ grid, pont })) return GRID_DESCRIPTION.ROOM;

      if (isPillar({ grid, point })) return GRID_DESCRIPTION.PILLAR;

      throw Error(`unknown type detected at ${point}`);
    })
  );

export const generateSeed = ({
  gridHeight,
  gridWidth,
  kernel = kernels.blueWhite
}) => {
  return new Array(gridHeight)
    .fill(0)
    .map((_, y) =>
      new Array(gridWidth)
        .fill(0)
        .map((_, x) => kernel.map[x % kernel.width][y % kernel.height])
    );
};
