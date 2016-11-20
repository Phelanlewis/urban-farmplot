define('urban-farmplot/tests/helpers/ember-cli-g-maps/register-async-helpers', ['exports', 'ember', 'urban-farmplot/tests/helpers/ember-cli-g-maps/select-place'], function (exports, _ember, _urbanFarmplotTestsHelpersEmberCliGMapsSelectPlace) {
  exports['default'] = function () {
    _ember['default'].Test.registerAsyncHelper('selectPlace', _urbanFarmplotTestsHelpersEmberCliGMapsSelectPlace['default']);
  };
});