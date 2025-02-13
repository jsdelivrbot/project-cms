/* */ 
'use strict';
var command = require('../cmd-helpers').command;
module.exports = function(send) {
  return {
    apply: command(send, 'update'),
    check: command(send, 'update/check'),
    log: command(send, 'update/log')
  };
};
