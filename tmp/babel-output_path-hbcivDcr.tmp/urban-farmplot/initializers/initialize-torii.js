define('urban-farmplot/initializers/initialize-torii', ['exports', 'torii/bootstrap/torii', 'torii/configuration', 'urban-farmplot/config/environment'], function (exports, _toriiBootstrapTorii, _toriiConfiguration, _urbanFarmplotConfigEnvironment) {

  var initializer = {
    name: 'torii',
    initialize: function initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      (0, _toriiConfiguration.configure)(_urbanFarmplotConfigEnvironment['default'].torii || {});
      (0, _toriiBootstrapTorii['default'])(application);
      application.inject('route', 'torii', 'service:torii');
    }
  };

  exports['default'] = initializer;
});