define('ember-cli-g-maps/mixins/g-maps/core/two-way-disable-double-click-zoom', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var observer = _ember['default'].observer;

  exports['default'] = _ember['default'].Mixin.create({

    /**
     * [observer for component attribute's `disableDoubleClickZoom` updates]
     * @param  {Boolean} 'isMapLoaded'
     * @param  {[Boolean]}  'disableDoubleClickZoom'
     * @return {[Boolean]} [returns false if map not updated]
     */
    _bindDisableDoubleClickZoomToMap: observer('isMapLoaded', 'disableDoubleClickZoom', function () {
      if (!this.get('isMapLoaded')) {
        return false;
      }

      this.get('map.map').setOptions({
        disableDoubleClickZoom: this.get('disableDoubleClickZoom') ? true : false
      });
    })
  });
});