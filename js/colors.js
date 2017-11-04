const makeColor = (r, g, b) => `rgb(${r},${g},${b})`;

export default {
  red: makeColor(255, 0, 0),
  green: makeColor(0, 255, 0),
  blue: makeColor(0, 0, 255),
  white: makeColor(255, 255, 255),
  black: makeColor(0, 0, 0)
};
