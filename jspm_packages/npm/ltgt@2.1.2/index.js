/* */ 
(function(Buffer) {
  exports.compare = function(a, b) {
    if (Buffer.isBuffer(a)) {
      var l = Math.min(a.length, b.length);
      for (var i = 0; i < l; i++) {
        var cmp = a[i] - b[i];
        if (cmp)
          return cmp;
      }
      return a.length - b.length;
    }
    return a < b ? -1 : a > b ? 1 : 0;
  };
  function has(obj, key) {
    return Object.hasOwnProperty.call(obj, key);
  }
  function isDef(val) {
    return val !== undefined && val !== '';
  }
  function has(range, name) {
    return Object.hasOwnProperty.call(range, name);
  }
  function hasKey(range, name) {
    return Object.hasOwnProperty.call(range, name) && name;
  }
  var lowerBoundKey = exports.lowerBoundKey = function(range) {
    return (hasKey(range, 'gt') || hasKey(range, 'gte') || hasKey(range, 'min') || (range.reverse ? hasKey(range, 'end') : hasKey(range, 'start')) || undefined);
  };
  var lowerBound = exports.lowerBound = function(range) {
    var k = lowerBoundKey(range);
    return k && range[k];
  };
  exports.lowerBoundInclusive = function(range) {
    return has(range, 'gt') ? false : true;
  };
  exports.upperBoundInclusive = function(range) {
    return has(range, 'lt') || !range.minEx ? false : true;
  };
  var lowerBoundExclusive = exports.lowerBoundExclusive = function(range) {
    return has(range, 'gt') || range.minEx ? true : false;
  };
  var upperBoundExclusive = exports.upperBoundExclusive = function(range) {
    return has(range, 'lt') ? true : false;
  };
  var upperBoundKey = exports.upperBoundKey = function(range) {
    return (hasKey(range, 'lt') || hasKey(range, 'lte') || hasKey(range, 'max') || (range.reverse ? hasKey(range, 'start') : hasKey(range, 'end')) || undefined);
  };
  var upperBound = exports.upperBound = function(range) {
    var k = upperBoundKey(range);
    return k && range[k];
  };
  function id(e) {
    return e;
  }
  exports.toLtgt = function(range, _range, map, lower, upper) {
    _range = _range || {};
    map = map || id;
    var defaults = arguments.length > 3;
    var lb = exports.lowerBoundKey(range);
    var ub = exports.upperBoundKey(range);
    if (lb) {
      if (lb === 'gt')
        _range.gt = map(range.gt, false);
      else
        _range.gte = map(range[lb], false);
    } else if (defaults)
      _range.gte = map(lower, false);
    if (ub) {
      if (ub === 'lt')
        _range.lt = map(range.lt, true);
      else
        _range.lte = map(range[ub], true);
    } else if (defaults)
      _range.lte = map(upper, true);
    if (range.reverse != null)
      _range.reverse = !!range.reverse;
    if (has(_range, 'max'))
      delete _range.max;
    if (has(_range, 'min'))
      delete _range.min;
    if (has(_range, 'start'))
      delete _range.start;
    if (has(_range, 'end'))
      delete _range.end;
    return _range;
  };
  exports.contains = function(range, key, compare) {
    compare = compare || exports.compare;
    var lb = lowerBound(range);
    if (isDef(lb)) {
      var cmp = compare(key, lb);
      if (cmp < 0 || (cmp === 0 && lowerBoundExclusive(range)))
        return false;
    }
    var ub = upperBound(range);
    if (isDef(ub)) {
      var cmp = compare(key, ub);
      if (cmp > 0 || (cmp === 0) && upperBoundExclusive(range))
        return false;
    }
    return true;
  };
  exports.filter = function(range, compare) {
    return function(key) {
      return exports.contains(range, key, compare);
    };
  };
})(require('buffer').Buffer);
