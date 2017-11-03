// How many dots does the maze consist of?
export const MAZE_WIDTH = 39;
export const MAZE_HEIGHT = 39;

// How large (in pixels) is each dot?
export const DOT_WIDTH = 10;
export const DOT_HEIGHT = 10;

export const ANIMATION_FPS = 6;

export const ANIMATE = true;
export const DRAW_SEED = true;


/*
  grid: 2d array representing the seed. please use debugger to inspect/understand 
    the array. 
  rooms: array [ [x,y] ... ] containing all the rooms in the array

  RETURN VALUE: number [0, rooms.length) indicating which room to select
 */
export const ROOM_STRATEGY = ({ grid, rooms }) => {
// debugger;
  return 0;
};


/* Wall strategy; determine which wall to select next. 
    walls: array of walls to select from  [ [x,y], [x,y] ...] 
    start: start position [x,y]
    prevIndex: index of previousily selected wall e.g. 42
    prev: previousily selectd wall e.g. [x,y]
    timestep: a number which is incremented each time
     grid-carver.js selects a wall to visit

  RETURN VALUE: number [0, walls.length) indicating which wall to select
*/
export const WALL_STRATEGY = ({walls, start, prev, prevIndex, timestep}) => {
  return 0;
};

/* PROTIP don't know of any cool wall strategies? 
    Or are you too impatient to try?

   run `git cherry-pick i-cheated` to get some examples ;) 
*/