/* */ 
var utils = require('./utils'),
    dateFormatter = require('./dateformatter');
function iterateFilter(input) {
  var self = this,
      out = {};
  if (utils.isArray(input)) {
    return utils.map(input, function(value) {
      return self.apply(null, arguments);
    });
  }
  if (typeof input === 'object') {
    utils.each(input, function(value, key) {
      out[key] = self.apply(null, arguments);
    });
    return out;
  }
  return;
}
exports.addslashes = function(input) {
  var out = iterateFilter.apply(exports.addslashes, arguments);
  if (out !== undefined) {
    return out;
  }
  return input.replace(/\\/g, '\\\\').replace(/\'/g, "\\'").replace(/\"/g, '\\"');
};
exports.capitalize = function(input) {
  var out = iterateFilter.apply(exports.capitalize, arguments);
  if (out !== undefined) {
    return out;
  }
  return input.toString().charAt(0).toUpperCase() + input.toString().substr(1).toLowerCase();
};
exports.date = function(input, format, offset, abbr) {
  var l = format.length,
      date = new dateFormatter.DateZ(input),
      cur,
      i = 0,
      out = '';
  if (offset) {
    date.setTimezoneOffset(offset, abbr);
  }
  for (i; i < l; i += 1) {
    cur = format.charAt(i);
    if (cur === '\\') {
      i += 1;
      out += (i < l) ? format.charAt(i) : cur;
    } else if (dateFormatter.hasOwnProperty(cur)) {
      out += dateFormatter[cur](date, offset, abbr);
    } else {
      out += cur;
    }
  }
  return out;
};
exports["default"] = function(input, def) {
  return (typeof input !== 'undefined' && (input || typeof input === 'number')) ? input : def;
};
exports.escape = function(input, type) {
  var out = iterateFilter.apply(exports.escape, arguments),
      inp = input,
      i = 0,
      code;
  if (out !== undefined) {
    return out;
  }
  if (typeof input !== 'string') {
    return input;
  }
  out = '';
  switch (type) {
    case 'js':
      inp = inp.replace(/\\/g, '\\u005C');
      for (i; i < inp.length; i += 1) {
        code = inp.charCodeAt(i);
        if (code < 32) {
          code = code.toString(16).toUpperCase();
          code = (code.length < 2) ? '0' + code : code;
          out += '\\u00' + code;
        } else {
          out += inp[i];
        }
      }
      return out.replace(/&/g, '\\u0026').replace(/</g, '\\u003C').replace(/>/g, '\\u003E').replace(/\'/g, '\\u0027').replace(/"/g, '\\u0022').replace(/\=/g, '\\u003D').replace(/-/g, '\\u002D').replace(/;/g, '\\u003B');
    default:
      return inp.replace(/&(?!amp;|lt;|gt;|quot;|#39;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
};
exports.e = exports.escape;
exports.first = function(input) {
  if (typeof input === 'object' && !utils.isArray(input)) {
    var keys = utils.keys(input);
    return input[keys[0]];
  }
  if (typeof input === 'string') {
    return input.substr(0, 1);
  }
  return input[0];
};
exports.groupBy = function(input, key) {
  if (!utils.isArray(input)) {
    return input;
  }
  var out = {};
  utils.each(input, function(value) {
    if (!value.hasOwnProperty(key)) {
      return;
    }
    var keyname = value[key],
        newVal = utils.extend({}, value);
    delete value[key];
    if (!out[keyname]) {
      out[keyname] = [];
    }
    out[keyname].push(value);
  });
  return out;
};
exports.join = function(input, glue) {
  if (utils.isArray(input)) {
    return input.join(glue);
  }
  if (typeof input === 'object') {
    var out = [];
    utils.each(input, function(value) {
      out.push(value);
    });
    return out.join(glue);
  }
  return input;
};
exports.json = function(input, indent) {
  return JSON.stringify(input, null, indent || 0);
};
exports.json_encode = exports.json;
exports.last = function(input) {
  if (typeof input === 'object' && !utils.isArray(input)) {
    var keys = utils.keys(input);
    return input[keys[keys.length - 1]];
  }
  if (typeof input === 'string') {
    return input.charAt(input.length - 1);
  }
  return input[input.length - 1];
};
exports.lower = function(input) {
  var out = iterateFilter.apply(exports.lower, arguments);
  if (out !== undefined) {
    return out;
  }
  return input.toString().toLowerCase();
};
exports.raw = function(input) {
  return exports.safe(input);
};
exports.raw.safe = true;
exports.replace = function(input, search, replacement, flags) {
  var r = new RegExp(search, flags);
  return input.replace(r, replacement);
};
exports.reverse = function(input) {
  return exports.sort(input, true);
};
exports.safe = function(input) {
  return input;
};
exports.safe.safe = true;
exports.sort = function(input, reverse) {
  var out;
  if (utils.isArray(input)) {
    out = input.sort();
  } else {
    switch (typeof input) {
      case 'object':
        out = utils.keys(input).sort();
        break;
      case 'string':
        out = input.split('');
        if (reverse) {
          return out.reverse().join('');
        }
        return out.sort().join('');
    }
  }
  if (out && reverse) {
    return out.reverse();
  }
  return out || input;
};
exports.striptags = function(input) {
  var out = iterateFilter.apply(exports.striptags, arguments);
  if (out !== undefined) {
    return out;
  }
  return input.toString().replace(/(<([^>]+)>)/ig, '');
};
exports.title = function(input) {
  var out = iterateFilter.apply(exports.title, arguments);
  if (out !== undefined) {
    return out;
  }
  return input.toString().replace(/\w\S*/g, function(str) {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
  });
};
exports.uniq = function(input) {
  var result;
  if (!input || !utils.isArray(input)) {
    return '';
  }
  result = [];
  utils.each(input, function(v) {
    if (result.indexOf(v) === -1) {
      result.push(v);
    }
  });
  return result;
};
exports.upper = function(input) {
  var out = iterateFilter.apply(exports.upper, arguments);
  if (out !== undefined) {
    return out;
  }
  return input.toString().toUpperCase();
};
exports.url_encode = function(input) {
  var out = iterateFilter.apply(exports.url_encode, arguments);
  if (out !== undefined) {
    return out;
  }
  return encodeURIComponent(input);
};
exports.url_decode = function(input) {
  var out = iterateFilter.apply(exports.url_decode, arguments);
  if (out !== undefined) {
    return out;
  }
  return decodeURIComponent(input);
};
