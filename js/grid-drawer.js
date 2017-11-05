import { GRID_DESCRIPTION } from "./grid";
import colormap from "./colors";

const draw = ({
  ctx,
  canvasHeight,
  canvasWidth,
  array2d,
  arrayWidth,
  arrayHeight
}) => {
  const rectWidth = canvasWidth / arrayWidth;
  const rectHight = canvasWidth / arrayHeight;

  for (let x = 0; x < arrayWidth; x++) {
    for (let y = 0; y < arrayHeight; y++) {
      const x_start = x * rectWidth;
      const y_start = y * rectHight;

      ctx.moveTo(x_start, y_start);
      ctx.fillStyle = array2d[x][y];
      ctx.fillRect(x_start, y_start, rectWidth, rectHight);
    }
  }
};

export const drawSeed = ({
  ctx,
  canvasHeight,
  canvasWidth,
  seed,
  seedWidth,
  seedHeight
}) => {
  draw({
    ctx,
    canvasHeight,
    canvasWidth,
    array2d: seed,
    arrayWidth: seedWidth,
    arrayHeight: seedHeight
  });
};

export const drawGrid = ({
  ctx,
  canvasHeight,
  canvasWidth,
  grid,
  gridHeight,
  gridWidth
}) => {
  const coloredGrid = grid.map((column, y) =>
    column.map((elm, x) => {
      switch (elm) {
        case GRID_DESCRIPTION.ROOM_ON_PATH:
        case GRID_DESCRIPTION.WALL_OPEN:
          return colormap.background;
        case GRID_DESCRIPTION.WALL_CLOSED:
          return colormap.foreground;
        default:
          // console.log(`got illegal grid description ${elm} at [${x},${y}]`);
          return colormap.red;
      }
    })
  );

  draw({
    ctx,
    canvasHeight,
    canvasWidth,
    array2d: coloredGrid,
    arrayHeight: gridHeight,
    arrayWidth: gridWidth
  });
};
