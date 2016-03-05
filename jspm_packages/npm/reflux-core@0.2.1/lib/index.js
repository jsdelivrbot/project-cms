/* */ 
"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
var Reflux = {version: {"reflux-core": "0.2.1"}};
Reflux.ActionMethods = require('./ActionMethods');
Reflux.ListenerMethods = require('./ListenerMethods');
Reflux.PublisherMethods = require('./PublisherMethods');
Reflux.StoreMethods = require('./StoreMethods');
Reflux.createAction = require('./createAction');
Reflux.createStore = require('./createStore');
var maker = require('./joins').staticJoinCreator;
Reflux.joinTrailing = Reflux.all = maker("last");
Reflux.joinLeading = maker("first");
Reflux.joinStrict = maker("strict");
Reflux.joinConcat = maker("all");
var _ = Reflux.utils = require('./utils');
Reflux.EventEmitter = _.EventEmitter;
Reflux.Promise = _.Promise;
Reflux.createActions = (function() {
  var reducer = function reducer(definitions, actions) {
    Object.keys(definitions).forEach(function(actionName) {
      var val = definitions[actionName];
      actions[actionName] = Reflux.createAction(val);
    });
  };
  return function(definitions) {
    var actions = {};
    if (definitions instanceof Array) {
      definitions.forEach(function(val) {
        if (_.isObject(val)) {
          reducer(val, actions);
        } else {
          actions[val] = Reflux.createAction(val);
        }
      });
    } else {
      reducer(definitions, actions);
    }
    return actions;
  };
})();
Reflux.setEventEmitter = function(ctx) {
  Reflux.EventEmitter = _.EventEmitter = ctx;
};
Reflux.setPromise = function(ctx) {
  Reflux.Promise = _.Promise = ctx;
};
Reflux.setPromiseFactory = function(factory) {
  _.createPromise = factory;
};
Reflux.nextTick = function(nextTick) {
  _.nextTick = nextTick;
};
Reflux.use = function(pluginCb) {
  pluginCb(Reflux);
};
Reflux.__keep = require('./Keep');
if (!Function.prototype.bind) {
  console.error("Function.prototype.bind not available. " + "ES5 shim required. " + "https://github.com/spoike/refluxjs#es5");
}
exports["default"] = Reflux;
module.exports = exports["default"];
