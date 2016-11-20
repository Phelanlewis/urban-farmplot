define('ember-cli-g-maps/mixins/g-maps/core/two-way-draggable', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var observer = _ember['default'].observer;

  exports['default'] = _ember['default'].Mixin.create({

    /**
     * [observer for component attribute's `draggable` updates]
     * @param  {Boolean} 'isMapLoaded'
     * @param  {[Boolean]}  'draggable'
     * @return {[Boolean]} [returns false if map not updated]
     */

    _bindDraggableToMap: observer('isMapLoaded', 'draggable', function () {
      if (!this.get('isMapLoaded')) {
        return false;
      }

      this.get('map.map').setOptions({
        draggable: this.get('draggable') ? true : false
      });
    })
  });
});