import { drawSeed, drawGrid } from "./js/grid-drawer";
import { generateSeed, generateGrid } from "./js/grid";
import { carveMaze } from "./js/maze-carver";

const canvasWidth = 500;
const canvasHeight = 500;

const gridWidth = 63;
const gridHeight = 63;

function initCanvasAndReturn2dContext(canvasId) {
  const canvas = document.querySelector(canvasId);
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  const context = canvas.getContext("2d");

  return context;
}
//TODO: rename grid to seed?
window.onload = () => {
  const ctx = initCanvasAndReturn2dContext("#canvas-seed");

  const seed = generateSeed({ gridHeight, gridWidth });

  drawSeed({
    ctx,
    canvasHeight,
    canvasWidth,
    seed,
    seedHeight: gridHeight,
    seedWidth: gridWidth
  });

  const grid = generateGrid({ seed });
  carveMaze({
    grid,
    gridWidth,
    gridHeight
  });

  const maze_ctx = initCanvasAndReturn2dContext("#canvas-maze");
  drawGrid({
    ctx: maze_ctx,
    canvasHeight,
    canvasWidth,
    grid,
    gridHeight,
    gridWidth
  });
};
