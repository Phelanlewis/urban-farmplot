define('ember-cli-g-maps/mixins/g-maps/heatmap', ['exports', 'ember', 'ember-cli-g-maps/utils/load-google-maps'], function (exports, _ember, _emberCliGMapsUtilsLoadGoogleMaps) {
  'use strict';

  var on = _ember['default'].on;
  var isArray = _ember['default'].isArray;

  exports['default'] = _ember['default'].Mixin.create({
    heatmapRadius: null,
    heatmapOpacity: 1,
    heatmapVisible: true,
    heatmapGradient: null,
    heatmapDissipating: false,
    heatmapMarkers: null,

    /**
     * [_heatmap stores reference to google.maps.visualization.HeatmapLayer instance]
     * @type {[Object]}
     */
    _heatmap: null,

    /**
     * [_heatmapMarkersMVCArray stores reference to `_heatmap.data` MVC Array]
     * @type {[Google MVCArray]}
     */
    _heatmapMarkersMVCArray: null,

    /**
     * [_toJSArray converts any Ember Array instance to a JS Array]
     * @param  {[Array]} arr [Ember Array|JS Array]
     * @return {[Array]}     [JS Array]
     */
    _toJSArray: function _toJSArray(arr) {
      return typeof arr.toArray === 'function' ? arr.toArray() : arr;
    },

    /**
     * [googleMapsSupportsHeatmap returns a boolean indicating if HeatmapLayer is supported]
     * @return {[Boolean]}
     */
    googleMapsSupportsHeatmap: function googleMapsSupportsHeatmap() {
      return !!(google.maps && google.maps.visualization && google.maps.visualization.HeatmapLayer);
    },

    /**
     * [_validateHeatmap determines if heatmap can instantiate, if so adds init observers]
     * @param  {[String]} )[triggered on element insertion]
     * @return {[Oberservers]}   [if valid adds obersvers to init method]
     */
    _validateHeatmap: on('didInsertElement', function () {
      var _this = this;

      return (0, _emberCliGMapsUtilsLoadGoogleMaps['default'])().then(function () {
        if (!_this.get('heatmapMarkers')) {
          return false;
        }

        if (!_this.googleMapsSupportsHeatmap()) {
          throw new Error('g-map component requires the "visualization" library included in `config/environment.js`');
        } else {

          // Enable Heatmap setup
          _this.addObserver('isMapLoaded', _this, '_initHeatmap');
          _this.addObserver('heatmapMarkers', _this, '_initHeatmap');
        }
      });
    }),

    /**
     * [_initHeatmap runs once per heatmap instance instantiation]
     * [Added via `_validateHeatmap`]
     * [Observes ('isMapLoaded', 'heatmapMarkers')]
     */
    _initHeatmap: function _initHeatmap() {
      var continueSetup = this.get('isMapLoaded') && this.get('heatmapMarkers') && this.googleMapsSupportsHeatmap() && !this.get('_heatmap');

      if (!continueSetup) {
        return false;
      }

      var googleMVCArray = new google.maps.MVCArray();
      this.set('_heatmapMarkersMVCArray', googleMVCArray);

      var heatmap = new google.maps.visualization.HeatmapLayer({
        data: googleMVCArray
      });

      this.set('_heatmap', heatmap);

      this.addObserver('heatmapMarkers.[]', this, '_syncHeatmapMarkers');
      this._syncHeatmapMarkers();

      this.addObserver('heatmapRadius', this, '_syncHeatmapRadius');
      this._syncHeatmapRadius();

      this.addObserver('heatmapDissipating', this, '_syncHeatmapDissipating');
      this._syncHeatmapDissipating();

      this.addObserver('heatmapOpacity', this, '_syncHeatmapOpacity');
      this._syncHeatmapOpacity();

      this.addObserver('heatmapGradient.[]', this, '_syncHeatmapGradient');
      this._syncHeatmapGradient();

      this.addObserver('heatmapVisible', this, '_syncHeatmapVisible');
      this._syncHeatmapVisible();

      // Remove Init observers
      this.removeObserver('isMapLoaded', this, '_initHeatmap');
      this.removeObserver('heatmapMarkers', this, '_initHeatmap');
    },

    /**
     * [_teardownHeatmap removes the heatmap from the map, clears up memory, and unbinds any events]
     * @param  {[String]} [triggered on element destroy]
     */
    _teardownHeatmap: on('willDestroyElement', function () {
      var heatmap = this.get('_heatmap');

      if (heatmap) {
        heatmap.setMap(null);
        delete heatmap.data;
        this.set('_heatmap', null);
        this.set('_heatmapMarkersMVCArray', null);
      }
    }),

    /**
     * [_syncHeatmapMarkers syncs data of `heatmapMarkers` array to the heatmap.data's MVC Array]
     * [Added via `_initHeatmap`]
     * [Observes ('heatmapMarkers.[]')]
     */
    _syncHeatmapMarkers: function _syncHeatmapMarkers() {
      var mvcArray = this._heatmapMarkersMVCArray;
      var heatmapMarkers = this._toJSArray(this.heatmapMarkers || []);

      if (heatmapMarkers[0]) {

        // is something other than an array of array/objects
        if (typeof heatmapMarkers[0] !== 'object') {
          throw new Error('`heatmapMarkers` must be an array of arrays or objects');
        }
        // is an object without a location array
        else if (!isArray(heatmapMarkers[0]) && !isArray(heatmapMarkers[0].location)) {
            throw new Error('`heatmapMarkers` must be an array of objects with a location array');
          }
      }

      heatmapMarkers.forEach(function (hm, i) {
        var lat = isArray(hm) ? hm[0] : hm.location[0];
        var lng = isArray(hm) ? hm[1] : hm.location[1];
        var current = mvcArray.getAt(i);
        var marker = {};

        // if index is out of sync
        if (!current || current.location.lat() !== lat || current.location.lng() !== lng) {

          marker.location = new google.maps.LatLng(lat, lng);

          // Optional `weight` parameter
          if (hm.weight) {
            marker.weight = hm.weight;
          }

          // create and set new LatLng instance
          mvcArray.setAt(i, marker);
        }
      });

      // Remove latLng's from end of mvcArray until length is the same
      while (mvcArray.length > heatmapMarkers.length) {
        mvcArray.pop();
      }
    },

    /**
     * [_syncHeatmapRadius sync heatmap instance to `heatmapRadius` Number]
     * [Added via `_initHeatmap`]
     * [Observes ('heatmapRadius')]
     */
    _syncHeatmapRadius: function _syncHeatmapRadius() {
      var heatmap = this._heatmap;
      var radius = this.heatmapRadius ? parseInt(this.heatmapRadius, 10) : null;

      if (!heatmap) {
        return false;
      }

      heatmap.set('radius', radius);
    },

    /**
     * [_syncHeatmapDissipating sync heatmap instance to `heatmapDissipating` Boolean]
     * [Added via `_initHeatmap`]
     * [Observes ('heatmapDissipating')]
     */
    _syncHeatmapDissipating: function _syncHeatmapDissipating() {
      var heatmap = this._heatmap;
      var dissipating = !!this.heatmapDissipating;

      if (!heatmap) {
        return false;
      }

      heatmap.set('dissipating', dissipating);
    },

    /**
     * [_syncHeatmapOpacity sync heatmap instance to `heatmapOpacity` Floating Point]
     * [Added via `_initHeatmap`]
     * [Observes ('heatmapOpacity')]
     */
    _syncHeatmapOpacity: function _syncHeatmapOpacity() {
      var heatmap = this._heatmap;
      var opacity = this.heatmapOpacity ? parseFloat(this.heatmapOpacity) : 1;

      if (!heatmap) {
        return false;
      }

      heatmap.set('opacity', opacity);
    },

    /**
     * [_syncHeatmapGradient sync heatmap instance to `heatmapGradient` Array]
     * [Added via `_initHeatmap`]
     * [Observes ('heatmapGradient.[]')]
     */
    _syncHeatmapGradient: function _syncHeatmapGradient() {
      var heatmap = this._heatmap;
      var gradient = isArray(this.heatmapGradient) ? this._toJSArray(this.heatmapGradient) : null;

      if (!heatmap) {
        return false;
      }

      heatmap.set('gradient', gradient);
    },

    /**
     * [_syncHeatmapVisible sync heatmap instance to `heatmapVisible` Boolean]
     * [Added via `_initHeatmap`]
     * [Observes ('heatmapVisible')]
     */
    _syncHeatmapVisible: function _syncHeatmapVisible() {
      var heatmap = this._heatmap;
      var visible = !!this.heatmapVisible;

      if (!heatmap) {
        return false;
      }

      heatmap.setMap(visible ? this.get('map').map : null);
    }
  });
});