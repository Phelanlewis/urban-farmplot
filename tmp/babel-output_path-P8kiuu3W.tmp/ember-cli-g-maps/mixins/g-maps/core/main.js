define('ember-cli-g-maps/mixins/g-maps/core/main', ['exports', 'ember', 'ember-cli-g-maps/utils/load-google-maps'], function (exports, _ember, _emberCliGMapsUtilsLoadGoogleMaps) {
  'use strict';

  var _slice = Array.prototype.slice;

  var merge = _ember['default'].merge;
  var uuid = _ember['default'].uuid;
  var computed = _ember['default'].computed;
  var bind = _ember['default'].run.bind;

  exports['default'] = _ember['default'].Mixin.create(_ember['default'].Evented, {
    map: null,
    name: null,
    lat: 33.5205556,
    lng: -86.8025,
    zoom: 0,
    mapType: 'ROADMAP',
    showMapTypeControl: true,
    draggable: true,
    disableDefaultUI: false,
    disableDoubleClickZoom: false,
    scrollwheel: true,
    showZoomControl: true,
    showScaleControl: true,
    isMapLoaded: false,
    classNames: ['ember-cli-g-map'],
    gMap: _ember['default'].inject.service(),

    // Map Events
    _gmapEvents: ['idle', 'drag', 'click', 'resize', 'dragend', 'dblclick', 'mouseout', 'dragstart', 'mousemove', 'mouseover', 'rightclick', 'tilesloaded', 'tilt_changed', 'zoom_changed', 'bounds_changed', 'center_changed', 'heading_changed', 'maptypeid_changed', 'projection_changed'],

    didInsertElement: function didInsertElement() {
      var _this = this;

      this._super.apply(this, arguments);

      var config = this.getProperties('lat', 'lng', 'zoom', 'styles', 'mapType', 'showMapTypeControl', 'scaleControl', 'showScaleControl', 'disableDefaultUI');

      // Map symantic names to Google Map Options
      config.zoomControl = config.showZoomControl;
      config.mapTypeControl = config.showMapTypeControl;
      config.scaleControl = config.showScaleControl;

      (0, _emberCliGMapsUtilsLoadGoogleMaps['default'])().then(function () {

        // Create Gmap Instance
        var map = new GMaps(merge(config, {
          div: '#' + _this.element.id
        }));

        _this.set('map', map);

        _this._addMapEvents();

        if (!_this.get('name')) {
          _this.set('name', 'ember-cli-g-map-' + uuid());
        }

        // Register gMap instance in gMap service
        _this.get('gMap').maps.add(_this.get('name'), map.map);

        // When map instance has finished loading
        google.maps.event.addListenerOnce(map.map, 'idle', _ember['default'].run.bind(_this, _this._onMapLoad));
      })['catch'](function () {
        _ember['default'].Logger.error('Failed to load google maps via Ember-cli-g-maps');
      });
    },

    // TODO write integration test coverage
    willDestroyElement: function willDestroyElement() {
      var _this2 = this;

      this._super.apply(this, arguments);

      this._removeMapEvents();

      // TODO: remove for v1.x
      this.get('gMap').maps.remove(this.get('name'));

      // Run after Mixin willDestroyElement
      _ember['default'].run.later(function () {
        return _this2.get('map').destroy();
      });
    },

    _addMapEvents: function _addMapEvents() {
      var _this3 = this;

      var events = this.get('_gmapEvents');
      var sendEvent = function sendEvent(name, evt) {
        return _this3.send(name, evt);
      };

      for (var i = 0, l = events.length; i < l; i++) {

        // If map event NOT defined on component continue
        if (!this.get(events[i])) {
          continue;
        }

        // Add GMaps event listener on google map instance
        GMaps.on(events[i], this.get('map.map'), bind(this, sendEvent, events[i]));
      }
    },

    _removeMapEvents: function _removeMapEvents() {
      var events = this.get('_gmapEvents');

      for (var i = 0, l = events.length; i < l; i++) {

        // If map event NOT defined on component continue
        if (!this.get(events[i])) {
          continue;
        }

        GMaps.off(events[i], this.get('map.map'));
      }
    },

    _onMapLoad: function _onMapLoad(e) {
      if (this.get('isDestroyed')) {
        return false;
      }

      this.set('isMapLoaded', true);
      this.trigger('ember-cli-g-map-loaded');
      this.send('loaded', e);
    },

    /////////////////////////////////////////////////////////////
    // Map state info, generally required info to make requests
    /////////////////////////////////////////////////////////////

    defaultGMapState: computed('lat', 'lng', 'zoom', function () {
      var map = this.get('map');
      var bounds = map.map.getBounds();
      var ne = bounds.getNorthEast();
      var sw = bounds.getSouthWest();

      return {
        map: this.get('name'),

        bounds: [{ lat: ne.lat(), lng: ne.lng(), location: 'northeast' }, // Northeast
        { lat: sw.lat(), lng: sw.lng(), location: 'southwest' } // Southwest
        ],

        mapIdle: new _ember['default'].RSVP.Promise(function (resolve) {
          google.maps.event.addListenerOnce(map.map, 'idle', resolve);
        }),

        mapTilesLoaded: new _ember['default'].RSVP.Promise(function (resolve) {
          google.maps.event.addListenerOnce(map.map, 'tilesloaded', resolve);
        })
      };
    }),

    // Supported g-map Actions

    actions: {
      idle: function idle() {
        this.sendAction('idle', merge.apply(undefined, [this.get('defaultGMapState')].concat(_slice.call(arguments))));
      },

      drag: function drag() {
        this.sendAction('drag', merge.apply(undefined, [this.get('defaultGMapState')].concat(_slice.call(arguments))));
      },

      click: function click() {
        this.sendAction('click', merge.apply(undefined, [this.get('defaultGMapState')].concat(_slice.call(arguments))));
      },

      resize: function resize() {
        this.sendAction('resize', merge.apply(undefined, [this.get('defaultGMapState')].concat(_slice.call(arguments))));
      },

      loaded: function loaded() {
        this.sendAction('loaded', merge.apply(undefined, [this.get('defaultGMapState')].concat(_slice.call(arguments))));
      },

      dragend: function dragend() {
        this.sendAction('dragend', merge.apply(undefined, [this.get('defaultGMapState')].concat(_slice.call(arguments))));
      },

      dblclick: function dblclick() {
        this.sendAction('dblclick', merge.apply(undefined, [this.get('defaultGMapState')].concat(_slice.call(arguments))));
      },

      mouseout: function mouseout() {
        this.sendAction('mouseout', merge.apply(undefined, [this.get('defaultGMapState')].concat(_slice.call(arguments))));
      },

      dragstart: function dragstart() {
        this.sendAction('dragstart', merge.apply(undefined, [this.get('defaultGMapState')].concat(_slice.call(arguments))));
      },

      mousemove: function mousemove() {
        this.sendAction('mousemove', merge.apply(undefined, [this.get('defaultGMapState')].concat(_slice.call(arguments))));
      },

      mouseover: function mouseover() {
        this.sendAction('mouseover', merge.apply(undefined, [this.get('defaultGMapState')].concat(_slice.call(arguments))));
      },

      rightclick: function rightclick() {
        this.sendAction('rightclick', merge.apply(undefined, [this.get('defaultGMapState')].concat(_slice.call(arguments))));
      },

      tilesloaded: function tilesloaded() {
        this.sendAction('tilesloaded', merge.apply(undefined, [this.get('defaultGMapState')].concat(_slice.call(arguments))));
      },

      tilt_changed: function tilt_changed() {
        this.sendAction.apply(this, ['tilt_changed'].concat(_slice.call(arguments)));
      },

      zoom_changed: function zoom_changed() {
        this.sendAction('zoom_changed', merge.apply(undefined, [this.get('defaultGMapState')].concat(_slice.call(arguments))));
      },

      bounds_changed: function bounds_changed() {
        this.sendAction('bounds_changed', merge.apply(undefined, [this.get('defaultGMapState')].concat(_slice.call(arguments))));
      },

      center_changed: function center_changed() {
        this.sendAction('center_changed', merge.apply(undefined, [this.get('defaultGMapState')].concat(_slice.call(arguments))));
      },

      heading_changed: function heading_changed() {
        this.sendAction('heading_changed', merge.apply(undefined, [this.get('defaultGMapState')].concat(_slice.call(arguments))));
      },

      maptypeid_changed: function maptypeid_changed() {
        var googleMapInstance = this.get('map.map');
        this.sendAction('maptypeid_changed', merge.apply(undefined, [this.get('defaultGMapState'), { mapType: googleMapInstance.getMapTypeId() }].concat(_slice.call(arguments))));
      },

      projection_changed: function projection_changed() {
        this.sendAction('projection_changed', merge.apply(undefined, [this.get('defaultGMapState')].concat(_slice.call(arguments))));
      }
    }
  });
});