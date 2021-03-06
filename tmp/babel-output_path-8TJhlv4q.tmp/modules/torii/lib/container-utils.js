export { hasRegistration };
export { register };
export { lookupFactory };
export { lookup };
export { getOwner };

function hasRegistration(application, name) {
  if (application && application.hasRegistration) {
    return application.hasRegistration(name);
  } else {
    return application.registry.has(name);
  }
}

function register(applicationInstance, name, factory) {
  if (applicationInstance && applicationInstance.application) {
    return applicationInstance.application.register(name, factory);
  } else {
    return applicationInstance.registry.register(name, factory);
  }
}

function lookupFactory(applicationInstance, name) {
  if (applicationInstance && applicationInstance.lookupFactory) {
    return applicationInstance.lookupFactory(name);
  } else if (applicationInstance && applicationInstance.application) {
    return applicationInstance.application.__container__.lookupFactory(name);
  } else {
    return applicationInstance.container.lookupFactory(name);
  }
}

function lookup(applicationInstance, name) {
  if (applicationInstance && applicationInstance.lookup) {
    return applicationInstance.lookup(name);
  } else if (applicationInstance && applicationInstance.application) {
    return applicationInstance.application.__container__.lookup(name);
  } else {
    return applicationInstance.container.lookup(name);
  }
}

function getOwner(instance) {
  if (Ember.getOwner) {
    return Ember.getOwner(instance);
  } else {
    return instance.container;
  }
}