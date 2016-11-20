'use strict';

define('urban-farmplot/tests/adapters/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | adapters/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass jshint.');
  });
});
define('urban-farmplot/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('urban-farmplot/tests/controllers/g-maps.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/g-maps.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/g-maps.js should pass jshint.');
  });
});
define('urban-farmplot/tests/helpers/create-offline-ref', ['exports', 'firebase'], function (exports, _firebase) {
  exports['default'] = createOfflineRef;
  var DEFAULT_NAME = '[EmberFire offline test app]';

  exports.DEFAULT_NAME = DEFAULT_NAME;
  /**
   * Creates an offline firebase reference with optional initial data and url.
   *
   * Be sure to `stubfirebase()` and `unstubfirebase()` in your tests!
   *
   * @param  {!Object} [initialData]
   * @param  {string} [url]
   * @param  {string} [apiKey]
   * @return {!firebase.database.Reference}
   */

  function createOfflineRef(initialData) {
    var url = arguments.length <= 1 || arguments[1] === undefined ? 'https://emberfire-tests-2c814.firebaseio.com' : arguments[1];
    var apiKey = arguments.length <= 2 || arguments[2] === undefined ? 'AIzaSyC9-ndBb1WR05rRF1msVQDV6EBqB752m6o' : arguments[2];

    if (!_firebase['default']._unStub) {
      throw new Error('Please use stubFirebase() before calling this method');
    }

    var config = {
      apiKey: apiKey,
      authDomain: 'emberfire-tests-2c814.firebaseapp.com',
      databaseURL: url,
      storageBucket: ''
    };

    var app = undefined;

    try {
      app = _firebase['default'].app(DEFAULT_NAME);
    } catch (e) {
      app = _firebase['default'].initializeApp(config, DEFAULT_NAME);
    }

    var ref = app.database().ref();

    app.database().goOffline(); // must be called after the ref is created

    if (initialData) {
      ref.set(initialData);
    }

    return ref;
  }
});
define('urban-farmplot/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('urban-farmplot/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('urban-farmplot/tests/helpers/destroy-firebase-apps', ['exports', 'ember', 'firebase'], function (exports, _ember, _firebase) {
  exports['default'] = destroyFirebaseApps;
  var run = _ember['default'].run;

  /**
   * Destroy all Firebase apps.
   */

  function destroyFirebaseApps() {
    var deletions = _firebase['default'].apps.map(function (app) {
      return app['delete']();
    });
    _ember['default'].RSVP.all(deletions).then(function () {
      return run(function () {
        // NOOP to delay run loop until the apps are destroyed
      });
    });
  }
});
define('urban-farmplot/tests/helpers/ember-cli-g-maps/notify-autocomplete', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = function (app, test, id, data) {
    _ember['default'].run(function () {
      test.gMapService._notifyAutocomplete(id, null, data);
    });
  };

  ;
});
define('urban-farmplot/tests/helpers/ember-cli-g-maps/register-async-helpers', ['exports', 'ember', 'urban-farmplot/tests/helpers/ember-cli-g-maps/select-place'], function (exports, _ember, _urbanFarmplotTestsHelpersEmberCliGMapsSelectPlace) {
  exports['default'] = function () {
    _ember['default'].Test.registerAsyncHelper('selectPlace', _urbanFarmplotTestsHelpersEmberCliGMapsSelectPlace['default']);
  };
});
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
define('urban-farmplot/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember', 'urban-farmplot/tests/helpers/start-app', 'urban-farmplot/tests/helpers/destroy-app'], function (exports, _qunit, _ember, _urbanFarmplotTestsHelpersStartApp, _urbanFarmplotTestsHelpersDestroyApp) {
  var Promise = _ember['default'].RSVP.Promise;

  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _urbanFarmplotTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _urbanFarmplotTestsHelpersDestroyApp['default'])(_this.application);
        });
      }
    });
  };
});
define('urban-farmplot/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('urban-farmplot/tests/helpers/replace-app-ref', ['exports'], function (exports) {
  exports['default'] = replaceAppRef;
  /**
   * Updates the supplied app adapter's Firebase reference.
   *
   * @param  {!Ember.Application} app
   * @param  {!firebase.database.Reference} ref
   * @param  {string} [model]  The model, if overriding a model specific adapter
   */

  function replaceAppRef(app, ref) {
    var model = arguments.length <= 2 || arguments[2] === undefined ? 'application' : arguments[2];

    app.register('service:firebaseMock', ref, { instantiate: false, singleton: true });
    app.inject('adapter:firebase', 'firebase', 'service:firebaseMock');
    app.inject('adapter:' + model, 'firebase', 'service:firebaseMock');
  }
});
define('urban-farmplot/tests/helpers/replace-firebase-app-service', ['exports'], function (exports) {
  exports['default'] = replaceFirebaseAppService;
  /**
   * Replaces the `firebaseApp` service with your own using injection overrides.
   *
   * This is usually not needed in test modules, where you can re-register over
   * existing names in the registry, but in acceptance tests, some registry/inject
   * magic is needed.
   *
   * @param  {!Ember.Application} app
   * @param  {!Object} newService
   */

  function replaceFirebaseAppService(app, newService) {
    app.register('service:firebaseAppMock', newService, { instantiate: false, singleton: true });
    app.inject('torii-provider:firebase', 'firebaseApp', 'service:firebaseAppMock');
    app.inject('torii-adapter:firebase', 'firebaseApp', 'service:firebaseAppMock');
  }
});
define('urban-farmplot/tests/helpers/resolver', ['exports', 'urban-farmplot/resolver', 'urban-farmplot/config/environment'], function (exports, _urbanFarmplotResolver, _urbanFarmplotConfigEnvironment) {

  var resolver = _urbanFarmplotResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _urbanFarmplotConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _urbanFarmplotConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('urban-farmplot/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('urban-farmplot/tests/helpers/start-app', ['exports', 'ember', 'urban-farmplot/app', 'urban-farmplot/config/environment'], function (exports, _ember, _urbanFarmplotApp, _urbanFarmplotConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _urbanFarmplotConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _urbanFarmplotApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('urban-farmplot/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('urban-farmplot/tests/helpers/stub-firebase', ['exports', 'firebase'], function (exports, _firebase) {
  exports['default'] = stubFirebase;

  /**
   * When a reference is in offline mode it will not call any callbacks
   * until it goes online and resyncs. The ref will have already
   * updated its internal cache with the changed values so we shortcut
   * the process and call the supplied callbacks immediately (asynchronously).
   */

  function stubFirebase() {
    // check for existing stubbing
    if (!_firebase['default']._unStub) {
      var originalSet = _firebase['default'].database.Reference.prototype.set;
      var originalUpdate = _firebase['default'].database.Reference.prototype.update;
      var originalRemove = _firebase['default'].database.Reference.prototype.remove;

      _firebase['default']._unStub = function () {
        _firebase['default'].database.Reference.prototype.set = originalSet;
        _firebase['default'].database.Reference.prototype.update = originalUpdate;
        _firebase['default'].database.Reference.prototype.remove = originalRemove;
      };

      _firebase['default'].database.Reference.prototype.set = function (data, cb) {
        originalSet.call(this, data);
        if (typeof cb === 'function') {
          setTimeout(cb, 0);
        }
      };

      _firebase['default'].database.Reference.prototype.update = function (data, cb) {
        originalUpdate.call(this, data);
        if (typeof cb === 'function') {
          setTimeout(cb, 0);
        }
      };

      _firebase['default'].database.Reference.prototype.remove = function (cb) {
        originalRemove.call(this);
        if (typeof cb === 'function') {
          setTimeout(cb, 0);
        }
      };
    }
  }
});
define('urban-farmplot/tests/helpers/torii', ['exports'], function (exports) {
  exports.stubValidSession = stubValidSession;

  function stubValidSession(application, sessionData) {
    var session = application.__container__.lookup('service:session');
    var sm = session.get('stateMachine');
    Ember.run(function () {
      sm.send('startOpen');
      sm.send('finishOpen', sessionData);
    });
  }
});
define('urban-farmplot/tests/helpers/unstub-firebase', ['exports', 'firebase'], function (exports, _firebase) {
  exports['default'] = unstubFirebase;

  function unstubFirebase() {
    if (typeof _firebase['default']._unStub === 'function') {
      _firebase['default']._unStub();
      delete _firebase['default']._unStub;
    }
  }
});
define('urban-farmplot/tests/models/sites.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/sites.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/sites.js should pass jshint.');
  });
});
define('urban-farmplot/tests/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('urban-farmplot/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('urban-farmplot/tests/routes/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass jshint.');
  });
});
define('urban-farmplot/tests/routes/sites.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/sites.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/sites.js should pass jshint.');
  });
});
define('urban-farmplot/tests/test-helper', ['exports', 'urban-farmplot/tests/helpers/resolver', 'ember-qunit'], function (exports, _urbanFarmplotTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_urbanFarmplotTestsHelpersResolver['default']);
});
define('urban-farmplot/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('urban-farmplot/tests/torii-adapters/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | torii-adapters/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'torii-adapters/application.js should pass jshint.');
  });
});
define('urban-farmplot/tests/unit/controllers/g-maps-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:g-maps', 'Unit | Controller | g maps', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('urban-farmplot/tests/unit/controllers/g-maps-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/g-maps-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/g-maps-test.js should pass jshint.');
  });
});
define('urban-farmplot/tests/unit/models/sites-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('sites', 'Unit | Model | sites', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('urban-farmplot/tests/unit/models/sites-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/sites-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/sites-test.js should pass jshint.');
  });
});
define('urban-farmplot/tests/unit/routes/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:application', 'Unit | Route | application', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('urban-farmplot/tests/unit/routes/application-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/application-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/application-test.js should pass jshint.');
  });
});
define('urban-farmplot/tests/unit/routes/sites-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:sites', 'Unit | Route | sites', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('urban-farmplot/tests/unit/routes/sites-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/sites-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/sites-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('urban-farmplot/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map
