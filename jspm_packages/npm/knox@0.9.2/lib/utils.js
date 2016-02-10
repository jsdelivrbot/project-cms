/* */ 
(function(Buffer) {
  "use strict";
  exports.merge = function(a, b) {
    var keys = Object.keys(b);
    for (var i = 0,
        len = keys.length; i < len; ++i) {
      var key = keys[i];
      a[key] = b[key];
    }
    return a;
  };
  exports.base64 = {
    encode: function(str) {
      return new Buffer(str).toString('base64');
    },
    decode: function(str) {
      return new Buffer(str, 'base64').toString();
    }
  };
})(require('buffer').Buffer);
