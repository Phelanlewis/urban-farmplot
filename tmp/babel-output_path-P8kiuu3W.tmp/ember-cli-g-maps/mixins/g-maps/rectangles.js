define('ember-cli-g-maps/mixins/g-maps/rectangles', ['exports', 'ember', 'ember-cli-g-maps/utils/g-maps/child-collection'], function (exports, _ember, _emberCliGMapsUtilsGMapsChildCollection) {
  'use strict';

  var isArray = _ember['default'].isArray;

  exports['default'] = _ember['default'].Mixin.create(_emberCliGMapsUtilsGMapsChildCollection['default'].create({
    model: 'rectangles',

    namespace: 'rectangle',

    validate: function validateRectangles() {
      var rectangles = this.get('rectangles');

      if (!rectangles) {
        return;
      } // validation not necessary

      if (!isArray(rectangles)) {
        throw new Error('g-maps component expects rectangles to be an Ember Array');
      }

      // End validation
      if (!rectangles[0] || !rectangles[0].bounds || !rectangles[0].bounds[0]) {
        return;
      }

      // Reminder for well formed polygon paths
      if (!isArray(rectangles[0].bounds[0])) {
        throw new Error('g-maps rectangle bounds property expects Array of Arrays: [[lat, lng]]');
      }
    }
  }));
});