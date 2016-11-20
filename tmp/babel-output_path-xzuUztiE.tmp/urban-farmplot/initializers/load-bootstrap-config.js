define('urban-farmplot/initializers/load-bootstrap-config', ['exports', 'urban-farmplot/config/environment', 'ember-bootstrap/config'], function (exports, _urbanFarmplotConfigEnvironment, _emberBootstrapConfig) {
  exports.initialize = initialize;

  function initialize() /* container, application */{
    _emberBootstrapConfig['default'].load(_urbanFarmplotConfigEnvironment['default']['ember-bootstrap'] || {});
  }

  exports['default'] = {
    name: 'load-bootstrap-config',
    initialize: initialize
  };
});