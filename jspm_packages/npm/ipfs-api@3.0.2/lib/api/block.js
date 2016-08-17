/* */ 
'use strict';
var argCommand = require('../cmd-helpers').argCommand;
module.exports = function(send) {
  return {
    get: argCommand(send, 'block/get'),
    stat: argCommand(send, 'block/stat'),
    put: function put(file, cb) {
      if (Array.isArray(file)) {
        return cb(null, new Error('block.put() only accepts 1 file'));
      }
      return send('block/put', null, null, file, cb);
    }
  };
};
