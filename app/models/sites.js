import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  notes: DS.attr('string'),
  lat: DS.attr('number'),
  lng: DS.attr('number')
});
