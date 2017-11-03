import colormap from "./colors";
import { MAZE_HEIGHT, MAZE_WIDTH } from "./config";

import Array2d from "./array2d";

//TODO: does kernels belong here?
const kernels = {
  blueWhiteRed: {
    width: 2,
    height: 2,
    map: [[colormap.pillar, colormap.wall], [colormap.wall, colormap.room]]
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
  isWall = ({ seed, point, elm }) => elm === colormap.wall,
  isRoom = ({ seed, point, elm }) => elm === colormap.room,
  isPillar = ({ seed, point, elm }) => elm === colormap.pillar
}) =>
  seed.map((point, elm) => {
    if (isWall({ seed, point, elm })) return GRID_DESCRIPTION.WALL_CLOSED;
    if (isRoom({ seed, point, elm })) return GRID_DESCRIPTION.ROOM;
    if (isPillar({ seed, point, elm })) return GRID_DESCRIPTION.PILLAR;
    throw Error(`unknown type detected at ${point}`);
  });

export const generateSeed = (kernel = kernels.blueWhiteRed) => {
  const arr = new Array2d(MAZE_WIDTH, MAZE_HEIGHT);

  for (let x = 0; x < arr.width; x++) {
    for (let y = 0; y < arr.height; y++) {
      arr.set([x, y], kernel.map[x % kernel.width][y % kernel.height]);
    }
  }
  return arr;
};
