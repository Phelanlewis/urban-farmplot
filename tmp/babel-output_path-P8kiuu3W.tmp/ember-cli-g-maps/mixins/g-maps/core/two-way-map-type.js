define('ember-cli-g-maps/mixins/g-maps/core/two-way-map-type', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var observer = _ember['default'].observer;

  exports['default'] = _ember['default'].Mixin.create({

    /**
     * [observer for component attribute's `mapType` updates]
     * @param  {Boolean} 'isMapLoaded'
     * @param  {[String]}  'mapType'
     * @return {[Boolean]} [returns false if map not updated]
     */
    _bindMapTypeToMap: observer('isMapLoaded', 'mapType', function () {
      if (!this.get('isMapLoaded')) {
        return false;
      }

      var googleMapInstance = this.get('map.map');
      var mapType = '' + this.get('mapType');

      // If invalid mapType
      if (google.maps.MapTypeId[mapType.toUpperCase()] === undefined) {
        return false;
      }

      // If mapType in sync
      if (mapType.toLowerCase() === googleMapInstance.getMapTypeId()) {
        return false;
      }

      // Update map
      googleMapInstance.setMapTypeId(google.maps.MapTypeId[mapType.toUpperCase()]);
    })
  });
});