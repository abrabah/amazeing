// How many dots does the maze consist of?
export const MAZE_WIDTH = 49;
export const MAZE_HEIGHT = 49;

// How large (in pixels) is each dot?
export const DOT_WIDTH = 9;
export const DOT_HEIGHT = 9;

export const ANIMATION_FPS = 30;

export const ANIMATE = true;
export const DRAW_SEED = true;

export const ROOM_STRATEGY = ({ grid, rooms }) =>
  Math.floor(Math.random() * rooms.length);

const WALL_STRATEGIES = {
  random: ({ walls }) => Math.floor(Math.random() * walls.length),
  nth_last: ({ walls }) => Math.min(walls.length, walls.length - 5) - 1,
  nth_last_or_first: ({ walls }) => Math.max(walls.length - 5, 0),
  take_first: ({ walls }) => 0,
  closest_to_start_euclidean: ({ walls, start }) => {
    return walls.reduce(
      (acc, val, idx) => {
        const dx = start[0] - val[0];
        const dy = start[1] - val[1];

        const dist = Math.sqrt(dx ^ (2 + dy) ^ 2);

        if (dist > acc.dist) {
          return { dist, idx };
        } else {
          return acc;
        }
      },
      { dist: 9999, idx: 0 }
    ).idx;
  }
};

export const WALL_STRATEGY = WALL_STRATEGIES.closest_to_start_euclidean;
