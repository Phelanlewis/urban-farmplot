define('ember-cli-g-maps/mixins/g-maps/overlays', ['exports', 'ember', 'ember-cli-g-maps/utils/g-maps/child-collection'], function (exports, _ember, _emberCliGMapsUtilsGMapsChildCollection) {
  'use strict';

  var isArray = _ember['default'].isArray;

  exports['default'] = _ember['default'].Mixin.create(_emberCliGMapsUtilsGMapsChildCollection['default'].create({
    model: 'overlays',

    namespace: 'overlay',

    /* Supported:
    props: [ 'clickable', 'draggable', 'editable', 'fillColor', 'fillOpacity', 'geodesic', 'paths', 'strokeColor', 'strokeOpacity', 'strokePosition', 'strokeWeight', 'visible', 'zIndex' ],
     events: [ 'click', 'rightclick', 'dblclick', 'mousedown', 'mouseout', 'mouseover', 'mouseup', 'mousemove' ],
    */

    validate: function validatePolygons() {
      var overlays = this.get('overlays');

      if (!overlays) {
        return;
      } // validation not necessary

      if (!isArray(overlays)) {
        throw new Error('g-maps component expects overlays to be an Ember Array');
      }

      // End validation
      if (!overlays[0]) {
        return;
      }

      // Reminder for well formed polygon paths
      if (typeof overlays[0] !== 'object' || isArray(overlays[0])) {
        throw new Error('g-maps overlay items must be objects');
      }
    }
  }));
});