/* */ 
(function(process) {
  'use strict';
  exports.__esModule = true;
  exports['default'] = combineReducers;
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {'default': obj};
  }
  var _immutable = require('immutable');
  var _immutable2 = _interopRequireDefault(_immutable);
  var ActionTypes = {INIT: 'INIT'};
  var isImmutable = function isImmutable(obj) {
    return _immutable2['default'].Iterable.isIterable(obj);
  };
  function getErrorMessage(key, action) {
    var actionType = action && action.type;
    var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';
    return 'Reducer "' + key + '" returned undefined handling ' + actionName + '. ' + 'To ignore an action, you must explicitly return the previous state.';
  }
  function verifyStateShape(initialState, currentState) {
    var reducerKeys = currentState.keySeq();
    if (reducerKeys.size === 0) {
      console.error('Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.');
      return;
    }
    if (!isImmutable(initialState)) {
      console.error('initialState has unexpected type of "' + ({}).toString.call(initialState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected initialState to be an instance of Immutable.Iterable with the following ' + ('keys: "' + reducerKeys.join('", "') + '"'));
      return;
    }
    var unexpectedKeys = initialState.keySeq().filter(function(key) {
      return reducerKeys.indexOf(key) < 0;
    });
    if (unexpectedKeys.size > 0) {
      console.error('Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" in initialState will be ignored. ') + ('Expected to find one of the known reducer keys instead: "' + reducerKeys.join('", "') + '"'));
    }
  }
  function combineReducers(reducers) {
    reducers = isImmutable(reducers) ? reducers : _immutable2['default'].fromJS(reducers);
    var finalReducers = reducers.filter(function(v) {
      return typeof v === 'function';
    });
    finalReducers.forEach(function(reducer, key) {
      if (typeof reducer(undefined, {type: ActionTypes.INIT}) === 'undefined') {
        throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
      }
      var type = Math.random().toString(36).substring(7).split('').join('.');
      if (typeof reducer(undefined, {type: type}) === 'undefined') {
        throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
      }
    });
    var defaultState = finalReducers.map(function(r) {
      return undefined;
    });
    var stateShapeVerified;
    return function combination(state, action) {
      if (state === undefined)
        state = defaultState;
      var dirty = false;
      var finalState = finalReducers.map(function(reducer, key) {
        var oldState = state.get(key);
        var newState = reducer(oldState, action);
        dirty = dirty || oldState !== newState;
        if (typeof newState === 'undefined') {
          throw new Error(getErrorMessage(key, action));
        }
        return newState;
      });
      if (typeof process !== 'undefined' && typeof process.env !== 'undefined' && process.env.NODE_ENV !== 'production' || typeof __DEV__ !== 'undefined' && __DEV__) {
        if (!stateShapeVerified) {
          verifyStateShape(state, finalState);
          stateShapeVerified = true;
        }
      }
      return dirty ? finalState : state;
    };
  }
  module.exports = exports['default'];
})(require('process'));
