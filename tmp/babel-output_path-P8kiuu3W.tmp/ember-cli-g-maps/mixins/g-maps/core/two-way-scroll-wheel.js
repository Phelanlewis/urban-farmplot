define('ember-cli-g-maps/mixins/g-maps/core/two-way-scroll-wheel', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var observer = _ember['default'].observer;

  exports['default'] = _ember['default'].Mixin.create({

    /**
     * [observer for component attribute's `scrollwheel` updates]
     * @param  {Boolean} 'isMapLoaded'
     * @param  {[Boolean]}  'scrollwheel'
     * @return {[Boolean]} [returns false if map not updated]
     */
    _bindScrollwheelToMap: observer('isMapLoaded', 'scrollwheel', function () {
      if (!this.get('isMapLoaded')) {
        return false;
      }

      this.get('map.map').setOptions({
        scrollwheel: this.get('scrollwheel') ? true : false
      });
    })
  });
});