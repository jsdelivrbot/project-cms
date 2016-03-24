/* */ 
(function(Buffer) {
  'use strict';
  function isArguments(object) {
    return Object.prototype.toString.call(object) === '[object Arguments]';
  }
  function deeper(a, b) {
    return deeper_(a, b, [], []);
  }
  module.exports = deeper;
  try {
    deeper.fastEqual = require('buffertools').equals;
  } catch (e) {}
  function deeper_(a, b, ca, cb) {
    if (a === b) {
      return true;
    } else if (typeof a !== 'object' || typeof b !== 'object') {
      return false;
    } else if (a === null || b === null) {
      return false;
    } else if (Buffer.isBuffer(a) && Buffer.isBuffer(b)) {
      if (a.equals) {
        return a.equals(b);
      } else if (deeper.fastEqual) {
        return deeper.fastEqual.call(a, b);
      } else {
        if (a.length !== b.length)
          return false;
        for (var i = 0; i < a.length; i++)
          if (a[i] !== b[i])
            return false;
        return true;
      }
    } else if (a instanceof Date && b instanceof Date) {
      return a.getTime() === b.getTime();
    } else if (a instanceof RegExp && b instanceof RegExp) {
      return a.source === b.source && a.global === b.global && a.multiline === b.multiline && a.lastIndex === b.lastIndex && a.ignoreCase === b.ignoreCase;
    } else if (isArguments(a) || isArguments(b)) {
      if (!(isArguments(a) && isArguments(b)))
        return false;
      var slice = Array.prototype.slice;
      return deeper_(slice.call(a), slice.call(b), ca, cb);
    } else {
      if (a.constructor !== b.constructor)
        return false;
      var ka = Object.keys(a);
      var kb = Object.keys(b);
      if (ka.length === 0 && kb.length === 0)
        return true;
      if (ka.length !== kb.length)
        return false;
      var cal = ca.length;
      while (cal--)
        if (ca[cal] === a)
          return cb[cal] === b;
      ca.push(a);
      cb.push(b);
      ka.sort();
      kb.sort();
      for (var j = ka.length - 1; j >= 0; j--)
        if (ka[j] !== kb[j])
          return false;
      var key;
      for (var k = ka.length - 1; k >= 0; k--) {
        key = ka[k];
        if (!deeper_(a[key], b[key], ca, cb))
          return false;
      }
      ca.pop();
      cb.pop();
      return true;
    }
  }
})(require('buffer').Buffer);
