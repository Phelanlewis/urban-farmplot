define('ember-cli-g-maps/mixins/g-maps/polylines', ['exports', 'ember', 'ember-cli-g-maps/utils/g-maps/child-collection'], function (exports, _ember, _emberCliGMapsUtilsGMapsChildCollection) {
  'use strict';

  var isArray = _ember['default'].isArray;

  exports['default'] = _ember['default'].Mixin.create(_emberCliGMapsUtilsGMapsChildCollection['default'].create({
    model: 'polylines',

    namespace: 'polyline',

    validate: function validatePolylines() {
      var polylines = this.get('polylines');

      if (!polylines) {
        return;
      } // validation not necessary

      if (!isArray(polylines)) {
        throw new Error('g-maps component expects polylines to be an Ember Array');
      }

      // End validation
      if (!polylines[0] || !polylines[0].path || !polylines[0].path[0]) {
        return;
      }

      // Reminder for well formed polygon paths
      if (!isArray(polylines[0].path[0])) {
        throw new Error('g-maps polyline path property expects Array of Arrays: [[lat, lng]]');
      }
    }
  }));
});