import { drawSeed } from "./js/grid-drawer";
import { generateSeed, generateGrid } from "./js/grid";
import mazeCarver from "./js/maze-carver";

const canvasWidth = 500;
const canvasHeight = 500;

const gridWidth = 63;
const gridHeight = 63;

function initCanvasAndReturn2dContext() {
  const canvas = document.querySelector("#canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  const context = canvas.getContext("2d");

  return context;
}
//TODO: rename grid to seed?
window.onload = () => {
  const ctx = initCanvasAndReturn2dContext();

  const seed = generateSeed({ gridHeight, gridWidth });
  const grid = generateGrid({ seed });

  drawSeed({
    ctx,
    canvasHeight,
    canvasWidth,
    seed,
    seedHeight: gridHeight,
    seedWidth: gridWidth
  });
};
