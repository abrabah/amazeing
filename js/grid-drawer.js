import { GRID_DESCRIPTION } from "./grid";
import colormap from "./colors";
import { CANVAS_HEIGHT, CANVAS_WIDTH, GRID_HEIGHT, GRID_WIDTH } from "./config";

const draw = ({ ctx, array2d }) => {
  const rectWidth = Math.floor(CANVAS_WIDTH / GRID_WIDTH);
  const rectHight = Math.floor(CANVAS_HEIGHT / GRID_HEIGHT);

  for (let x = 0; x < GRID_WIDTH; x++) {
    for (let y = 0; y < GRID_HEIGHT; y++) {
      const x_start = x * rectWidth;
      const y_start = y * rectHight;

      ctx.fillStyle = array2d[x][y];
      ctx.fillRect(x_start, y_start, rectWidth, rectHight);
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

const pointHeight = Math.floor(CANVAS_WIDTH / GRID_WIDTH);
const pointWidth = Math.floor(CANVAS_HEIGHT / GRID_HEIGHT);

export const drawPoint = ({
  ctx,
  points,
  pointWidth = Math.floor(CANVAS_WIDTH / GRID_WIDTH),
  pointHeight = Math.floor(CANVAS_HEIGHT / GRID_HEIGHT)
}) => {
  points.forEach(([x, y, fillColor] = point) => {
    ctx.fillStyle = fillColor;
    ctx.fillRect(x * pointWidth, y * pointHeight, pointWidth, pointHeight);
  });
};
