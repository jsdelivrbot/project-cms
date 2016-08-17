/* */ 
'use strict';
var _stringify = require('babel-runtime/core-js/json/stringify');
var _stringify2 = _interopRequireDefault(_stringify);
var _typeof2 = require('babel-runtime/helpers/typeof');
var _typeof3 = _interopRequireDefault(_typeof2);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
var argCommand = require('../cmd-helpers').argCommand;
module.exports = function(send) {
  return {
    get: argCommand(send, 'config'),
    set: function set(key, value, opts, cb) {
      if (typeof opts === 'function') {
        cb = opts;
        opts = {};
      }
      if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
        value = (0, _stringify2.default)(value);
        opts = {json: true};
      } else if (typeof value === 'boolean') {
        value = value.toString();
        opts = {bool: true};
      }
      return send('config', [key, value], opts, null, cb);
    },
    show: function show(cb) {
      return send('config/show', null, null, null, true, cb);
    },
    replace: function replace(file, cb) {
      return send('config/replace', null, null, file, cb);
    }
  };
};
