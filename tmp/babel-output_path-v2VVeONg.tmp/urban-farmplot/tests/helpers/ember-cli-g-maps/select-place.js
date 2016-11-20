define('urban-farmplot/tests/helpers/ember-cli-g-maps/select-place', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = function (app) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    _ember['default'].run(function () {
      var service = app.__container__.lookup('service:test-g-maps');
      service.selectPlace.apply(service, args);
    });
  };
});