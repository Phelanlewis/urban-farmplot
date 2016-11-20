import Ember from 'ember';

var observer = Ember.observer;
var on = Ember.on;

export default Ember.Mixin.create(Ember.Evented, {

  /**
   * [on map load bind map `zoom_changed` event to `_bindZoomToModel`]]
   */
  _addZoomChangedEvent: on('ember-cli-g-map-loaded', function () {
    var _this = this;

    var map = this.get('map');

    GMaps.on('zoom_changed', map.map, function () {
      Ember.run.later(function () {
        return _this._bindZoomToModel();
      });
    });
  }),

  /**
   * [observer for component attribute `zoom` updates]
   * @param  {Boolean} 'isMapLoaded'
   * @param  {[Number]}  'zoom'
   * @return {[Boolean]} [returns false if map not updated]
   */
  _bindZoomToMap: observer('isMapLoaded', 'zoom', function () {
    if (!this.get('isMapLoaded')) {
      return false;
    }

    var _getProperties = this.getProperties('map', 'zoom');

    var map = _getProperties.map;
    var zoom = _getProperties.zoom;

    if (typeof zoom !== 'number') {
      return false;
    }

    map.setZoom(zoom);
  }),

  /**
   * [updates component attributes `zoom` if out of sync]
   * @return {[Boolean]} [returns false if attributes not updated]
   */
  _bindZoomToModel: function _bindZoomToModel() {
    var _getProperties2 = this.getProperties('map', 'zoom');

    var map = _getProperties2.map;
    var zoom = _getProperties2.zoom;

    // Zoom still in sync
    if (zoom === map.map.zoom) {
      return false;
    }

    var center = map.getCenter();

    // Zoom out of sync (lat, lng are usually updated on zoom as well)
    this.setProperties({
      zoom: map.map.zoom,
      lat: center.lat(),
      lng: center.lng()
    });
  }
});