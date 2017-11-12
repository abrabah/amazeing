export default class Array2d {
  constructor(width, height) {
    this.array = new Array(height).fill(0).map(col => new Array(width));
    this.width = width;
    this.height = height;
  }

  get([x, y]) {
    return this.array[y][x];
  }

  set([x, y], val) {
    return (this.array[y][x] = val);
  }

  copy() {
    const copy = new Array2d(0, 0);
    copy.array = this.array.map(colArray => colArray.slice());
    copy.width = this.width;
    copy.height = this.height;
    return copy;
  }
  map(transform) {
    const copy = new Array2d(0, 0);
    copy.array = this.array.map((colArray, y) =>
      colArray.map((elm, x) => transform([x, y], elm))
    );
    copy.width = this.width;
    copy.height = this.height;
    return copy;
  }

  findIndexOfType(types = []) {
    const indices = [];
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (types.includes(this.array[y][x])) {
          indices.push([x, y]);
        }
      }
    }
    return indices;
  }

  findNeighborsOfType({ point, types = [] }) {
    return [[0, -1], [-1, 0], [1, 0], [0, 1]]
      .map(([x, y] = elm) => [x + point[0], y + point[1]])
      .filter(
        ([x, y] = point) => this.array[y] && types.includes(this.array[y][x])
      )
      .map(point => [...point, this.get(point)]);
  }
}
