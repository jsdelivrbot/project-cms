/* */ 
(function(process) {
  'use strict';
  exports.__esModule = true;
  exports['default'] = createReducer;
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {'default': obj};
  }
  var _immutable = require('immutable');
  var _immutable2 = _interopRequireDefault(_immutable);
  function createReducer(initialState, handlers) {
    var enforceImmutable = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
    var constructor = arguments.length <= 3 || arguments[3] === undefined ? _immutable2['default'].fromJS.bind(_immutable2['default']) : arguments[3];
    return function(state, action) {
      if (state === undefined)
        state = initialState;
      if (!_immutable2['default'].Iterable.isIterable(state)) {
        state = constructor(state);
      }
      var handler = action && action.type ? handlers[action.type] : undefined;
      if (!handler) {
        return state;
      }
      state = handler(state, action);
      if (enforceImmutable && !_immutable2['default'].Iterable.isIterable(state)) {
        throw new TypeError('Reducers must return Immutable objects.');
      }
      return state;
    };
  }
  module.exports = exports['default'];
})(require('process'));
