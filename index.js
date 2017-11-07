import { drawSeed, drawPoint } from "./js/grid-drawer";
import { generateSeed, generateGrid } from "./js/grid";
import { carveMaze } from "./js/maze-carver";
import { Animator } from "./js/animator";
import colorMap from "./js/colors";

import {
  GRID_HEIGHT,
  GRID_WIDTH,
  CANVAS_HEIGHT,
  CANVAS_WIDTH
} from "./js/config";

function initCanvasAndReturn2dContext(canvasId) {
  const canvas = document.querySelector(canvasId);
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  const context = canvas.getContext("2d");

  return context;
}

window.onload = () => {
  const ctx = initCanvasAndReturn2dContext("#canvas-seed");

  const seed = generateSeed();

  drawSeed({
    ctx,
    canvasHeight: CANVAS_HEIGHT,
    canvasWidth: CANVAS_WIDTH,
    seed,
    seedHeight: GRID_HEIGHT,
    seedWidth: GRID_WIDTH
  });

  const grid = generateGrid({ seed });
  const mazeGenerator = carveMaze({
    grid
  });
  const maze_ctx = initCanvasAndReturn2dContext("#canvas-maze");

  drawPoint({
    ctx: maze_ctx,
    points: [[0, 0, colorMap.foreground]],
    pointHeight: Math.floor(CANVAS_HEIGHT / GRID_HEIGHT) * GRID_HEIGHT,
    pointWidth: Math.floor(CANVAS_WIDTH / GRID_WIDTH) * GRID_WIDTH
  });

  const animator = new Animator();
  animator.animate({ generator: mazeGenerator, ctx: maze_ctx });
};
