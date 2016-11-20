define('ember-cli-g-maps/mixins/g-maps/core/two-way-zoom-control', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var observer = _ember['default'].observer;

  exports['default'] = _ember['default'].Mixin.create({

    /**
     * [observer for component attribute's `showZoomControl` updates]
     * @param  {Boolean} 'isMapLoaded'
     * @param  {[Boolean]}  'showZoomControl'
     * @return {[Boolean]} [returns false if map not updated]
     */
    _bindZoomControlToMap: observer('isMapLoaded', 'showZoomControl', function () {
      if (!this.get('isMapLoaded')) {
        return false;
      }

      this.get('map.map').setOptions({
        zoomControl: this.get('showZoomControl') ? true : false
      });
    })
  });
});