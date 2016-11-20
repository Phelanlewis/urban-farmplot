import Ember from 'ember';

var _get = Ember.get;
var typeOf = Ember.typeOf;

export default Ember.Service.extend({
  maps: (function () {

    /**
     * Store or Gmaps.maps
     * @type {Ember Array}
     */
    var maps = Ember.A([]);

    return {

      /**
       * Return map instance from store by name
       * @param {String} name [Name of Google Map instance]
       * @return {Object} found [GMap.maps store item]
       */
      select: function select(name) {
        var found = undefined;

        for (var i = 0, l = maps.length; i < l; i++) {
          if (maps[i].name === name) {
            found = maps[i];
            return found;
          }
        }

        return found;
      },

      /**
       * Add new map instance to store by name
       * @param {String} name [Name of Google Map instance]
       * @param {Object} mapItem [GMap.maps store item]
       */
      add: function add(name, map) {
        if (typeof name !== 'string') {
          throw new Error('GMap name must be a string');
        }

        if (map instanceof google.maps.Map === false) {
          throw new Error('GMap service only accepts Google Map instances');
        }

        if (this.select(name)) {
          throw new Error('GMap name is taken, select a new GMap name');
        }

        var mapItem = { name: name, map: map };

        // Using accessor property to avoid calling warning via `service.add`
        Object.defineProperty(mapItem, 'onLoad', {
          get: function get() {
            return new Ember.RSVP.Promise(function (resolve) {
              google.maps.event.addListenerOnce(map, 'idle', function () {
                Ember.Logger.warn('gMaps service onLoad has been deprecated, please use the component\'s `loaded` action instead.');
                resolve();
              });
            });
          }
        });

        maps.pushObject(mapItem);

        return mapItem;
      },

      /**
       * Remove map instance from store by name
       * @param {String} name [Name of Google Map instance]
       * @return {Boolean} isSuccessful [Successfully removed]
       */
      remove: function remove(name) {
        var isSuccessful = false;

        for (var i = 0, l = maps.length; i < l; i++) {
          if (maps[i].name === name) {
            maps.removeAt(i);
            isSuccessful = true;
            return isSuccessful;
          }
        }

        return isSuccessful;
      },

      /**
       * Refresh a Google Map instance
       * @param {String} name [Name of Google Map instance]
       * @return {Boolean} isSuccessful [Successfully refreshed]
       */
      refresh: function refresh(name) {
        var isSuccessful = false;
        var mapStore = this.select(name);

        if (!mapStore) {
          Ember.Logger.warn('Attempted to refresh undefined GMap instance: ' + (name || '(no map name given)'));
        } else {
          google.maps.event.trigger(mapStore.map, 'resize');
          isSuccessful = true;
        }

        return isSuccessful;
      }
    };
  })(),

  geocode: function geocode(options) {
    return new Ember.RSVP.Promise(function (resolve, reject) {
      options.callback = function (result, status) {
        if (status === 'OK' || status === 'ZERO_RESULTS') {
          resolve(result);
        } else {
          var err = { status: status };

          // Add any available error_message
          if (result && result.error_message) {
            err.message = result.error_message;
          }

          reject(err);
        }
      };
      GMaps.prototype.geocode(options);
    });
  },

  autocompletes: Ember.computed({
    get: function get() {
      var autocompletes = {};
      return {
        add: function add(item) {
          var id = _get(item.component, 'elementId');
          autocompletes[id] = item;
        },
        remove: function remove(component) {
          var id = _get(component, 'elementId');
          delete autocompletes[id];
        },
        get: function get(component) {
          if (typeOf(component) === 'string') {
            return autocompletes[component];
          }
          var id = _get(component, 'elementId');
          return autocompletes[id];
        }
      };
    }
  }),

  googleAPI: Ember.computed({
    get: function get() {}
  })
});