define('urban-farmplot/router', ['exports', 'ember', 'urban-farmplot/config/environment'], function (exports, _ember, _urbanFarmplotConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _urbanFarmplotConfigEnvironment['default'].locationType,
    rootURL: _urbanFarmplotConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('sites');
  });

  exports['default'] = Router;
});