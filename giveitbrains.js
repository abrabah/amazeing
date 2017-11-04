import drawGrid from "./js/gridDrawer";
import initGrid from "./js/grid";

const canvasWidth = 1000,
const canvasHeight = 500;

const gridWidth = 256,
const gridHeight = 128;

function initCanvasAndReturn2dContext() {
  const canvas = document.querySelector("#canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  const context = canvas.getContext("2d");

  return context;
}

window.onload = () => {
  const ctx = initCanvasAndReturn2dContext();

  drawGrid({
    ctx,
    width: canvasWidth,
    height: canvasHeight,
    grid: initGrid({ gridHeight, gridWidth })
  });
};
