import colormap from './colors';

const kernels = {
    blueWhite: {
        width: 2,
        height: 2, 
        map: [
            [colormap.blue,colormap.white],
            [colormap.white,colormap.blue],
            [colormap.blue,colormap.white]
        ]
    }
};


export default ({gridHeight,gridWidth, kernel = kernels.blueWhite}) => {
    return new Array(gridHeight).fill(0).map(
        (_,y) => new Array(gridWidth).fill(0).map( 
            (_,x) => kernel.map[x % kernel.width][y % kernel.height]
        )
    );
};