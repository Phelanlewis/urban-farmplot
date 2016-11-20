define('ember-cli-g-maps/mixins/g-maps/circles', ['exports', 'ember', 'ember-cli-g-maps/utils/g-maps/child-collection'], function (exports, _ember, _emberCliGMapsUtilsGMapsChildCollection) {
  'use strict';

  var isArray = _ember['default'].isArray;

  exports['default'] = _ember['default'].Mixin.create(_emberCliGMapsUtilsGMapsChildCollection['default'].create({
    model: 'circles',

    namespace: 'circle',

    /* Supported:
    props: [ 'lat', 'lng', 'clickable', 'draggable', 'editable', 'fillColor', 'fillOpacity', 'radius', 'strokeColor', 'strokeOpacity', 'strokePosition', 'visible', 'zIndex' ],
     events: [ 'center_changed', 'click', 'dblclick', 'drag', 'dragend', 'dragstart', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'radius_changed', 'rightclick' ],
    */

    validate: function validateCircles() {
      var circles = this.get('circles');
      if (circles && !isArray(circles)) {
        throw new Error('g-maps component expects circles to be an Ember Array');
      }
    }
  }));
});