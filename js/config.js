// How many dots does the maze consist of?
export const MAZE_WIDTH = 39;
export const MAZE_HEIGHT = 39;

// How large (in pixels) is each dot?
export const DOT_WIDTH = 9;
export const DOT_HEIGHT = 9;

export const ANIMATION_FPS = 6;

export const ANIMATE = true;
export const DRAW_SEED = true;

export const ROOM_STRATEGY = ({ grid, rooms }) => Math.floor(rooms.length/2);

const diffManhattan = (dx, dy) => Math.abs(dx) + Math.abs(dy);
const diffChebyshev = (dx, dy) => Math.max(Math.abs(dx), Math.abs(dy));
const diffEuclidean = (dx, dy) => Math.sqrt(dx ^ (2 + dy) ^ 2);

const WALL_STRATEGIES = {
  random: ({ walls }) => Math.floor(Math.random() * walls.length),
  nth_last: ({ walls }) => Math.min(walls.length, walls.length - 5) - 1,
  last: ({ walls }) => walls.length - 1,
  first: ({ walls }) => 0,
  timestep: ({ walls, timestep }) => Math.floor((timestep / 2) % walls.length),
  prev: ({ walls, prev, prevIndex }) => {
    if (prevIndex == 0) {
      return walls.length - 1;
    } else return 0;
  },
  nth_last_or_first: ({ walls }) => Math.max(walls.length - 5, 0),
  take_first: ({ walls }) => 0,
  closest_to_start: diff => ({ walls, start }) => {
    return walls.reduce(
      (acc, val, idx) => {
        const dx = start[0] - val[0];
        const dy = start[1] - val[1];

        const dist = diff(dx, dy);

        if (dist < acc.dist) {
          return { dist, idx };
        } else {
          return acc;
        }
      },
      { dist: 9999, idx: 0 }
    ).idx;
  }
};

export const WALL_STRATEGY = WALL_STRATEGIES.closest_to_start;
