import drawMaze  from './js/drawMaze';
import colormap from './js/colors';

const canvasWidth = 500, canvasHeight = 500;

function initCanvasAndReturn2dContext(){
    const canvas = document.querySelector('#canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const context = canvas.getContext('2d');

    return context;
}

window.onload( ()=> {
    const ctx = initCanvasAndReturn2dContext();

    drawMaze({
        ctx, 
        width:canvasWidth, 
        height:canvasHeight, 
        board: [
            [colormap.red, colormap.red,colormap.red]
        ]
    });
});