define('urban-farmplot/tests/helpers/ember-cli-g-maps/setup-test', ['exports', 'urban-farmplot/tests/helpers/ember-cli-g-maps/test-g-maps-service'], function (exports, _urbanFarmplotTestsHelpersEmberCliGMapsTestGMapsService) {
  exports['default'] = function (test) {

    // if it is an Acceptance test
    if (test.application) {
      test.application.register('service:test-g-maps', _urbanFarmplotTestsHelpersEmberCliGMapsTestGMapsService['default']);
      return;
    }

    test.register('service:test-g-maps', _urbanFarmplotTestsHelpersEmberCliGMapsTestGMapsService['default']);
    test.inject.service('test-g-maps');
    var service = test.get('test-g-maps');

    test.gMapsSelectPlace = function () {
      service.selectPlace.apply(service, arguments);
    };
  };
});