import test from "ava";
import {
  findNeighborsOfType,
  containsPoint,
  listIndicesOfAllRooms
} from "./grid-helper";
import { GRID_DESCRIPTION } from "./grid";

const grid = [
  [GRID_DESCRIPTION.PILLAR, GRID_DESCRIPTION.ROOM, GRID_DESCRIPTION.PILLAR],
  [GRID_DESCRIPTION.ROOM, GRID_DESCRIPTION.WALL_OPEN, GRID_DESCRIPTION.PILLAR],
  [GRID_DESCRIPTION.ROOM, GRID_DESCRIPTION.WALL_OPEN, GRID_DESCRIPTION.ROOM]
];

test("given a point, find all adjacent rooms", t => {
  const point = [1, 1];
  const types = [GRID_DESCRIPTION.ROOM, GRID_DESCRIPTION.ROOM_ON_PATH];
  const adjacentRooms = findNeighborsOfType({ grid, point, types });

  t.truthy(adjacentRooms.find(containsPoint([1, 0])));
  t.truthy(adjacentRooms.find(containsPoint([0, 1])));

  t.falsy(adjacentRooms.find(containsPoint([0, 2]))); // Room on a tiagonal tile
  t.falsy(adjacentRooms.find(containsPoint([2, 2]))); // Room on a tiagonal tile
  t.falsy(adjacentRooms.find(containsPoint([0, 0]))); // Pillar
  t.falsy(adjacentRooms.find(containsPoint([1, 1]))); // Wall
});

test("find all rooms in a grid", t => {
  const rooms = listIndicesOfAllRooms(grid);
  t.truthy(rooms.find(containsPoint([1, 0])));
  t.truthy(rooms.find(containsPoint([0, 1])));
  t.truthy(rooms.find(containsPoint([0, 2])));
  t.truthy(rooms.find(containsPoint([2, 2])));
});
