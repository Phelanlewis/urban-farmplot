define('ember-cli-g-maps/mixins/g-maps/core/two-way-map-type-control', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var observer = _ember['default'].observer;

  exports['default'] = _ember['default'].Mixin.create({

    /**
     * [observer for component attribute's `showMapTypeControl` updates]
     * @param  {Boolean} 'isMapLoaded'
     * @param  {[Boolean]}  'showMapTypeControl'
     * @return {[Boolean]} [returns false if map not updated]
     */
    _bindMapTypeControlToMap: observer('isMapLoaded', 'showMapTypeControl', function () {
      if (!this.get('isMapLoaded')) {
        return false;
      }

      this.get('map.map').setOptions({
        mapTypeControl: this.get('showMapTypeControl') ? true : false
      });
    })
  });
});