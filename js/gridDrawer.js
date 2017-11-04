export default ({ ctx, width, height, grid }) => {
  //TODO determine width and height of each rectangle..
  // TODO

  const boardHeight = grid.length;
  const boardWidth = grid.length > 0 ? grid[0].length : 0;

  const rectWidth = Math.ceil(width / boardWidth);
  const rectHight = Math.ceil(height / boardHeight);

  for (let i = 0; i < boardWidth; i++) {
    for (let j = 0; j < boardHeight; j++) {
      const x_start = i * rectWidth;
      const y_start = j * rectHight;

      ctx.moveTo(x_start, y_start);
      ctx.fillStyle = grid[j][i];
      ctx.fillRect(x_start, y_start, rectWidth, rectHight);
    }
  }
};
