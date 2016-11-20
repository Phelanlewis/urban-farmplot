define('ember-cli-g-maps/components/g-autocomplete', ['exports', 'ember', 'ember-cli-g-maps/templates/components/g-autocomplete', 'ember-cli-g-maps/utils/load-google-maps'], function (exports, _ember, _emberCliGMapsTemplatesComponentsGAutocomplete, _emberCliGMapsUtilsLoadGoogleMaps) {
  'use strict';

  var inject = _ember['default'].inject;
  var get = _ember['default'].get;
  var set = _ember['default'].set;

  exports['default'] = _ember['default'].Component.extend({
    layout: _emberCliGMapsTemplatesComponentsGAutocomplete['default'],
    testGMaps: inject.service('test-g-maps'),
    classNames: ['g-autocomplete'],

    init: function init() {
      this._super.apply(this, arguments);

      var testGMaps = get(this, 'testGMaps');
      if (testGMaps) {
        testGMaps.registerAutocomplete(this);
      }
    },

    /**
     * invoke `setup()` with initial input value
     */
    didInsertElement: function didInsertElement() {
      var _this = this;

      this._super.apply(this, arguments);
      var input = this.$('input')[0];
      (0, _emberCliGMapsUtilsLoadGoogleMaps['default'])().then(function () {
        return _this.setup(input);
      });
    },

    /**
     * @public
     * generate new autocomplete instance
     * add `place_changed` event handler
     * set `autocomplete` and `listener` refs on component
     *
     * @param {String} input
     */
    setup: function setup(input) {
      var autocomplete = new google.maps.places.Autocomplete(input);
      var handler = _ember['default'].run.bind(this, function () {
        var place = autocomplete.getPlace();
        this.sendAction('on-select', {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          place: place
        });
      });

      var listener = autocomplete.addListener('place_changed', handler);

      set(this, 'autocomplete', autocomplete);
      set(this, 'listener', listener);
    },

    didAutocomplete: function didAutocomplete(place) {
      this.send('onSelect', place);
    },

    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);
      this.teardown();
    },

    /**
     * @public
     * remove listener event
     * remove autocomplete instances event listeners
     * if unregister autocomplete
     */
    teardown: function teardown() {
      var autocomplete = get(this, 'autocomplete');
      var listener = get(this, 'listener');

      google.maps.event.removeListener(listener);
      google.maps.event.clearInstanceListeners(autocomplete);

      var testGMaps = get(this, 'testGMaps');
      if (testGMaps) {
        testGMaps.unregisterAutocomplete(this);
      }
    },

    actions: {
      onSelect: function onSelect(place) {
        this.sendAction('on-select', place);
      }
    }
  });
});