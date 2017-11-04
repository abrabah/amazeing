import drawGrid from "./js/grid-drawer";
import initGrid from "./js/grid";
import {listRooms} from './js/prims-algorithm';

const canvasWidth = 500;
const canvasHeight = 500;

const gridWidth = 64;
const gridHeight = 64;

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
