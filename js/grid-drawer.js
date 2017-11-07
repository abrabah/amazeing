import { GRID_DESCRIPTION } from "./grid";
import colormap from "./colors";
import { DOT_HEIGHT, DOT_WIDTH, MAZE_HEIGHT, MAZE_WIDTH } from "./config";

const draw = ({ ctx, array2d }) => {
  for (let x = 0; x < MAZE_WIDTH; x++) {
    for (let y = 0; y < MAZE_HEIGHT; y++) {
      const x_start = x * DOT_WIDTH;
      const y_start = y * DOT_HEIGHT;

      ctx.fillStyle = array2d[x][y];
      ctx.fillRect(x_start, y_start, DOT_WIDTH, DOT_HEIGHT);
    }
  }
};

export const drawSeed = ({ ctx, seed }) => {
  draw({
    ctx,
    array2d: seed
  });
};

export const drawGrid = ({ ctx, grid }) => {
  const coloredGrid = grid.map((column, y) =>
    column.map((elm, x) => {
      switch (elm) {
        case GRID_DESCRIPTION.ROOM_ON_PATH:
        case GRID_DESCRIPTION.WALL_OPEN:
          return colormap.background;
        case GRID_DESCRIPTION.WALL_CLOSED:
        case GRID_DESCRIPTION.PILLAR:
          return colormap.violet;
        default:
          return colormap.red;
      }
    })
  );

  draw({
    ctx,
    array2d: coloredGrid
  });
};

export const drawPoint = ({
  ctx,
  points,
  pointWidth = DOT_WIDTH,
  pointHeight = DOT_HEIGHT
}) => {
  points.forEach(([x, y, fillColor] = point) => {
    ctx.fillStyle = fillColor;
    ctx.fillRect(x * pointWidth, y * pointHeight, pointWidth, pointHeight);
  });
};
