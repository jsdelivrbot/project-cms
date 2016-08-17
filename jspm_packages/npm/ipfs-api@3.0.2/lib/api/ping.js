/* */ 
'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (send) {
  return function ping(id, cb) {
    if (typeof cb !== 'function' && typeof _promise2.default !== 'undefined') {
      return send('ping', id, { n: 1 }, null).then(function (res) {
        return res[1];
      });
    }

    return send('ping', id, { n: 1 }, null, function (err, res) {
      if (err) return cb(err, null);
      cb(null, res[1]);
    });
  };
};