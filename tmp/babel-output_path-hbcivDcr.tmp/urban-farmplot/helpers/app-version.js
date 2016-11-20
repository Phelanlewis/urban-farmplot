define('urban-farmplot/helpers/app-version', ['exports', 'ember', 'urban-farmplot/config/environment'], function (exports, _ember, _urbanFarmplotConfigEnvironment) {
  exports.appVersion = appVersion;
  var version = _urbanFarmplotConfigEnvironment['default'].APP.version;

  function appVersion() {
    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});