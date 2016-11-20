define('urban-farmplot/tests/helpers/resolver', ['exports', 'urban-farmplot/resolver', 'urban-farmplot/config/environment'], function (exports, _urbanFarmplotResolver, _urbanFarmplotConfigEnvironment) {

  var resolver = _urbanFarmplotResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _urbanFarmplotConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _urbanFarmplotConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});