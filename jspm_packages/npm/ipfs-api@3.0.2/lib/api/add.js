/* */ 
'use strict';

var Wreck = require('wreck');

module.exports = function (send) {
  return function add(files, opts, cb) {
    if (typeof opts === 'function' && cb === undefined) {
      cb = opts;
      opts = {};
    }

    if (typeof files === 'string' && files.startsWith('http')) {
      return Wreck.request('GET', files, null, function (err, res) {
        if (err) return cb(err);

        send('add', null, opts, res, cb);
      });
    }

    return send('add', null, opts, files, cb);
  };
};