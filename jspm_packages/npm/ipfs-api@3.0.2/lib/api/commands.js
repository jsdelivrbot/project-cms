/* */ 
'use strict';
var command = require('../cmd-helpers').command;
module.exports = function(send) {
  return command(send, 'commands');
};
