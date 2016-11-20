define('ember-cli-g-maps/mixins/g-maps/core/two-way-scale-control', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var observer = _ember['default'].observer;

  exports['default'] = _ember['default'].Mixin.create({

    /**
     * [observer for component attribute's `showScaleControl` updates]
     * @param  {Boolean} 'isMapLoaded'
     * @param  {[Boolean]}  'showScaleControl'
     * @return {[Boolean]} [returns false if map not updated]
     */
    _bindScaleControlToMap: observer('isMapLoaded', 'showScaleControl', function () {
      if (!this.get('isMapLoaded')) {
        return false;
      }

      this.get('map.map').setOptions({
        scaleControl: this.get('showScaleControl') ? true : false
      });
    })
  });
});