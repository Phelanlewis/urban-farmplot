define('urban-farmplot/tests/helpers/ember-cli-g-maps/test-g-maps-service', ['exports', 'ember'], function (exports, _ember) {
  var get = _ember['default'].get;
  var computed = _ember['default'].computed;
  exports['default'] = _ember['default'].Service.extend({
    autocompletes: computed(function () {
      return {};
    }),

    registerAutocomplete: function registerAutocomplete(component) {
      var elementId = get(component, 'elementId');
      var autocompletes = this.get('autocompletes');

      autocompletes[elementId] = component;
    },

    unregisterAutocomplete: function unregisterAutocomplete(component) {
      var elementId = get(component, 'elementId');
      var autocompletes = this.get('autocompletes');

      delete autocompletes[elementId];
    },

    selectPlace: function selectPlace(componentId, data) {
      var autocompletes = this.get('autocompletes');

      if (arguments.length === 1) {
        data = componentId;
        componentId = Object.keys(autocompletes)[0];
      }

      var component = autocompletes[componentId];
      if (component) {
        component.sendAction('on-select', data);
      } else {
        _ember['default'].Logger.logger('Notify was called without a component being registered');
      }
    }
  });
});