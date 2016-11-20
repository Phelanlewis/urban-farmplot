define('urban-farmplot/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'urban-farmplot/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _urbanFarmplotConfigEnvironment) {
  var _config$APP = _urbanFarmplotConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});