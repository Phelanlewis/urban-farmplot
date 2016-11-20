define('ember-cli-g-maps/utils/g-maps/child-collection', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }return obj;
  }

  var capitalize = _ember['default'].String.capitalize;
  var merge = _ember['default'].merge;
  var uuid = _ember['default'].uuid;
  var on = _ember['default'].on;
  var observer = _ember['default'].observer;

  exports['default'] = {
    create: function createChildCollection(settings) {
      var _ref;

      var utils = this;
      var noop = function noop() {};
      var globalNamespace = '_gmap';

      var defaults = {
        namespace: 'gMapChildCollection_' + uuid()
      };

      settings = merge(defaults, settings);

      if (!settings.model) {
        throw new Error('childCollection requires a `model` string');
      }

      ////////////////////////////////////////////
      // Child Collection Factory Configuration
      ///////////////////////////////////////////

      var model = settings.model;
      var namespace = globalNamespace + capitalize(settings.namespace);
      var addMethod = 'add' + capitalize(settings.namespace);
      var removeMethod = 'remove' + capitalize(settings.namespace);

      ////////////////////////////////////
      // Child Collection Mixin Factory
      ///////////////////////////////////

      return _ref = {}, _defineProperty(_ref, model, _ember['default'].A()), _defineProperty(_ref, namespace + 'Validate', on('didInsertElement', settings.validate || noop)), _defineProperty(_ref, namespace + 'Destroy', on('willDestroyElement', settings.destroy || noop)), _defineProperty(_ref, namespace + 'AfterAddChild', settings.addedItem || noop), _defineProperty(_ref, namespace + 'BeforeRemoveChild', settings.removeItem || noop), _defineProperty(_ref, namespace + 'Sync', observer('isMapLoaded', model + '.[]', function sync() {
        var map = this.get('map');
        var parentModel = this.get(model);

        // If Items require syncing
        if (!this.get('isMapLoaded') || !parentModel) {
          return;
        }

        for (var i = 0, l = parentModel.length; i < l; i++) {
          var item = parentModel[i];
          var mapChild = map[model][i];
          var addedMapItem = null;

          // Map store doesn't have child
          if (!mapChild) {
            addedMapItem = map[addMethod](item);
          }

          // If map index item is different from model item
          else if (utils._modelVsMapChildDiff(item, mapChild)) {

              // Somethings different, so just rerender it!
              this[namespace + 'BeforeRemoveChild'](mapChild, map);
              map[removeMethod](mapChild);

              // Add to end of map[model]
              addedMapItem = map[addMethod](item);

              // So here we adjust it to be the current index
              map[model].splice(i, 0, map[model].pop());
            }

          // Hook for mixin
          if (addedMapItem) {
            this[namespace + 'AfterAddChild'](item, addedMapItem, map);
          }
        }

        // Remove any map children out of sync with model
        while (map[model].length > parentModel.length) {
          var mapChild = map[model][map[model].length - 1];

          // Hook for mixin
          this[namespace + 'BeforeRemoveChild'](mapChild, map);
          map[removeMethod](mapChild);
        }
      })), _ref;
    },

    _modelVsMapChildDiff: function _modelVsMapChildDiff(model, mapChild) {
      for (var p in model) {
        if (model.hasOwnProperty(p)) {

          // Only diff one level deep on parent model
          if (typeof model[p] === 'object') {
            continue;
          }

          if (model[p] !== mapChild[p]) {
            return true;
          }
        }
      }
      return false;
    }
  };

  /**
   * Reference to the GMap instance store
   */

  /**
   * Optional method to ensure correct parent data for Child Collection
   */

  /**
   * Optional method to remove event listeners ect.
   */

  /**
   * Optional method to call after a map child item has been added.
   */

  /**
   * Optional method to call before a map child item has been removed.
   */

  /**
   * [Observer to sync the Parent with the GMap model, of the same name]
   * @requires  {[Parent Model]}
   * @requires  {[GMap Model]}
   * @requires  {[GMap create method]}
   */
});