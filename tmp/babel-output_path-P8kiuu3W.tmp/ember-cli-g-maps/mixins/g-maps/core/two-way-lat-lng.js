define('ember-cli-g-maps/mixins/g-maps/core/two-way-lat-lng', ['exports', 'ember', 'ember-cli-g-maps/utils/g-maps/math'], function (exports, _ember, _emberCliGMapsUtilsGMapsMath) {
  'use strict';

  var observer = _ember['default'].observer;
  var on = _ember['default'].on;

  exports['default'] = _ember['default'].Mixin.create(_ember['default'].Evented, {

    /**
     * [on map load bind map `center_changed` event to `_bindLatLngToModel`]
     */
    _addCenterChangedEvent: on('ember-cli-g-map-loaded', function () {
      var _this = this;

      var googleMapInstance = this.get('map.map');

      GMaps.on('center_changed', googleMapInstance, function () {
        _ember['default'].run.debounce(_this, _this._bindLatLngToModel, 100);
      });
    }),

    /**
     * [observer for component attribute's `lat` and `lng` updates]
     * @param  {Boolean} 'isMapLoaded'
     * @param  {[Number]}  'lat'
     * @param  {[Number]}  'lng'
     * @return {[Boolean]} [returns false if map not updated]
     */
    _bindLatLngToMap: observer('isMapLoaded', 'lat', 'lng', function () {
      if (!this.get('isMapLoaded')) {
        return false;
      }

      var _getProperties = this.getProperties('map', 'lng', 'lat');

      var map = _getProperties.map;
      var lat = _getProperties.lat;
      var lng = _getProperties.lng;

      var center = map.getCenter();

      // If map is out of sync with app state
      if (!(0, _emberCliGMapsUtilsGMapsMath.areCoordsEqual)(center.lat(), lat) || !(0, _emberCliGMapsUtilsGMapsMath.areCoordsEqual)(center.lng(), lng)) {
        map.setCenter(lat, lng);
      }
    }),

    /**
     * [updates component attributes `lat` and `lng` if out of sync]
     * @return {[Boolean]} [returns false if attributes not updated]
     */
    _bindLatLngToModel: function _bindLatLngToModel() {
      var map = this.get('map');

      var _getProperties2 = this.getProperties('lat', 'lng');

      var lat = _getProperties2.lat;
      var lng = _getProperties2.lng;

      var center = map.getCenter();

      // Still in sync
      if ((0, _emberCliGMapsUtilsGMapsMath.areCoordsEqual)(center.lat(), lat) || (0, _emberCliGMapsUtilsGMapsMath.areCoordsEqual)(center.lng(), lng)) {
        return false;
      }

      // Out of sync
      this.setProperties({ lat: center.lat(), lng: center.lng() });
    }
  });
});