/* */ 
(function(Buffer) {
  'use strict';
  var _assign = require('babel-runtime/core-js/object/assign');
  var _assign2 = _interopRequireDefault(_assign);
  var _typeof2 = require('babel-runtime/helpers/typeof');
  var _typeof3 = _interopRequireDefault(_typeof2);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  var multiaddr = require('multiaddr');
  var loadCommands = require('./load-commands');
  var getConfig = require('./config');
  var getRequestAPI = require('./request-api');
  function IpfsAPI(host_or_multiaddr, port, opts) {
    var config = getConfig();
    try {
      var maddr = multiaddr(host_or_multiaddr).nodeAddress();
      config.host = maddr.address;
      config.port = maddr.port;
    } catch (e) {
      if (typeof host_or_multiaddr === 'string') {
        config.host = host_or_multiaddr;
        config.port = port && (typeof port === 'undefined' ? 'undefined' : (0, _typeof3.default)(port)) !== 'object' ? port : config.port;
      }
    }
    var lastIndex = arguments.length;
    while (!opts && lastIndex-- > 0) {
      opts = arguments[lastIndex];
      if (opts)
        break;
    }
    (0, _assign2.default)(config, opts);
    if (!config.host && typeof window !== 'undefined') {
      var split = window.location.host.split(':');
      config.host = split[0];
      config.port = split[1];
    }
    var requestAPI = getRequestAPI(config);
    var cmds = loadCommands(requestAPI);
    cmds.send = requestAPI;
    cmds.Buffer = Buffer;
    return cmds;
  }
  exports = module.exports = IpfsAPI;
})(require('buffer').Buffer);
