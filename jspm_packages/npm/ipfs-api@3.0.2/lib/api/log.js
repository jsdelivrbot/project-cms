/* */ 
'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ndjson = require('ndjson');

module.exports = function (send) {
  return {
    tail: function tail(cb) {
      if (typeof cb !== 'function' && typeof _promise2.default !== 'undefined') {
        return send('log/tail', null, {}, null, false).then(function (res) {
          return res.pipe(ndjson.parse());
        });
      }

      return send('log/tail', null, {}, null, false, function (err, res) {
        if (err) return cb(err);
        cb(null, res.pipe(ndjson.parse()));
      });
    }
  };
};