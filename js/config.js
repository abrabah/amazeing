// How many dots does the maze consist of?
export const MAZE_WIDTH = 49;
export const MAZE_HEIGHT = 49;

// How large (in pixels) is each dot?
export const DOT_WIDTH = 9;
export const DOT_HEIGHT = 9;

export const ANIMATION_FPS = 10;

export const ANIMATE = true;
export const DRAW_SEED = true; 

export const WALL_STRATEGY = walls => Math.floor(Math.random() * walls.length);

export const ROOM_STRATEGY = ({ grid, rooms }) => rooms[0];
