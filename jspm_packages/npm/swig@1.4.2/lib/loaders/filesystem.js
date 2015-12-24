/* */ 
(function(process) {
  var fs = require('fs'),
      path = require('path');
  module.exports = function(basepath, encoding) {
    var ret = {};
    encoding = encoding || 'utf8';
    basepath = (basepath) ? path.normalize(basepath) : null;
    ret.resolve = function(to, from) {
      if (basepath) {
        from = basepath;
      } else {
        from = (from) ? path.dirname(from) : process.cwd();
      }
      return path.resolve(from, to);
    };
    ret.load = function(identifier, cb) {
      if (!fs || (cb && !fs.readFile) || !fs.readFileSync) {
        throw new Error('Unable to find file ' + identifier + ' because there is no filesystem to read from.');
      }
      identifier = ret.resolve(identifier);
      if (cb) {
        fs.readFile(identifier, encoding, cb);
        return;
      }
      return fs.readFileSync(identifier, encoding);
    };
    return ret;
  };
})(require('process'));
