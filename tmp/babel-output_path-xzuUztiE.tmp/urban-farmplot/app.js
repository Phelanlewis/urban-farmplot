define('urban-farmplot/app', ['exports', 'ember', 'urban-farmplot/resolver', 'ember-load-initializers', 'urban-farmplot/config/environment'], function (exports, _ember, _urbanFarmplotResolver, _emberLoadInitializers, _urbanFarmplotConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _urbanFarmplotConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _urbanFarmplotConfigEnvironment['default'].podModulePrefix,
    Resolver: _urbanFarmplotResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _urbanFarmplotConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});