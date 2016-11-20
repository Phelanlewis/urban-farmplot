export default Ember.HTMLBars.template((function() {
  var child0 = (function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 4,
              "column": 2
            }
          },
          "moduleName": "modules/ember-g-map/templates/components/g-map-address-marker.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","yield",[["get","markerContext",["loc",[null,[3,12],[3,25]]],0,0,0,0]],[],["loc",[null,[3,4],[3,27]]],0,0]
        ],
        locals: ["markerContext"],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 0
          }
        },
        "moduleName": "modules/ember-g-map/templates/components/g-map-address-marker.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","g-map-marker",[["get","mapContext",["loc",[null,[2,18],[2,28]]],0,0,0,0]],["lat",["subexpr","@mut",[["get","lat",["loc",[null,[2,33],[2,36]]],0,0,0,0]],[],[],0,0],"lng",["subexpr","@mut",[["get","lng",["loc",[null,[2,41],[2,44]]],0,0,0,0]],[],[],0,0],"icon",["subexpr","@mut",[["get","icon",["loc",[null,[2,50],[2,54]]],0,0,0,0]],[],[],0,0],"label",["subexpr","@mut",[["get","label",["loc",[null,[2,61],[2,66]]],0,0,0,0]],[],[],0,0],"group",["subexpr","@mut",[["get","group",["loc",[null,[2,73],[2,78]]],0,0,0,0]],[],[],0,0],"title",["subexpr","@mut",[["get","title",["loc",[null,[2,85],[2,90]]],0,0,0,0]],[],[],0,0]],0,null,["loc",[null,[2,2],[4,19]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }());
  var child1 = (function() {
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 5,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 0
          }
        },
        "moduleName": "modules/ember-g-map/templates/components/g-map-address-marker.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
        return morphs;
      },
      statements: [
        ["inline","g-map-marker",[["get","mapContext",["loc",[null,[6,17],[6,27]]],0,0,0,0]],["lat",["subexpr","@mut",[["get","lat",["loc",[null,[6,32],[6,35]]],0,0,0,0]],[],[],0,0],"lng",["subexpr","@mut",[["get","lng",["loc",[null,[6,40],[6,43]]],0,0,0,0]],[],[],0,0],"icon",["subexpr","@mut",[["get","icon",["loc",[null,[6,49],[6,53]]],0,0,0,0]],[],[],0,0],"label",["subexpr","@mut",[["get","label",["loc",[null,[6,60],[6,65]]],0,0,0,0]],[],[],0,0],"title",["subexpr","@mut",[["get","title",["loc",[null,[6,72],[6,77]]],0,0,0,0]],[],[],0,0],"group",["subexpr","@mut",[["get","group",["loc",[null,[6,84],[6,89]]],0,0,0,0]],[],[],0,0]],["loc",[null,[6,2],[6,91]]],0,0]
      ],
      locals: [],
      templates: []
    };
  }());
  return {
    meta: {
      "revision": "Ember@2.9.1",
      "loc": {
        "source": null,
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 8,
          "column": 0
        }
      },
      "moduleName": "modules/ember-g-map/templates/components/g-map-address-marker.hbs"
    },
    isEmpty: false,
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createComment("");
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var morphs = new Array(1);
      morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
      dom.insertBoundary(fragment, 0);
      dom.insertBoundary(fragment, null);
      return morphs;
    },
    statements: [
      ["block","if",[["get","hasBlock",["loc",[null,[1,6],[1,14]]],0,0,0,0]],[],0,1,["loc",[null,[1,0],[7,7]]]]
    ],
    locals: [],
    templates: [child0, child1]
  };
}()));