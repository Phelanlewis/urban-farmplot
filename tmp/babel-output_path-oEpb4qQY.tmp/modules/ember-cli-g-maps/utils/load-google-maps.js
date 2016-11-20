import Ember from 'ember';

var RSVP = Ember.RSVP;

/**
 * Get the content of element referencing the Google Maps src
 * @param {String} query [location of HTML element]
 * @return {String|Boolean}
 */
var getLazyLoadSrc = function getLazyLoadSrc() {
  var query = arguments.length <= 0 || arguments[0] === undefined ? 'meta[name="ember-cli-g-maps-url"]' : arguments[0];

  var meta = undefined;

  if (typeof query === 'object') {
    meta = query;
  } else {
    meta = Ember.$(query).get(0);
  }

  if (!meta) {
    return false;
  }

  // Return content property or bust
  var content = meta.getAttribute('content') || '';
  return content.length ? content : false;
};

/**
 * Request Google Maps script and promise result
 * @param {String} src
 * @return {Promise}
 */
var lazyLoadGoogleMap = function lazyLoadGoogleMap(src) {
  if (!src) {
    return RSVP.Promise.reject(); // Google Maps source undefined
  }

  return new RSVP.Promise(function (resolve, reject) {
    Ember.$.getScript(src).success(function emberCliGMapsLazyLoadSuccess() {
      resolve(window.google.maps);
    }).fail(function emberCliGMapsLazyLoadFailure(jqXhr) {
      reject(jqXhr); // resolve error
    });
  });
};

export default (function () {
  var googleMapPromise = undefined;

  /**
   * Attempts to resolve global `google.maps` -> then attempts lazy load -> otherwise rejects
   * @type {Function} loadGoogleMaps
   * @return {Promise}
   * - @resolve {Object} google.maps
   */
  function loadGoogleMaps() {

    /**
     * Resolve available global google.maps
     */

    if (typeof google === 'object' && typeof google.maps === 'object') {
      return RSVP.Promise.resolve(window.google.maps); // Google maps is loaded
    }

    /**
     * Resolve existing `googleMapsPromise` or initiate lazy load
     */

    if (typeof googleMapPromise === 'undefined') {
      googleMapPromise = loadGoogleMaps.lazyLoadGoogleMap(loadGoogleMaps.getLazyLoadSrc());
    }

    return googleMapPromise;
  }

  loadGoogleMaps.getLazyLoadSrc = getLazyLoadSrc;
  loadGoogleMaps.lazyLoadGoogleMap = lazyLoadGoogleMap;

  return loadGoogleMaps;
})();