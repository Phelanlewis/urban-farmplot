define('urban-farmplot/tests/helpers/start-app', ['exports', 'ember', 'urban-farmplot/app', 'urban-farmplot/config/environment'], function (exports, _ember, _urbanFarmplotApp, _urbanFarmplotConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _urbanFarmplotConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _urbanFarmplotApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});