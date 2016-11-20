define('urban-farmplot/tests/helpers/ember-cli-g-maps/notify-autocomplete', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = function (app, test, id, data) {
    _ember['default'].run(function () {
      test.gMapService._notifyAutocomplete(id, null, data);
    });
  };

  ;
});