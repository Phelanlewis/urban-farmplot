import Ember from 'ember';
import childCollection from 'ember-cli-g-maps/utils/g-maps/child-collection';

var isArray = Ember.isArray;

export default Ember.Mixin.create(childCollection.create({
  model: 'polygons',

  namespace: 'polygon',

  /* Supported:
  props: [ 'clickable', 'draggable', 'editable', 'fillColor', 'fillOpacity', 'geodesic', 'paths', 'strokeColor', 'strokeOpacity', 'strokePosition', 'strokeWeight', 'visible', 'zIndex' ],
   events: [ 'click', 'rightclick', 'dblclick', 'drag', 'dragend', 'dragstart', 'mousedown', 'mouseout', 'mouseover', 'mouseup', 'mousemove' ],
  */

  validate: function validatePolygons() {
    var polygons = this.get('polygons');

    if (!polygons) {
      return;
    } // validation not necessary

    if (!isArray(polygons)) {
      throw new Error('g-maps component expects polygons to be an Ember Array');
    }

    // End validation
    if (!polygons[0] || !polygons[0].paths || !polygons[0].paths[0]) {
      return;
    }

    // Reminder for well formed polygon paths
    if (!isArray(polygons[0].paths[0])) {
      throw new Error('g-maps polygon paths expects Array of Arrays: [[lat, lng]]');
    }
  }
}));