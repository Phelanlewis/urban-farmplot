define('urban-farmplot/models/sites', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    title: _emberData['default'].attr('string'),
    notes: _emberData['default'].attr('string'),
    lat: _emberData['default'].attr('number'),
    lng: _emberData['default'].attr('number')
  });
});