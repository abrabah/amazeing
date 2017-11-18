import { drawSeed, drawPoint } from "./js/grid-drawer";
import { generateSeed, generateGrid } from "./js/grid";
import { carveMaze } from "./js/maze-carver";
import { Animator } from "./js/animator";
import colorMap from "./js/colors";

import {
  MAZE_HEIGHT,
  MAZE_WIDTH,
  DOT_WIDTH,
  DOT_HEIGHT,
  ANIMATE,
  DRAW_SEED
} from "./js/config";

function initCanvasAndReturn2dContext(canvasId) {
  const canvas = document.querySelector(canvasId);
  canvas.width = MAZE_WIDTH * DOT_WIDTH;
  canvas.height = MAZE_HEIGHT * DOT_HEIGHT;

  const context = canvas.getContext("2d");

  return context;
}

window.onload = () => {
  const ctx = initCanvasAndReturn2dContext("#canvas-seed");

  const seed = generateSeed();

  if(DRAW_SEED){
    drawSeed({
      ctx,
      seed
    });
}

  const grid = generateGrid({ seed });
  const mazeGenerator = carveMaze({
    grid
  });
  const maze_ctx = initCanvasAndReturn2dContext("#canvas-maze");

  drawPoint({
    ctx: maze_ctx,
    pointHeight: MAZE_HEIGHT * DOT_HEIGHT,
    pointWidth: MAZE_WIDTH * DOT_WIDTH,
    points: [[0, 0, colorMap.wall]]
  });

  const animator = new Animator({ generator: mazeGenerator, ctx: maze_ctx });
  if (ANIMATE) {
    animator.animate();
  } else {
    animator.skipAnimation();
  }
};
