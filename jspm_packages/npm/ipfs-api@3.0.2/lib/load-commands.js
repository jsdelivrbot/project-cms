/* */ 
'use strict';
var _keys = require('babel-runtime/core-js/object/keys');
var _keys2 = _interopRequireDefault(_keys);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
function requireCommands() {
  return {
    add: require('./api/add'),
    block: require('./api/block'),
    cat: require('./api/cat'),
    commands: require('./api/commands'),
    config: require('./api/config'),
    dht: require('./api/dht'),
    diag: require('./api/diag'),
    id: require('./api/id'),
    files: require('./api/files'),
    log: require('./api/log'),
    ls: require('./api/ls'),
    mount: require('./api/mount'),
    name: require('./api/name'),
    object: require('./api/object'),
    pin: require('./api/pin'),
    ping: require('./api/ping'),
    refs: require('./api/refs'),
    swarm: require('./api/swarm'),
    update: require('./api/update'),
    version: require('./api/version')
  };
}
function loadCommands(send) {
  var files = requireCommands();
  var cmds = {};
  (0, _keys2.default)(files).forEach(function(file) {
    cmds[file] = files[file](send);
  });
  return cmds;
}
module.exports = loadCommands;
