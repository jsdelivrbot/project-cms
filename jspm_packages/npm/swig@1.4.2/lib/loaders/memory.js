/* */ 
var path = require('path'),
    utils = require('../utils');
module.exports = function(mapping, basepath) {
  var ret = {};
  basepath = (basepath) ? path.normalize(basepath) : null;
  ret.resolve = function(to, from) {
    if (basepath) {
      from = basepath;
    } else {
      from = (from) ? path.dirname(from) : '/';
    }
    return path.resolve(from, to);
  };
  ret.load = function(pathname, cb) {
    var src,
        paths;
    paths = [pathname, pathname.replace(/^(\/|\\)/, '')];
    src = mapping[paths[0]] || mapping[paths[1]];
    if (!src) {
      utils.throwError('Unable to find template "' + pathname + '".');
    }
    if (cb) {
      cb(null, src);
      return;
    }
    return src;
  };
  return ret;
};
