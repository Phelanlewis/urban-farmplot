export { areCoordsEqual };

function areCoordsEqual(a, b) {
  return parseFloat(a).toFixed(12) === parseFloat(b).toFixed(12);
}