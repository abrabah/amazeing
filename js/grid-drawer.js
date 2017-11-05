export const drawSeed = ({
  ctx,
  canvasHeight,
  canvasWidth,
  seed,
  seedWidth,
  seedHeight
}) => {
  const rectWidth = Math.floor(canvasWidth / seedHeight);
  const rectHight = Math.floor(canvasWidth / seedWidth);

  for (let x = 0; x < seedWidth; x++) {
    for (let y = 0; y < seedHeight; y++) {
      const x_start = x * rectWidth;
      const y_start = y * rectHight;

      ctx.moveTo(x_start, y_start);
      ctx.fillStyle = seed[x][y];
      ctx.fillRect(x_start, y_start, rectWidth, rectHight);
    }
  }
};

//TODO: create drawGrid (same as drawSeed only the colors have to be mapped)
