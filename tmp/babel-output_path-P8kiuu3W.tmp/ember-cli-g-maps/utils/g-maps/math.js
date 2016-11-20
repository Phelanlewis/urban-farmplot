define("ember-cli-g-maps/utils/g-maps/math", ["exports"], function (exports) {
  "use strict";

  exports.areCoordsEqual = areCoordsEqual;

  function areCoordsEqual(a, b) {
    return parseFloat(a).toFixed(12) === parseFloat(b).toFixed(12);
  }
});