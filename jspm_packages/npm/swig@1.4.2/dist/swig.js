/* */ 
(function(process) {
  ;
  (function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;
          if (!u && a)
            return a(o, !0);
          if (i)
            return i(o, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        var f = n[o] = {exports: {}};
        t[o][0].call(f.exports, function(e) {
          var n = t[o][1][e];
          return s(n ? n : e);
        }, f, f.exports, e, t, n, r);
      }
      return n[o].exports;
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++)
      s(r[o]);
    return s;
  })({
    1: [function(require, module, exports) {
      var swig = require('../lib/swig');
      if (typeof window.define === 'function' && typeof window.define.amd === 'object') {
        window.define('swig', [], function() {
          return swig;
        });
      } else {
        window.swig = swig;
      }
    }, {"../lib/swig": 9}],
    2: [function(require, module, exports) {
      var utils = require('./utils');
      var _months = {
        full: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        abbr: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
          _days = {
            full: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            abbr: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            alt: {
              '-1': 'Yesterday',
              0: 'Today',
              1: 'Tomorrow'
            }
          };
      exports.tzOffset = 0;
      exports.DateZ = function() {
        var members = {
          'default': ['getUTCDate', 'getUTCDay', 'getUTCFullYear', 'getUTCHours', 'getUTCMilliseconds', 'getUTCMinutes', 'getUTCMonth', 'getUTCSeconds', 'toISOString', 'toGMTString', 'toUTCString', 'valueOf', 'getTime'],
          z: ['getDate', 'getDay', 'getFullYear', 'getHours', 'getMilliseconds', 'getMinutes', 'getMonth', 'getSeconds', 'getYear', 'toDateString', 'toLocaleDateString', 'toLocaleTimeString']
        },
            d = this;
        d.date = d.dateZ = (arguments.length > 1) ? new Date(Date.UTC.apply(Date, arguments) + ((new Date()).getTimezoneOffset() * 60000)) : (arguments.length === 1) ? new Date(new Date(arguments['0'])) : new Date();
        d.timezoneOffset = d.dateZ.getTimezoneOffset();
        utils.each(members.z, function(name) {
          d[name] = function() {
            return d.dateZ[name]();
          };
        });
        utils.each(members['default'], function(name) {
          d[name] = function() {
            return d.date[name]();
          };
        });
        this.setTimezoneOffset(exports.tzOffset);
      };
      exports.DateZ.prototype = {
        getTimezoneOffset: function() {
          return this.timezoneOffset;
        },
        setTimezoneOffset: function(offset) {
          this.timezoneOffset = offset;
          this.dateZ = new Date(this.date.getTime() + this.date.getTimezoneOffset() * 60000 - this.timezoneOffset * 60000);
          return this;
        }
      };
      exports.d = function(input) {
        return (input.getDate() < 10 ? '0' : '') + input.getDate();
      };
      exports.D = function(input) {
        return _days.abbr[input.getDay()];
      };
      exports.j = function(input) {
        return input.getDate();
      };
      exports.l = function(input) {
        return _days.full[input.getDay()];
      };
      exports.N = function(input) {
        var d = input.getDay();
        return (d >= 1) ? d : 7;
      };
      exports.S = function(input) {
        var d = input.getDate();
        return (d % 10 === 1 && d !== 11 ? 'st' : (d % 10 === 2 && d !== 12 ? 'nd' : (d % 10 === 3 && d !== 13 ? 'rd' : 'th')));
      };
      exports.w = function(input) {
        return input.getDay();
      };
      exports.z = function(input, offset, abbr) {
        var year = input.getFullYear(),
            e = new exports.DateZ(year, input.getMonth(), input.getDate(), 12, 0, 0),
            d = new exports.DateZ(year, 0, 1, 12, 0, 0);
        e.setTimezoneOffset(offset, abbr);
        d.setTimezoneOffset(offset, abbr);
        return Math.round((e - d) / 86400000);
      };
      exports.W = function(input) {
        var target = new Date(input.valueOf()),
            dayNr = (input.getDay() + 6) % 7,
            fThurs;
        target.setDate(target.getDate() - dayNr + 3);
        fThurs = target.valueOf();
        target.setMonth(0, 1);
        if (target.getDay() !== 4) {
          target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
        }
        return 1 + Math.ceil((fThurs - target) / 604800000);
      };
      exports.F = function(input) {
        return _months.full[input.getMonth()];
      };
      exports.m = function(input) {
        return (input.getMonth() < 9 ? '0' : '') + (input.getMonth() + 1);
      };
      exports.M = function(input) {
        return _months.abbr[input.getMonth()];
      };
      exports.n = function(input) {
        return input.getMonth() + 1;
      };
      exports.t = function(input) {
        return 32 - (new Date(input.getFullYear(), input.getMonth(), 32).getDate());
      };
      exports.L = function(input) {
        return new Date(input.getFullYear(), 1, 29).getDate() === 29;
      };
      exports.o = function(input) {
        var target = new Date(input.valueOf());
        target.setDate(target.getDate() - ((input.getDay() + 6) % 7) + 3);
        return target.getFullYear();
      };
      exports.Y = function(input) {
        return input.getFullYear();
      };
      exports.y = function(input) {
        return (input.getFullYear().toString()).substr(2);
      };
      exports.a = function(input) {
        return input.getHours() < 12 ? 'am' : 'pm';
      };
      exports.A = function(input) {
        return input.getHours() < 12 ? 'AM' : 'PM';
      };
      exports.B = function(input) {
        var hours = input.getUTCHours(),
            beats;
        hours = (hours === 23) ? 0 : hours + 1;
        beats = Math.abs(((((hours * 60) + input.getUTCMinutes()) * 60) + input.getUTCSeconds()) / 86.4).toFixed(0);
        return ('000'.concat(beats).slice(beats.length));
      };
      exports.g = function(input) {
        var h = input.getHours();
        return h === 0 ? 12 : (h > 12 ? h - 12 : h);
      };
      exports.G = function(input) {
        return input.getHours();
      };
      exports.h = function(input) {
        var h = input.getHours();
        return ((h < 10 || (12 < h && 22 > h)) ? '0' : '') + ((h < 12) ? h : h - 12);
      };
      exports.H = function(input) {
        var h = input.getHours();
        return (h < 10 ? '0' : '') + h;
      };
      exports.i = function(input) {
        var m = input.getMinutes();
        return (m < 10 ? '0' : '') + m;
      };
      exports.s = function(input) {
        var s = input.getSeconds();
        return (s < 10 ? '0' : '') + s;
      };
      exports.O = function(input) {
        var tz = input.getTimezoneOffset();
        return (tz < 0 ? '-' : '+') + (tz / 60 < 10 ? '0' : '') + Math.abs((tz / 60)) + '00';
      };
      exports.Z = function(input) {
        return input.getTimezoneOffset() * 60;
      };
      exports.c = function(input) {
        return input.toISOString();
      };
      exports.r = function(input) {
        return input.toUTCString();
      };
      exports.U = function(input) {
        return input.getTime() / 1000;
      };
    }, {"./utils": 26}],
    3: [function(require, module, exports) {
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
    }, {
      "./dateformatter": 2,
      "./utils": 26
    }],
    4: [function(require, module, exports) {
      var utils = require('./utils');
      var TYPES = {
        WHITESPACE: 0,
        STRING: 1,
        FILTER: 2,
        FILTEREMPTY: 3,
        FUNCTION: 4,
        FUNCTIONEMPTY: 5,
        PARENOPEN: 6,
        PARENCLOSE: 7,
        COMMA: 8,
        VAR: 9,
        NUMBER: 10,
        OPERATOR: 11,
        BRACKETOPEN: 12,
        BRACKETCLOSE: 13,
        DOTKEY: 14,
        ARRAYOPEN: 15,
        CURLYOPEN: 17,
        CURLYCLOSE: 18,
        COLON: 19,
        COMPARATOR: 20,
        LOGIC: 21,
        NOT: 22,
        BOOL: 23,
        ASSIGNMENT: 24,
        METHODOPEN: 25,
        UNKNOWN: 100
      },
          rules = [{
            type: TYPES.WHITESPACE,
            regex: [/^\s+/]
          }, {
            type: TYPES.STRING,
            regex: [/^""/, /^".*?[^\\]"/, /^''/, /^'.*?[^\\]'/]
          }, {
            type: TYPES.FILTER,
            regex: [/^\|\s*(\w+)\(/],
            idx: 1
          }, {
            type: TYPES.FILTEREMPTY,
            regex: [/^\|\s*(\w+)/],
            idx: 1
          }, {
            type: TYPES.FUNCTIONEMPTY,
            regex: [/^\s*(\w+)\(\)/],
            idx: 1
          }, {
            type: TYPES.FUNCTION,
            regex: [/^\s*(\w+)\(/],
            idx: 1
          }, {
            type: TYPES.PARENOPEN,
            regex: [/^\(/]
          }, {
            type: TYPES.PARENCLOSE,
            regex: [/^\)/]
          }, {
            type: TYPES.COMMA,
            regex: [/^,/]
          }, {
            type: TYPES.LOGIC,
            regex: [/^(&&|\|\|)\s*/, /^(and|or)\s+/],
            idx: 1,
            replace: {
              'and': '&&',
              'or': '||'
            }
          }, {
            type: TYPES.COMPARATOR,
            regex: [/^(===|==|\!==|\!=|<=|<|>=|>|in\s|gte\s|gt\s|lte\s|lt\s)\s*/],
            idx: 1,
            replace: {
              'gte': '>=',
              'gt': '>',
              'lte': '<=',
              'lt': '<'
            }
          }, {
            type: TYPES.ASSIGNMENT,
            regex: [/^(=|\+=|-=|\*=|\/=)/]
          }, {
            type: TYPES.NOT,
            regex: [/^\!\s*/, /^not\s+/],
            replace: {'not': '!'}
          }, {
            type: TYPES.BOOL,
            regex: [/^(true|false)\s+/, /^(true|false)$/],
            idx: 1
          }, {
            type: TYPES.VAR,
            regex: [/^[a-zA-Z_$]\w*((\.\$?\w*)+)?/, /^[a-zA-Z_$]\w*/]
          }, {
            type: TYPES.BRACKETOPEN,
            regex: [/^\[/]
          }, {
            type: TYPES.BRACKETCLOSE,
            regex: [/^\]/]
          }, {
            type: TYPES.CURLYOPEN,
            regex: [/^\{/]
          }, {
            type: TYPES.COLON,
            regex: [/^\:/]
          }, {
            type: TYPES.CURLYCLOSE,
            regex: [/^\}/]
          }, {
            type: TYPES.DOTKEY,
            regex: [/^\.(\w+)/],
            idx: 1
          }, {
            type: TYPES.NUMBER,
            regex: [/^[+\-]?\d+(\.\d+)?/]
          }, {
            type: TYPES.OPERATOR,
            regex: [/^(\+|\-|\/|\*|%)/]
          }];
      exports.types = TYPES;
      function reader(str) {
        var matched;
        utils.some(rules, function(rule) {
          return utils.some(rule.regex, function(regex) {
            var match = str.match(regex),
                normalized;
            if (!match) {
              return;
            }
            normalized = match[rule.idx || 0].replace(/\s*$/, '');
            normalized = (rule.hasOwnProperty('replace') && rule.replace.hasOwnProperty(normalized)) ? rule.replace[normalized] : normalized;
            matched = {
              match: normalized,
              type: rule.type,
              length: match[0].length
            };
            return true;
          });
        });
        if (!matched) {
          matched = {
            match: str,
            type: TYPES.UNKNOWN,
            length: str.length
          };
        }
        return matched;
      }
      exports.read = function(str) {
        var offset = 0,
            tokens = [],
            substr,
            match;
        while (offset < str.length) {
          substr = str.substring(offset);
          match = reader(substr);
          offset += match.length;
          tokens.push(match);
        }
        return tokens;
      };
    }, {"./utils": 26}],
    5: [function(require, module, exports) {
      var process = require('__browserify_process');
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
    }, {
      "__browserify_process": 31,
      "fs": 28,
      "path": 29
    }],
    6: [function(require, module, exports) {
      exports.fs = require('./filesystem');
      exports.memory = require('./memory');
    }, {
      "./filesystem": 5,
      "./memory": 7
    }],
    7: [function(require, module, exports) {
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
    }, {
      "../utils": 26,
      "path": 29
    }],
    8: [function(require, module, exports) {
      var utils = require('./utils'),
          lexer = require('./lexer');
      var _t = lexer.types,
          _reserved = ['break', 'case', 'catch', 'continue', 'debugger', 'default', 'delete', 'do', 'else', 'finally', 'for', 'function', 'if', 'in', 'instanceof', 'new', 'return', 'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with'];
      function escapeRegExp(str) {
        return str.replace(/[\-\/\\\^$*+?.()|\[\]{}]/g, '\\$&');
      }
      function TokenParser(tokens, filters, autoescape, line, filename) {
        this.out = [];
        this.state = [];
        this.filterApplyIdx = [];
        this._parsers = {};
        this.line = line;
        this.filename = filename;
        this.filters = filters;
        this.escape = autoescape;
        this.parse = function() {
          var self = this;
          if (self._parsers.start) {
            self._parsers.start.call(self);
          }
          utils.each(tokens, function(token, i) {
            var prevToken = tokens[i - 1];
            self.isLast = (i === tokens.length - 1);
            if (prevToken) {
              while (prevToken.type === _t.WHITESPACE) {
                i -= 1;
                prevToken = tokens[i - 1];
              }
            }
            self.prevToken = prevToken;
            self.parseToken(token);
          });
          if (self._parsers.end) {
            self._parsers.end.call(self);
          }
          if (self.escape) {
            self.filterApplyIdx = [0];
            if (typeof self.escape === 'string') {
              self.parseToken({
                type: _t.FILTER,
                match: 'e'
              });
              self.parseToken({
                type: _t.COMMA,
                match: ','
              });
              self.parseToken({
                type: _t.STRING,
                match: String(autoescape)
              });
              self.parseToken({
                type: _t.PARENCLOSE,
                match: ')'
              });
            } else {
              self.parseToken({
                type: _t.FILTEREMPTY,
                match: 'e'
              });
            }
          }
          return self.out;
        };
      }
      TokenParser.prototype = {
        on: function(type, fn) {
          this._parsers[type] = fn;
        },
        parseToken: function(token) {
          var self = this,
              fn = self._parsers[token.type] || self._parsers['*'],
              match = token.match,
              prevToken = self.prevToken,
              prevTokenType = prevToken ? prevToken.type : null,
              lastState = (self.state.length) ? self.state[self.state.length - 1] : null,
              temp;
          if (fn && typeof fn === 'function') {
            if (!fn.call(this, token)) {
              return;
            }
          }
          if (lastState && prevToken && lastState === _t.FILTER && prevTokenType === _t.FILTER && token.type !== _t.PARENCLOSE && token.type !== _t.COMMA && token.type !== _t.OPERATOR && token.type !== _t.FILTER && token.type !== _t.FILTEREMPTY) {
            self.out.push(', ');
          }
          if (lastState && lastState === _t.METHODOPEN) {
            self.state.pop();
            if (token.type !== _t.PARENCLOSE) {
              self.out.push(', ');
            }
          }
          switch (token.type) {
            case _t.WHITESPACE:
              break;
            case _t.STRING:
              self.filterApplyIdx.push(self.out.length);
              self.out.push(match.replace(/\\/g, '\\\\'));
              break;
            case _t.NUMBER:
            case _t.BOOL:
              self.filterApplyIdx.push(self.out.length);
              self.out.push(match);
              break;
            case _t.FILTER:
              if (!self.filters.hasOwnProperty(match) || typeof self.filters[match] !== "function") {
                utils.throwError('Invalid filter "' + match + '"', self.line, self.filename);
              }
              self.escape = self.filters[match].safe ? false : self.escape;
              self.out.splice(self.filterApplyIdx[self.filterApplyIdx.length - 1], 0, '_filters["' + match + '"](');
              self.state.push(token.type);
              break;
            case _t.FILTEREMPTY:
              if (!self.filters.hasOwnProperty(match) || typeof self.filters[match] !== "function") {
                utils.throwError('Invalid filter "' + match + '"', self.line, self.filename);
              }
              self.escape = self.filters[match].safe ? false : self.escape;
              self.out.splice(self.filterApplyIdx[self.filterApplyIdx.length - 1], 0, '_filters["' + match + '"](');
              self.out.push(')');
              break;
            case _t.FUNCTION:
            case _t.FUNCTIONEMPTY:
              self.out.push('((typeof _ctx.' + match + ' !== "undefined") ? _ctx.' + match + ' : ((typeof ' + match + ' !== "undefined") ? ' + match + ' : _fn))(');
              self.escape = false;
              if (token.type === _t.FUNCTIONEMPTY) {
                self.out[self.out.length - 1] = self.out[self.out.length - 1] + ')';
              } else {
                self.state.push(token.type);
              }
              self.filterApplyIdx.push(self.out.length - 1);
              break;
            case _t.PARENOPEN:
              self.state.push(token.type);
              if (self.filterApplyIdx.length) {
                self.out.splice(self.filterApplyIdx[self.filterApplyIdx.length - 1], 0, '(');
                if (prevToken && prevTokenType === _t.VAR) {
                  temp = prevToken.match.split('.').slice(0, -1);
                  self.out.push(' || _fn).call(' + self.checkMatch(temp));
                  self.state.push(_t.METHODOPEN);
                  self.escape = false;
                } else {
                  self.out.push(' || _fn)(');
                }
                self.filterApplyIdx.push(self.out.length - 3);
              } else {
                self.out.push('(');
                self.filterApplyIdx.push(self.out.length - 1);
              }
              break;
            case _t.PARENCLOSE:
              temp = self.state.pop();
              if (temp !== _t.PARENOPEN && temp !== _t.FUNCTION && temp !== _t.FILTER) {
                utils.throwError('Mismatched nesting state', self.line, self.filename);
              }
              self.out.push(')');
              self.filterApplyIdx.pop();
              if (temp !== _t.FILTER) {
                self.filterApplyIdx.pop();
              }
              break;
            case _t.COMMA:
              if (lastState !== _t.FUNCTION && lastState !== _t.FILTER && lastState !== _t.ARRAYOPEN && lastState !== _t.CURLYOPEN && lastState !== _t.PARENOPEN && lastState !== _t.COLON) {
                utils.throwError('Unexpected comma', self.line, self.filename);
              }
              if (lastState === _t.COLON) {
                self.state.pop();
              }
              self.out.push(', ');
              self.filterApplyIdx.pop();
              break;
            case _t.LOGIC:
            case _t.COMPARATOR:
              if (!prevToken || prevTokenType === _t.COMMA || prevTokenType === token.type || prevTokenType === _t.BRACKETOPEN || prevTokenType === _t.CURLYOPEN || prevTokenType === _t.PARENOPEN || prevTokenType === _t.FUNCTION) {
                utils.throwError('Unexpected logic', self.line, self.filename);
              }
              self.out.push(token.match);
              break;
            case _t.NOT:
              self.out.push(token.match);
              break;
            case _t.VAR:
              self.parseVar(token, match, lastState);
              break;
            case _t.BRACKETOPEN:
              if (!prevToken || (prevTokenType !== _t.VAR && prevTokenType !== _t.BRACKETCLOSE && prevTokenType !== _t.PARENCLOSE)) {
                self.state.push(_t.ARRAYOPEN);
                self.filterApplyIdx.push(self.out.length);
              } else {
                self.state.push(token.type);
              }
              self.out.push('[');
              break;
            case _t.BRACKETCLOSE:
              temp = self.state.pop();
              if (temp !== _t.BRACKETOPEN && temp !== _t.ARRAYOPEN) {
                utils.throwError('Unexpected closing square bracket', self.line, self.filename);
              }
              self.out.push(']');
              self.filterApplyIdx.pop();
              break;
            case _t.CURLYOPEN:
              self.state.push(token.type);
              self.out.push('{');
              self.filterApplyIdx.push(self.out.length - 1);
              break;
            case _t.COLON:
              if (lastState !== _t.CURLYOPEN) {
                utils.throwError('Unexpected colon', self.line, self.filename);
              }
              self.state.push(token.type);
              self.out.push(':');
              self.filterApplyIdx.pop();
              break;
            case _t.CURLYCLOSE:
              if (lastState === _t.COLON) {
                self.state.pop();
              }
              if (self.state.pop() !== _t.CURLYOPEN) {
                utils.throwError('Unexpected closing curly brace', self.line, self.filename);
              }
              self.out.push('}');
              self.filterApplyIdx.pop();
              break;
            case _t.DOTKEY:
              if (!prevToken || (prevTokenType !== _t.VAR && prevTokenType !== _t.BRACKETCLOSE && prevTokenType !== _t.DOTKEY && prevTokenType !== _t.PARENCLOSE && prevTokenType !== _t.FUNCTIONEMPTY && prevTokenType !== _t.FILTEREMPTY && prevTokenType !== _t.CURLYCLOSE)) {
                utils.throwError('Unexpected key "' + match + '"', self.line, self.filename);
              }
              self.out.push('.' + match);
              break;
            case _t.OPERATOR:
              self.out.push(' ' + match + ' ');
              self.filterApplyIdx.pop();
              break;
          }
        },
        parseVar: function(token, match, lastState) {
          var self = this;
          match = match.split('.');
          if (_reserved.indexOf(match[0]) !== -1) {
            utils.throwError('Reserved keyword "' + match[0] + '" attempted to be used as a variable', self.line, self.filename);
          }
          self.filterApplyIdx.push(self.out.length);
          if (lastState === _t.CURLYOPEN) {
            if (match.length > 1) {
              utils.throwError('Unexpected dot', self.line, self.filename);
            }
            self.out.push(match[0]);
            return;
          }
          self.out.push(self.checkMatch(match));
        },
        checkMatch: function(match) {
          var temp = match[0],
              result;
          function checkDot(ctx) {
            var c = ctx + temp,
                m = match,
                build = '';
            build = '(typeof ' + c + ' !== "undefined" && ' + c + ' !== null';
            utils.each(m, function(v, i) {
              if (i === 0) {
                return;
              }
              build += ' && ' + c + '.' + v + ' !== undefined && ' + c + '.' + v + ' !== null';
              c += '.' + v;
            });
            build += ')';
            return build;
          }
          function buildDot(ctx) {
            return '(' + checkDot(ctx) + ' ? ' + ctx + match.join('.') + ' : "")';
          }
          result = '(' + checkDot('_ctx.') + ' ? ' + buildDot('_ctx.') + ' : ' + buildDot('') + ')';
          return '(' + result + ' !== null ? ' + result + ' : ' + '"" )';
        }
      };
      exports.parse = function(swig, source, opts, tags, filters) {
        source = source.replace(/\r\n/g, '\n');
        var escape = opts.autoescape,
            tagOpen = opts.tagControls[0],
            tagClose = opts.tagControls[1],
            varOpen = opts.varControls[0],
            varClose = opts.varControls[1],
            escapedTagOpen = escapeRegExp(tagOpen),
            escapedTagClose = escapeRegExp(tagClose),
            escapedVarOpen = escapeRegExp(varOpen),
            escapedVarClose = escapeRegExp(varClose),
            tagStrip = new RegExp('^' + escapedTagOpen + '-?\\s*-?|-?\\s*-?' + escapedTagClose + '$', 'g'),
            tagStripBefore = new RegExp('^' + escapedTagOpen + '-'),
            tagStripAfter = new RegExp('-' + escapedTagClose + '$'),
            varStrip = new RegExp('^' + escapedVarOpen + '-?\\s*-?|-?\\s*-?' + escapedVarClose + '$', 'g'),
            varStripBefore = new RegExp('^' + escapedVarOpen + '-'),
            varStripAfter = new RegExp('-' + escapedVarClose + '$'),
            cmtOpen = opts.cmtControls[0],
            cmtClose = opts.cmtControls[1],
            anyChar = '[\\s\\S]*?',
            splitter = new RegExp('(' + escapedTagOpen + anyChar + escapedTagClose + '|' + escapedVarOpen + anyChar + escapedVarClose + '|' + escapeRegExp(cmtOpen) + anyChar + escapeRegExp(cmtClose) + ')'),
            line = 1,
            stack = [],
            parent = null,
            tokens = [],
            blocks = {},
            inRaw = false,
            stripNext;
        function parseVariable(str, line) {
          var tokens = lexer.read(utils.strip(str)),
              parser,
              out;
          parser = new TokenParser(tokens, filters, escape, line, opts.filename);
          out = parser.parse().join('');
          if (parser.state.length) {
            utils.throwError('Unable to parse "' + str + '"', line, opts.filename);
          }
          return {compile: function() {
              return '_output += ' + out + ';\n';
            }};
        }
        exports.parseVariable = parseVariable;
        function parseTag(str, line) {
          var tokens,
              parser,
              chunks,
              tagName,
              tag,
              args,
              last;
          if (utils.startsWith(str, 'end')) {
            last = stack[stack.length - 1];
            if (last && last.name === str.split(/\s+/)[0].replace(/^end/, '') && last.ends) {
              switch (last.name) {
                case 'autoescape':
                  escape = opts.autoescape;
                  break;
                case 'raw':
                  inRaw = false;
                  break;
              }
              stack.pop();
              return;
            }
            if (!inRaw) {
              utils.throwError('Unexpected end of tag "' + str.replace(/^end/, '') + '"', line, opts.filename);
            }
          }
          if (inRaw) {
            return;
          }
          chunks = str.split(/\s+(.+)?/);
          tagName = chunks.shift();
          if (!tags.hasOwnProperty(tagName)) {
            utils.throwError('Unexpected tag "' + str + '"', line, opts.filename);
          }
          tokens = lexer.read(utils.strip(chunks.join(' ')));
          parser = new TokenParser(tokens, filters, false, line, opts.filename);
          tag = tags[tagName];
          if (!tag.parse(chunks[1], line, parser, _t, stack, opts, swig)) {
            utils.throwError('Unexpected tag "' + tagName + '"', line, opts.filename);
          }
          parser.parse();
          args = parser.out;
          switch (tagName) {
            case 'autoescape':
              escape = (args[0] !== 'false') ? args[0] : false;
              break;
            case 'raw':
              inRaw = true;
              break;
          }
          return {
            block: !!tags[tagName].block,
            compile: tag.compile,
            args: args,
            content: [],
            ends: tag.ends,
            name: tagName
          };
        }
        function stripPrevToken(token) {
          if (typeof token === 'string') {
            token = token.replace(/\s*$/, '');
          }
          return token;
        }
        utils.each(source.split(splitter), function(chunk) {
          var token,
              lines,
              stripPrev,
              prevToken,
              prevChildToken;
          if (!chunk) {
            return;
          }
          if (!inRaw && utils.startsWith(chunk, varOpen) && utils.endsWith(chunk, varClose)) {
            stripPrev = varStripBefore.test(chunk);
            stripNext = varStripAfter.test(chunk);
            token = parseVariable(chunk.replace(varStrip, ''), line);
          } else if (utils.startsWith(chunk, tagOpen) && utils.endsWith(chunk, tagClose)) {
            stripPrev = tagStripBefore.test(chunk);
            stripNext = tagStripAfter.test(chunk);
            token = parseTag(chunk.replace(tagStrip, ''), line);
            if (token) {
              if (token.name === 'extends') {
                parent = token.args.join('').replace(/^\'|\'$/g, '').replace(/^\"|\"$/g, '');
              } else if (token.block && !stack.length) {
                blocks[token.args.join('')] = token;
              }
            }
            if (inRaw && !token) {
              token = chunk;
            }
          } else if (inRaw || (!utils.startsWith(chunk, cmtOpen) && !utils.endsWith(chunk, cmtClose))) {
            token = (stripNext) ? chunk.replace(/^\s*/, '') : chunk;
            stripNext = false;
          } else if (utils.startsWith(chunk, cmtOpen) && utils.endsWith(chunk, cmtClose)) {
            return;
          }
          if (stripPrev && tokens.length) {
            prevToken = tokens.pop();
            if (typeof prevToken === 'string') {
              prevToken = stripPrevToken(prevToken);
            } else if (prevToken.content && prevToken.content.length) {
              prevChildToken = stripPrevToken(prevToken.content.pop());
              prevToken.content.push(prevChildToken);
            }
            tokens.push(prevToken);
          }
          if (!token) {
            return;
          }
          if (stack.length) {
            stack[stack.length - 1].content.push(token);
          } else {
            tokens.push(token);
          }
          if (token.name && token.ends) {
            stack.push(token);
          }
          lines = chunk.match(/\n/g);
          line += (lines) ? lines.length : 0;
        });
        return {
          name: opts.filename,
          parent: parent,
          tokens: tokens,
          blocks: blocks
        };
      };
      exports.compile = function(template, parents, options, blockName) {
        var out = '',
            tokens = utils.isArray(template) ? template : template.tokens;
        utils.each(tokens, function(token) {
          var o;
          if (typeof token === 'string') {
            out += '_output += "' + token.replace(/\\/g, '\\\\').replace(/\n|\r/g, '\\n').replace(/"/g, '\\"') + '";\n';
            return;
          }
          o = token.compile(exports.compile, token.args ? token.args.slice(0) : [], token.content ? token.content.slice(0) : [], parents, options, blockName);
          out += o || '';
        });
        return out;
      };
    }, {
      "./lexer": 4,
      "./utils": 26
    }],
    9: [function(require, module, exports) {
      var utils = require('./utils'),
          _tags = require('./tags'),
          _filters = require('./filters'),
          parser = require('./parser'),
          dateformatter = require('./dateformatter'),
          loaders = require('./loaders');
      exports.version = "1.4.2";
      var defaultOptions = {
        autoescape: true,
        varControls: ['{{', '}}'],
        tagControls: ['{%', '%}'],
        cmtControls: ['{#', '#}'],
        locals: {},
        cache: 'memory',
        loader: loaders.fs()
      },
          defaultInstance;
      function efn() {
        return '';
      }
      function validateOptions(options) {
        if (!options) {
          return;
        }
        utils.each(['varControls', 'tagControls', 'cmtControls'], function(key) {
          if (!options.hasOwnProperty(key)) {
            return;
          }
          if (!utils.isArray(options[key]) || options[key].length !== 2) {
            throw new Error('Option "' + key + '" must be an array containing 2 different control strings.');
          }
          if (options[key][0] === options[key][1]) {
            throw new Error('Option "' + key + '" open and close controls must not be the same.');
          }
          utils.each(options[key], function(a, i) {
            if (a.length < 2) {
              throw new Error('Option "' + key + '" ' + ((i) ? 'open ' : 'close ') + 'control must be at least 2 characters. Saw "' + a + '" instead.');
            }
          });
        });
        if (options.hasOwnProperty('cache')) {
          if (options.cache && options.cache !== 'memory') {
            if (!options.cache.get || !options.cache.set) {
              throw new Error('Invalid cache option ' + JSON.stringify(options.cache) + ' found. Expected "memory" or { get: function (key) { ... }, set: function (key, value) { ... } }.');
            }
          }
        }
        if (options.hasOwnProperty('loader')) {
          if (options.loader) {
            if (!options.loader.load || !options.loader.resolve) {
              throw new Error('Invalid loader option ' + JSON.stringify(options.loader) + ' found. Expected { load: function (pathname, cb) { ... }, resolve: function (to, from) { ... } }.');
            }
          }
        }
      }
      exports.setDefaults = function(options) {
        validateOptions(options);
        defaultInstance.options = utils.extend(defaultInstance.options, options);
      };
      exports.setDefaultTZOffset = function(offset) {
        dateformatter.tzOffset = offset;
      };
      exports.Swig = function(opts) {
        validateOptions(opts);
        this.options = utils.extend({}, defaultOptions, opts || {});
        this.cache = {};
        this.extensions = {};
        var self = this,
            tags = _tags,
            filters = _filters;
        function getLocals(options) {
          if (!options || !options.locals) {
            return self.options.locals;
          }
          return utils.extend({}, self.options.locals, options.locals);
        }
        function shouldCache(options) {
          options = options || {};
          return (options.hasOwnProperty('cache') && !options.cache) || !self.options.cache;
        }
        function cacheGet(key, options) {
          if (shouldCache(options)) {
            return;
          }
          if (self.options.cache === 'memory') {
            return self.cache[key];
          }
          return self.options.cache.get(key);
        }
        function cacheSet(key, options, val) {
          if (shouldCache(options)) {
            return;
          }
          if (self.options.cache === 'memory') {
            self.cache[key] = val;
            return;
          }
          self.options.cache.set(key, val);
        }
        this.invalidateCache = function() {
          if (self.options.cache === 'memory') {
            self.cache = {};
          }
        };
        this.setFilter = function(name, method) {
          if (typeof method !== "function") {
            throw new Error('Filter "' + name + '" is not a valid function.');
          }
          filters[name] = method;
        };
        this.setTag = function(name, parse, compile, ends, blockLevel) {
          if (typeof parse !== 'function') {
            throw new Error('Tag "' + name + '" parse method is not a valid function.');
          }
          if (typeof compile !== 'function') {
            throw new Error('Tag "' + name + '" compile method is not a valid function.');
          }
          tags[name] = {
            parse: parse,
            compile: compile,
            ends: ends || false,
            block: !!blockLevel
          };
        };
        this.setExtension = function(name, object) {
          self.extensions[name] = object;
        };
        this.parse = function(source, options) {
          validateOptions(options);
          var locals = getLocals(options),
              opts = {},
              k;
          for (k in options) {
            if (options.hasOwnProperty(k) && k !== 'locals') {
              opts[k] = options[k];
            }
          }
          options = utils.extend({}, self.options, opts);
          options.locals = locals;
          return parser.parse(this, source, options, tags, filters);
        };
        this.parseFile = function(pathname, options) {
          var src;
          if (!options) {
            options = {};
          }
          pathname = self.options.loader.resolve(pathname, options.resolveFrom);
          src = self.options.loader.load(pathname);
          if (!options.filename) {
            options = utils.extend({filename: pathname}, options);
          }
          return self.parse(src, options);
        };
        function remapBlocks(blocks, tokens) {
          return utils.map(tokens, function(token) {
            var args = token.args ? token.args.join('') : '';
            if (token.name === 'block' && blocks[args]) {
              token = blocks[args];
            }
            if (token.content && token.content.length) {
              token.content = remapBlocks(blocks, token.content);
            }
            return token;
          });
        }
        function importNonBlocks(blocks, tokens) {
          var temp = [];
          utils.each(blocks, function(block) {
            temp.push(block);
          });
          utils.each(temp.reverse(), function(block) {
            if (block.name !== 'block') {
              tokens.unshift(block);
            }
          });
        }
        function getParents(tokens, options) {
          var parentName = tokens.parent,
              parentFiles = [],
              parents = [],
              parentFile,
              parent,
              l;
          while (parentName) {
            if (!options || !options.filename) {
              throw new Error('Cannot extend "' + parentName + '" because current template has no filename.');
            }
            parentFile = parentFile || options.filename;
            parentFile = self.options.loader.resolve(parentName, parentFile);
            parent = cacheGet(parentFile, options) || self.parseFile(parentFile, utils.extend({}, options, {filename: parentFile}));
            parentName = parent.parent;
            if (parentFiles.indexOf(parentFile) !== -1) {
              throw new Error('Illegal circular extends of "' + parentFile + '".');
            }
            parentFiles.push(parentFile);
            parents.push(parent);
          }
          l = parents.length;
          for (l = parents.length - 2; l >= 0; l -= 1) {
            parents[l].tokens = remapBlocks(parents[l].blocks, parents[l + 1].tokens);
            importNonBlocks(parents[l].blocks, parents[l].tokens);
          }
          return parents;
        }
        this.precompile = function(source, options) {
          var tokens = self.parse(source, options),
              parents = getParents(tokens, options),
              tpl,
              err;
          if (parents.length) {
            tokens.tokens = remapBlocks(tokens.blocks, parents[0].tokens);
            importNonBlocks(tokens.blocks, tokens.tokens);
          }
          try {
            tpl = new Function('_swig', '_ctx', '_filters', '_utils', '_fn', '  var _ext = _swig.extensions,\n' + '    _output = "";\n' + parser.compile(tokens, parents, options) + '\n' + '  return _output;\n');
          } catch (e) {
            utils.throwError(e, null, options.filename);
          }
          return {
            tpl: tpl,
            tokens: tokens
          };
        };
        this.render = function(source, options) {
          return self.compile(source, options)();
        };
        this.renderFile = function(pathName, locals, cb) {
          if (cb) {
            self.compileFile(pathName, {}, function(err, fn) {
              var result;
              if (err) {
                cb(err);
                return;
              }
              try {
                result = fn(locals);
              } catch (err2) {
                cb(err2);
                return;
              }
              cb(null, result);
            });
            return;
          }
          return self.compileFile(pathName)(locals);
        };
        this.compile = function(source, options) {
          var key = options ? options.filename : null,
              cached = key ? cacheGet(key, options) : null,
              context,
              contextLength,
              pre;
          if (cached) {
            return cached;
          }
          context = getLocals(options);
          contextLength = utils.keys(context).length;
          pre = this.precompile(source, options);
          function compiled(locals) {
            var lcls;
            if (locals && contextLength) {
              lcls = utils.extend({}, context, locals);
            } else if (locals && !contextLength) {
              lcls = locals;
            } else if (!locals && contextLength) {
              lcls = context;
            } else {
              lcls = {};
            }
            return pre.tpl(self, lcls, filters, utils, efn);
          }
          utils.extend(compiled, pre.tokens);
          if (key) {
            cacheSet(key, options, compiled);
          }
          return compiled;
        };
        this.compileFile = function(pathname, options, cb) {
          var src,
              cached;
          if (!options) {
            options = {};
          }
          pathname = self.options.loader.resolve(pathname, options.resolveFrom);
          if (!options.filename) {
            options = utils.extend({filename: pathname}, options);
          }
          cached = cacheGet(pathname, options);
          if (cached) {
            if (cb) {
              cb(null, cached);
              return;
            }
            return cached;
          }
          if (cb) {
            self.options.loader.load(pathname, function(err, src) {
              if (err) {
                cb(err);
                return;
              }
              var compiled;
              try {
                compiled = self.compile(src, options);
              } catch (err2) {
                cb(err2);
                return;
              }
              cb(err, compiled);
            });
            return;
          }
          src = self.options.loader.load(pathname);
          return self.compile(src, options);
        };
        this.run = function(tpl, locals, filepath) {
          var context = getLocals({locals: locals});
          if (filepath) {
            cacheSet(filepath, {}, tpl);
          }
          return tpl(self, context, filters, utils, efn);
        };
      };
      defaultInstance = new exports.Swig();
      exports.setFilter = defaultInstance.setFilter;
      exports.setTag = defaultInstance.setTag;
      exports.setExtension = defaultInstance.setExtension;
      exports.parseFile = defaultInstance.parseFile;
      exports.precompile = defaultInstance.precompile;
      exports.compile = defaultInstance.compile;
      exports.compileFile = defaultInstance.compileFile;
      exports.render = defaultInstance.render;
      exports.renderFile = defaultInstance.renderFile;
      exports.run = defaultInstance.run;
      exports.invalidateCache = defaultInstance.invalidateCache;
      exports.loaders = loaders;
    }, {
      "./dateformatter": 2,
      "./filters": 3,
      "./loaders": 6,
      "./parser": 8,
      "./tags": 20,
      "./utils": 26
    }],
    10: [function(require, module, exports) {
      var utils = require('../utils'),
          strings = ['html', 'js'];
      exports.compile = function(compiler, args, content, parents, options, blockName) {
        return compiler(content, parents, options, blockName);
      };
      exports.parse = function(str, line, parser, types, stack, opts) {
        var matched;
        parser.on('*', function(token) {
          if (!matched && (token.type === types.BOOL || (token.type === types.STRING && strings.indexOf(token.match) === -1))) {
            this.out.push(token.match);
            matched = true;
            return;
          }
          utils.throwError('Unexpected token "' + token.match + '" in autoescape tag', line, opts.filename);
        });
        return true;
      };
      exports.ends = true;
    }, {"../utils": 26}],
    11: [function(require, module, exports) {
      exports.compile = function(compiler, args, content, parents, options) {
        return compiler(content, parents, options, args.join(''));
      };
      exports.parse = function(str, line, parser) {
        parser.on('*', function(token) {
          this.out.push(token.match);
        });
        return true;
      };
      exports.ends = true;
      exports.block = true;
    }, {}],
    12: [function(require, module, exports) {
      exports.compile = function() {
        return '} else {\n';
      };
      exports.parse = function(str, line, parser, types, stack) {
        parser.on('*', function(token) {
          throw new Error('"else" tag does not accept any tokens. Found "' + token.match + '" on line ' + line + '.');
        });
        return (stack.length && stack[stack.length - 1].name === 'if');
      };
    }, {}],
    13: [function(require, module, exports) {
      var ifparser = require('./if').parse;
      exports.compile = function(compiler, args) {
        return '} else if (' + args.join(' ') + ') {\n';
      };
      exports.parse = function(str, line, parser, types, stack) {
        var okay = ifparser(str, line, parser, types, stack);
        return okay && (stack.length && stack[stack.length - 1].name === 'if');
      };
    }, {"./if": 17}],
    14: [function(require, module, exports) {
      exports.compile = function() {};
      exports.parse = function() {
        return true;
      };
      exports.ends = false;
    }, {}],
    15: [function(require, module, exports) {
      var filters = require('../filters');
      exports.compile = function(compiler, args, content, parents, options, blockName) {
        var filter = args.shift().replace(/\($/, ''),
            val = '(function () {\n' + '  var _output = "";\n' + compiler(content, parents, options, blockName) + '  return _output;\n' + '})()';
        if (args[args.length - 1] === ')') {
          args.pop();
        }
        args = (args.length) ? ', ' + args.join('') : '';
        return '_output += _filters["' + filter + '"](' + val + args + ');\n';
      };
      exports.parse = function(str, line, parser, types) {
        var filter;
        function check(filter) {
          if (!filters.hasOwnProperty(filter)) {
            throw new Error('Filter "' + filter + '" does not exist on line ' + line + '.');
          }
        }
        parser.on(types.FUNCTION, function(token) {
          if (!filter) {
            filter = token.match.replace(/\($/, '');
            check(filter);
            this.out.push(token.match);
            this.state.push(token.type);
            return;
          }
          return true;
        });
        parser.on(types.VAR, function(token) {
          if (!filter) {
            filter = token.match;
            check(filter);
            this.out.push(filter);
            return;
          }
          return true;
        });
        return true;
      };
      exports.ends = true;
    }, {"../filters": 3}],
    16: [function(require, module, exports) {
      var ctx = '_ctx.',
          ctxloop = ctx + 'loop';
      exports.compile = function(compiler, args, content, parents, options, blockName) {
        var val = args.shift(),
            key = '__k',
            ctxloopcache = (ctx + '__loopcache' + Math.random()).replace(/\./g, ''),
            last;
        if (args[0] && args[0] === ',') {
          args.shift();
          key = val;
          val = args.shift();
        }
        last = args.join('');
        return ['(function () {\n', '  var __l = ' + last + ', __len = (_utils.isArray(__l) || typeof __l === "string") ? __l.length : _utils.keys(__l).length;\n', '  if (!__l) { return; }\n', '    var ' + ctxloopcache + ' = { loop: ' + ctxloop + ', ' + val + ': ' + ctx + val + ', ' + key + ': ' + ctx + key + ' };\n', '    ' + ctxloop + ' = { first: false, index: 1, index0: 0, revindex: __len, revindex0: __len - 1, length: __len, last: false };\n', '  _utils.each(__l, function (' + val + ', ' + key + ') {\n', '    ' + ctx + val + ' = ' + val + ';\n', '    ' + ctx + key + ' = ' + key + ';\n', '    ' + ctxloop + '.key = ' + key + ';\n', '    ' + ctxloop + '.first = (' + ctxloop + '.index0 === 0);\n', '    ' + ctxloop + '.last = (' + ctxloop + '.revindex0 === 0);\n', '    ' + compiler(content, parents, options, blockName), '    ' + ctxloop + '.index += 1; ' + ctxloop + '.index0 += 1; ' + ctxloop + '.revindex -= 1; ' + ctxloop + '.revindex0 -= 1;\n', '  });\n', '  ' + ctxloop + ' = ' + ctxloopcache + '.loop;\n', '  ' + ctx + val + ' = ' + ctxloopcache + '.' + val + ';\n', '  ' + ctx + key + ' = ' + ctxloopcache + '.' + key + ';\n', '  ' + ctxloopcache + ' = undefined;\n', '})();\n'].join('');
      };
      exports.parse = function(str, line, parser, types) {
        var firstVar,
            ready;
        parser.on(types.NUMBER, function(token) {
          var lastState = this.state.length ? this.state[this.state.length - 1] : null;
          if (!ready || (lastState !== types.ARRAYOPEN && lastState !== types.CURLYOPEN && lastState !== types.CURLYCLOSE && lastState !== types.FUNCTION && lastState !== types.FILTER)) {
            throw new Error('Unexpected number "' + token.match + '" on line ' + line + '.');
          }
          return true;
        });
        parser.on(types.VAR, function(token) {
          if (ready && firstVar) {
            return true;
          }
          if (!this.out.length) {
            firstVar = true;
          }
          this.out.push(token.match);
        });
        parser.on(types.COMMA, function(token) {
          if (firstVar && this.prevToken.type === types.VAR) {
            this.out.push(token.match);
            return;
          }
          return true;
        });
        parser.on(types.COMPARATOR, function(token) {
          if (token.match !== 'in' || !firstVar) {
            throw new Error('Unexpected token "' + token.match + '" on line ' + line + '.');
          }
          ready = true;
          this.filterApplyIdx.push(this.out.length);
        });
        return true;
      };
      exports.ends = true;
    }, {}],
    17: [function(require, module, exports) {
      exports.compile = function(compiler, args, content, parents, options, blockName) {
        return 'if (' + args.join(' ') + ') { \n' + compiler(content, parents, options, blockName) + '\n' + '}';
      };
      exports.parse = function(str, line, parser, types) {
        if (typeof str === "undefined") {
          throw new Error('No conditional statement provided on line ' + line + '.');
        }
        parser.on(types.COMPARATOR, function(token) {
          if (this.isLast) {
            throw new Error('Unexpected logic "' + token.match + '" on line ' + line + '.');
          }
          if (this.prevToken.type === types.NOT) {
            throw new Error('Attempted logic "not ' + token.match + '" on line ' + line + '. Use !(foo ' + token.match + ') instead.');
          }
          this.out.push(token.match);
          this.filterApplyIdx.push(this.out.length);
        });
        parser.on(types.NOT, function(token) {
          if (this.isLast) {
            throw new Error('Unexpected logic "' + token.match + '" on line ' + line + '.');
          }
          this.out.push(token.match);
        });
        parser.on(types.BOOL, function(token) {
          this.out.push(token.match);
        });
        parser.on(types.LOGIC, function(token) {
          if (!this.out.length || this.isLast) {
            throw new Error('Unexpected logic "' + token.match + '" on line ' + line + '.');
          }
          this.out.push(token.match);
          this.filterApplyIdx.pop();
        });
        return true;
      };
      exports.ends = true;
    }, {}],
    18: [function(require, module, exports) {
      var utils = require('../utils');
      exports.compile = function(compiler, args) {
        var ctx = args.pop(),
            out = '_ctx.' + ctx + ' = {};\n  var _output = "";\n',
            replacements = utils.map(args, function(arg) {
              return {
                ex: new RegExp('_ctx.' + arg.name, 'g'),
                re: '_ctx.' + ctx + '.' + arg.name
              };
            });
        utils.each(args, function(arg) {
          var c = arg.compiled;
          utils.each(replacements, function(re) {
            c = c.replace(re.ex, re.re);
          });
          out += c;
        });
        return out;
      };
      exports.parse = function(str, line, parser, types, stack, opts, swig) {
        var compiler = require('../parser').compile,
            parseOpts = {resolveFrom: opts.filename},
            compileOpts = utils.extend({}, opts, parseOpts),
            tokens,
            ctx;
        parser.on(types.STRING, function(token) {
          var self = this;
          if (!tokens) {
            tokens = swig.parseFile(token.match.replace(/^("|')|("|')$/g, ''), parseOpts).tokens;
            utils.each(tokens, function(token) {
              var out = '',
                  macroName;
              if (!token || token.name !== 'macro' || !token.compile) {
                return;
              }
              macroName = token.args[0];
              out += token.compile(compiler, token.args, token.content, [], compileOpts) + '\n';
              self.out.push({
                compiled: out,
                name: macroName
              });
            });
            return;
          }
          throw new Error('Unexpected string ' + token.match + ' on line ' + line + '.');
        });
        parser.on(types.VAR, function(token) {
          var self = this;
          if (!tokens || ctx) {
            throw new Error('Unexpected variable "' + token.match + '" on line ' + line + '.');
          }
          if (token.match === 'as') {
            return;
          }
          ctx = token.match;
          self.out.push(ctx);
          return false;
        });
        return true;
      };
      exports.block = true;
    }, {
      "../parser": 8,
      "../utils": 26
    }],
    19: [function(require, module, exports) {
      var ignore = 'ignore',
          missing = 'missing',
          only = 'only';
      exports.compile = function(compiler, args) {
        var file = args.shift(),
            onlyIdx = args.indexOf(only),
            onlyCtx = onlyIdx !== -1 ? args.splice(onlyIdx, 1) : false,
            parentFile = (args.pop() || '').replace(/\\/g, '\\\\'),
            ignore = args[args.length - 1] === missing ? (args.pop()) : false,
            w = args.join('');
        return (ignore ? '  try {\n' : '') + '_output += _swig.compileFile(' + file + ', {' + 'resolveFrom: "' + parentFile + '"' + '})(' + ((onlyCtx && w) ? w : (!w ? '_ctx' : '_utils.extend({}, _ctx, ' + w + ')')) + ');\n' + (ignore ? '} catch (e) {}\n' : '');
      };
      exports.parse = function(str, line, parser, types, stack, opts) {
        var file,
            w;
        parser.on(types.STRING, function(token) {
          if (!file) {
            file = token.match;
            this.out.push(file);
            return;
          }
          return true;
        });
        parser.on(types.VAR, function(token) {
          if (!file) {
            file = token.match;
            return true;
          }
          if (!w && token.match === 'with') {
            w = true;
            return;
          }
          if (w && token.match === only && this.prevToken.match !== 'with') {
            this.out.push(token.match);
            return;
          }
          if (token.match === ignore) {
            return false;
          }
          if (token.match === missing) {
            if (this.prevToken.match !== ignore) {
              throw new Error('Unexpected token "' + missing + '" on line ' + line + '.');
            }
            this.out.push(token.match);
            return false;
          }
          if (this.prevToken.match === ignore) {
            throw new Error('Expected "' + missing + '" on line ' + line + ' but found "' + token.match + '".');
          }
          return true;
        });
        parser.on('end', function() {
          this.out.push(opts.filename || null);
        });
        return true;
      };
    }, {}],
    20: [function(require, module, exports) {
      exports.autoescape = require('./autoescape');
      exports.block = require('./block');
      exports["else"] = require('./else');
      exports.elseif = require('./elseif');
      exports.elif = exports.elseif;
      exports["extends"] = require('./extends');
      exports.filter = require('./filter');
      exports["for"] = require('./for');
      exports["if"] = require('./if');
      exports["import"] = require('./import');
      exports.include = require('./include');
      exports.macro = require('./macro');
      exports.parent = require('./parent');
      exports.raw = require('./raw');
      exports.set = require('./set');
      exports.spaceless = require('./spaceless');
    }, {
      "./autoescape": 10,
      "./block": 11,
      "./else": 12,
      "./elseif": 13,
      "./extends": 14,
      "./filter": 15,
      "./for": 16,
      "./if": 17,
      "./import": 18,
      "./include": 19,
      "./macro": 21,
      "./parent": 22,
      "./raw": 23,
      "./set": 24,
      "./spaceless": 25
    }],
    21: [function(require, module, exports) {
      exports.compile = function(compiler, args, content, parents, options, blockName) {
        var fnName = args.shift();
        return '_ctx.' + fnName + ' = function (' + args.join('') + ') {\n' + '  var _output = "",\n' + '    __ctx = _utils.extend({}, _ctx);\n' + '  _utils.each(_ctx, function (v, k) {\n' + '    if (["' + args.join('","') + '"].indexOf(k) !== -1) { delete _ctx[k]; }\n' + '  });\n' + compiler(content, parents, options, blockName) + '\n' + ' _ctx = _utils.extend(_ctx, __ctx);\n' + '  return _output;\n' + '};\n' + '_ctx.' + fnName + '.safe = true;\n';
      };
      exports.parse = function(str, line, parser, types) {
        var name;
        parser.on(types.VAR, function(token) {
          if (token.match.indexOf('.') !== -1) {
            throw new Error('Unexpected dot in macro argument "' + token.match + '" on line ' + line + '.');
          }
          this.out.push(token.match);
        });
        parser.on(types.FUNCTION, function(token) {
          if (!name) {
            name = token.match;
            this.out.push(name);
            this.state.push(types.FUNCTION);
          }
        });
        parser.on(types.FUNCTIONEMPTY, function(token) {
          if (!name) {
            name = token.match;
            this.out.push(name);
          }
        });
        parser.on(types.PARENCLOSE, function() {
          if (this.isLast) {
            return;
          }
          throw new Error('Unexpected parenthesis close on line ' + line + '.');
        });
        parser.on(types.COMMA, function() {
          return true;
        });
        parser.on('*', function() {
          return;
        });
        return true;
      };
      exports.ends = true;
      exports.block = true;
    }, {}],
    22: [function(require, module, exports) {
      exports.compile = function(compiler, args, content, parents, options, blockName) {
        if (!parents || !parents.length) {
          return '';
        }
        var parentFile = args[0],
            breaker = true,
            l = parents.length,
            i = 0,
            parent,
            block;
        for (i; i < l; i += 1) {
          parent = parents[i];
          if (!parent.blocks || !parent.blocks.hasOwnProperty(blockName)) {
            continue;
          }
          if (breaker && parentFile !== parent.name) {
            block = parent.blocks[blockName];
            return block.compile(compiler, [blockName], block.content, parents.slice(i + 1), options) + '\n';
          }
        }
      };
      exports.parse = function(str, line, parser, types, stack, opts) {
        parser.on('*', function(token) {
          throw new Error('Unexpected argument "' + token.match + '" on line ' + line + '.');
        });
        parser.on('end', function() {
          this.out.push(opts.filename);
        });
        return true;
      };
    }, {}],
    23: [function(require, module, exports) {
      exports.compile = function(compiler, args, content, parents, options, blockName) {
        return compiler(content, parents, options, blockName);
      };
      exports.parse = function(str, line, parser) {
        parser.on('*', function(token) {
          throw new Error('Unexpected token "' + token.match + '" in raw tag on line ' + line + '.');
        });
        return true;
      };
      exports.ends = true;
    }, {}],
    24: [function(require, module, exports) {
      exports.compile = function(compiler, args) {
        return args.join(' ') + ';\n';
      };
      exports.parse = function(str, line, parser, types) {
        var nameSet = '',
            propertyName;
        parser.on(types.VAR, function(token) {
          if (propertyName) {
            propertyName += '_ctx.' + token.match;
            return;
          }
          if (!parser.out.length) {
            nameSet += token.match;
            return;
          }
          return true;
        });
        parser.on(types.BRACKETOPEN, function(token) {
          if (!propertyName && !this.out.length) {
            propertyName = token.match;
            return;
          }
          return true;
        });
        parser.on(types.STRING, function(token) {
          if (propertyName && !this.out.length) {
            propertyName += token.match;
            return;
          }
          return true;
        });
        parser.on(types.BRACKETCLOSE, function(token) {
          if (propertyName && !this.out.length) {
            nameSet += propertyName + token.match;
            propertyName = undefined;
            return;
          }
          return true;
        });
        parser.on(types.DOTKEY, function(token) {
          if (!propertyName && !nameSet) {
            return true;
          }
          nameSet += '.' + token.match;
          return;
        });
        parser.on(types.ASSIGNMENT, function(token) {
          if (this.out.length || !nameSet) {
            throw new Error('Unexpected assignment "' + token.match + '" on line ' + line + '.');
          }
          this.out.push('_ctx.' + nameSet);
          this.out.push(token.match);
          this.filterApplyIdx.push(this.out.length);
        });
        return true;
      };
      exports.block = true;
    }, {}],
    25: [function(require, module, exports) {
      var utils = require('../utils');
      exports.compile = function(compiler, args, content, parents, options, blockName) {
        function stripWhitespace(tokens) {
          return utils.map(tokens, function(token) {
            if (token.content || typeof token !== 'string') {
              token.content = stripWhitespace(token.content);
              return token;
            }
            return token.replace(/^\s+/, '').replace(/>\s+</g, '><').replace(/\s+$/, '');
          });
        }
        return compiler(stripWhitespace(content), parents, options, blockName);
      };
      exports.parse = function(str, line, parser) {
        parser.on('*', function(token) {
          throw new Error('Unexpected token "' + token.match + '" on line ' + line + '.');
        });
        return true;
      };
      exports.ends = true;
    }, {"../utils": 26}],
    26: [function(require, module, exports) {
      var isArray;
      exports.strip = function(input) {
        return input.replace(/^\s+|\s+$/g, '');
      };
      exports.startsWith = function(str, prefix) {
        return str.indexOf(prefix) === 0;
      };
      exports.endsWith = function(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
      };
      exports.each = function(obj, fn) {
        var i,
            l;
        if (isArray(obj)) {
          i = 0;
          l = obj.length;
          for (i; i < l; i += 1) {
            if (fn(obj[i], i, obj) === false) {
              break;
            }
          }
        } else {
          for (i in obj) {
            if (obj.hasOwnProperty(i)) {
              if (fn(obj[i], i, obj) === false) {
                break;
              }
            }
          }
        }
        return obj;
      };
      exports.isArray = isArray = (Array.hasOwnProperty('isArray')) ? Array.isArray : function(obj) {
        return (obj) ? (typeof obj === 'object' && Object.prototype.toString.call(obj).indexOf() !== -1) : false;
      };
      exports.some = function(obj, fn) {
        var i = 0,
            result,
            l;
        if (isArray(obj)) {
          l = obj.length;
          for (i; i < l; i += 1) {
            result = fn(obj[i], i, obj);
            if (result) {
              break;
            }
          }
        } else {
          exports.each(obj, function(value, index) {
            result = fn(value, index, obj);
            return !(result);
          });
        }
        return !!result;
      };
      exports.map = function(obj, fn) {
        var i = 0,
            result = [],
            l;
        if (isArray(obj)) {
          l = obj.length;
          for (i; i < l; i += 1) {
            result[i] = fn(obj[i], i);
          }
        } else {
          for (i in obj) {
            if (obj.hasOwnProperty(i)) {
              result[i] = fn(obj[i], i);
            }
          }
        }
        return result;
      };
      exports.extend = function() {
        var args = arguments,
            target = args[0],
            objs = (args.length > 1) ? Array.prototype.slice.call(args, 1) : [],
            i = 0,
            l = objs.length,
            key,
            obj;
        for (i; i < l; i += 1) {
          obj = objs[i] || {};
          for (key in obj) {
            if (obj.hasOwnProperty(key)) {
              target[key] = obj[key];
            }
          }
        }
        return target;
      };
      exports.keys = function(obj) {
        if (!obj) {
          return [];
        }
        if (Object.keys) {
          return Object.keys(obj);
        }
        return exports.map(obj, function(v, k) {
          return k;
        });
      };
      exports.throwError = function(message, line, file) {
        if (line) {
          message += ' on line ' + line;
        }
        if (file) {
          message += ' in file ' + file;
        }
        throw new Error(message + '.');
      };
    }, {}],
    27: [function(require, module, exports) {
      var toString = Object.prototype.toString;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      function isArray(xs) {
        return toString.call(xs) === '[object Array]';
      }
      exports.isArray = typeof Array.isArray === 'function' ? Array.isArray : isArray;
      exports.indexOf = function indexOf(xs, x) {
        if (xs.indexOf)
          return xs.indexOf(x);
        for (var i = 0; i < xs.length; i++) {
          if (x === xs[i])
            return i;
        }
        return -1;
      };
      exports.filter = function filter(xs, fn) {
        if (xs.filter)
          return xs.filter(fn);
        var res = [];
        for (var i = 0; i < xs.length; i++) {
          if (fn(xs[i], i, xs))
            res.push(xs[i]);
        }
        return res;
      };
      exports.forEach = function forEach(xs, fn, self) {
        if (xs.forEach)
          return xs.forEach(fn, self);
        for (var i = 0; i < xs.length; i++) {
          fn.call(self, xs[i], i, xs);
        }
      };
      exports.map = function map(xs, fn) {
        if (xs.map)
          return xs.map(fn);
        var out = new Array(xs.length);
        for (var i = 0; i < xs.length; i++) {
          out[i] = fn(xs[i], i, xs);
        }
        return out;
      };
      exports.reduce = function reduce(array, callback, opt_initialValue) {
        if (array.reduce)
          return array.reduce(callback, opt_initialValue);
        var value,
            isValueSet = false;
        if (2 < arguments.length) {
          value = opt_initialValue;
          isValueSet = true;
        }
        for (var i = 0,
            l = array.length; l > i; ++i) {
          if (array.hasOwnProperty(i)) {
            if (isValueSet) {
              value = callback(value, array[i], i, array);
            } else {
              value = array[i];
              isValueSet = true;
            }
          }
        }
        return value;
      };
      if ('ab'.substr(-1) !== 'b') {
        exports.substr = function(str, start, length) {
          if (start < 0)
            start = str.length + start;
          return str.substr(start, length);
        };
      } else {
        exports.substr = function(str, start, length) {
          return str.substr(start, length);
        };
      }
      exports.trim = function(str) {
        if (str.trim)
          return str.trim();
        return str.replace(/^\s+|\s+$/g, '');
      };
      exports.bind = function() {
        var args = Array.prototype.slice.call(arguments);
        var fn = args.shift();
        if (fn.bind)
          return fn.bind.apply(fn, args);
        var self = args.shift();
        return function() {
          fn.apply(self, args.concat([Array.prototype.slice.call(arguments)]));
        };
      };
      function create(prototype, properties) {
        var object;
        if (prototype === null) {
          object = {'__proto__': null};
        } else {
          if (typeof prototype !== 'object') {
            throw new TypeError('typeof prototype[' + (typeof prototype) + '] != \'object\'');
          }
          var Type = function() {};
          Type.prototype = prototype;
          object = new Type();
          object.__proto__ = prototype;
        }
        if (typeof properties !== 'undefined' && Object.defineProperties) {
          Object.defineProperties(object, properties);
        }
        return object;
      }
      exports.create = typeof Object.create === 'function' ? Object.create : create;
      function notObject(object) {
        return ((typeof object != "object" && typeof object != "function") || object === null);
      }
      function keysShim(object) {
        if (notObject(object)) {
          throw new TypeError("Object.keys called on a non-object");
        }
        var result = [];
        for (var name in object) {
          if (hasOwnProperty.call(object, name)) {
            result.push(name);
          }
        }
        return result;
      }
      function propertyShim(object) {
        if (notObject(object)) {
          throw new TypeError("Object.getOwnPropertyNames called on a non-object");
        }
        var result = keysShim(object);
        if (exports.isArray(object) && exports.indexOf(object, 'length') === -1) {
          result.push('length');
        }
        return result;
      }
      var keys = typeof Object.keys === 'function' ? Object.keys : keysShim;
      var getOwnPropertyNames = typeof Object.getOwnPropertyNames === 'function' ? Object.getOwnPropertyNames : propertyShim;
      if (new Error().hasOwnProperty('description')) {
        var ERROR_PROPERTY_FILTER = function(obj, array) {
          if (toString.call(obj) === '[object Error]') {
            array = exports.filter(array, function(name) {
              return name !== 'description' && name !== 'number' && name !== 'message';
            });
          }
          return array;
        };
        exports.keys = function(object) {
          return ERROR_PROPERTY_FILTER(object, keys(object));
        };
        exports.getOwnPropertyNames = function(object) {
          return ERROR_PROPERTY_FILTER(object, getOwnPropertyNames(object));
        };
      } else {
        exports.keys = keys;
        exports.getOwnPropertyNames = getOwnPropertyNames;
      }
      function valueObject(value, key) {
        return {value: value[key]};
      }
      if (typeof Object.getOwnPropertyDescriptor === 'function') {
        try {
          Object.getOwnPropertyDescriptor({'a': 1}, 'a');
          exports.getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
        } catch (e) {
          exports.getOwnPropertyDescriptor = function(value, key) {
            try {
              return Object.getOwnPropertyDescriptor(value, key);
            } catch (e) {
              return valueObject(value, key);
            }
          };
        }
      } else {
        exports.getOwnPropertyDescriptor = valueObject;
      }
    }, {}],
    28: [function(require, module, exports) {}, {}],
    29: [function(require, module, exports) {
      var process = require('__browserify_process');
      var util = require('util');
      var shims = require('_shims');
      function normalizeArray(parts, allowAboveRoot) {
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        if (allowAboveRoot) {
          for (; up--; up) {
            parts.unshift('..');
          }
        }
        return parts;
      }
      var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
      var splitPath = function(filename) {
        return splitPathRe.exec(filename).slice(1);
      };
      exports.resolve = function() {
        var resolvedPath = '',
            resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? arguments[i] : process.cwd();
          if (!util.isString(path)) {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            continue;
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = path.charAt(0) === '/';
        }
        resolvedPath = normalizeArray(shims.filter(resolvedPath.split('/'), function(p) {
          return !!p;
        }), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      };
      exports.normalize = function(path) {
        var isAbsolute = exports.isAbsolute(path),
            trailingSlash = shims.substr(path, -1) === '/';
        path = normalizeArray(shims.filter(path.split('/'), function(p) {
          return !!p;
        }), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      };
      exports.isAbsolute = function(path) {
        return path.charAt(0) === '/';
      };
      exports.join = function() {
        var paths = Array.prototype.slice.call(arguments, 0);
        return exports.normalize(shims.filter(paths, function(p, index) {
          if (!util.isString(p)) {
            throw new TypeError('Arguments to path.join must be strings');
          }
          return p;
        }).join('/'));
      };
      exports.relative = function(from, to) {
        from = exports.resolve(from).substr(1);
        to = exports.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '')
              break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '')
              break;
          }
          if (start > end)
            return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      };
      exports.sep = '/';
      exports.delimiter = ':';
      exports.dirname = function(path) {
        var result = splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          return '.';
        }
        if (dir) {
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      };
      exports.basename = function(path, ext) {
        var f = splitPath(path)[2];
        if (ext && f.substr(-1 * ext.length) === ext) {
          f = f.substr(0, f.length - ext.length);
        }
        return f;
      };
      exports.extname = function(path) {
        return splitPath(path)[3];
      };
    }, {
      "__browserify_process": 31,
      "_shims": 27,
      "util": 30
    }],
    30: [function(require, module, exports) {
      var shims = require('_shims');
      var formatRegExp = /%[sdj%]/g;
      exports.format = function(f) {
        if (!isString(f)) {
          var objects = [];
          for (var i = 0; i < arguments.length; i++) {
            objects.push(inspect(arguments[i]));
          }
          return objects.join(' ');
        }
        var i = 1;
        var args = arguments;
        var len = args.length;
        var str = String(f).replace(formatRegExp, function(x) {
          if (x === '%%')
            return '%';
          if (i >= len)
            return x;
          switch (x) {
            case '%s':
              return String(args[i++]);
            case '%d':
              return Number(args[i++]);
            case '%j':
              try {
                return JSON.stringify(args[i++]);
              } catch (_) {
                return '[Circular]';
              }
            default:
              return x;
          }
        });
        for (var x = args[i]; i < len; x = args[++i]) {
          if (isNull(x) || !isObject(x)) {
            str += ' ' + x;
          } else {
            str += ' ' + inspect(x);
          }
        }
        return str;
      };
      function inspect(obj, opts) {
        var ctx = {
          seen: [],
          stylize: stylizeNoColor
        };
        if (arguments.length >= 3)
          ctx.depth = arguments[2];
        if (arguments.length >= 4)
          ctx.colors = arguments[3];
        if (isBoolean(opts)) {
          ctx.showHidden = opts;
        } else if (opts) {
          exports._extend(ctx, opts);
        }
        if (isUndefined(ctx.showHidden))
          ctx.showHidden = false;
        if (isUndefined(ctx.depth))
          ctx.depth = 2;
        if (isUndefined(ctx.colors))
          ctx.colors = false;
        if (isUndefined(ctx.customInspect))
          ctx.customInspect = true;
        if (ctx.colors)
          ctx.stylize = stylizeWithColor;
        return formatValue(ctx, obj, ctx.depth);
      }
      exports.inspect = inspect;
      inspect.colors = {
        'bold': [1, 22],
        'italic': [3, 23],
        'underline': [4, 24],
        'inverse': [7, 27],
        'white': [37, 39],
        'grey': [90, 39],
        'black': [30, 39],
        'blue': [34, 39],
        'cyan': [36, 39],
        'green': [32, 39],
        'magenta': [35, 39],
        'red': [31, 39],
        'yellow': [33, 39]
      };
      inspect.styles = {
        'special': 'cyan',
        'number': 'yellow',
        'boolean': 'yellow',
        'undefined': 'grey',
        'null': 'bold',
        'string': 'green',
        'date': 'magenta',
        'regexp': 'red'
      };
      function stylizeWithColor(str, styleType) {
        var style = inspect.styles[styleType];
        if (style) {
          return '\u001b[' + inspect.colors[style][0] + 'm' + str + '\u001b[' + inspect.colors[style][1] + 'm';
        } else {
          return str;
        }
      }
      function stylizeNoColor(str, styleType) {
        return str;
      }
      function arrayToHash(array) {
        var hash = {};
        shims.forEach(array, function(val, idx) {
          hash[val] = true;
        });
        return hash;
      }
      function formatValue(ctx, value, recurseTimes) {
        if (ctx.customInspect && value && isFunction(value.inspect) && value.inspect !== exports.inspect && !(value.constructor && value.constructor.prototype === value)) {
          var ret = value.inspect(recurseTimes);
          if (!isString(ret)) {
            ret = formatValue(ctx, ret, recurseTimes);
          }
          return ret;
        }
        var primitive = formatPrimitive(ctx, value);
        if (primitive) {
          return primitive;
        }
        var keys = shims.keys(value);
        var visibleKeys = arrayToHash(keys);
        if (ctx.showHidden) {
          keys = shims.getOwnPropertyNames(value);
        }
        if (keys.length === 0) {
          if (isFunction(value)) {
            var name = value.name ? ': ' + value.name : '';
            return ctx.stylize('[Function' + name + ']', 'special');
          }
          if (isRegExp(value)) {
            return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
          }
          if (isDate(value)) {
            return ctx.stylize(Date.prototype.toString.call(value), 'date');
          }
          if (isError(value)) {
            return formatError(value);
          }
        }
        var base = '',
            array = false,
            braces = ['{', '}'];
        if (isArray(value)) {
          array = true;
          braces = ['[', ']'];
        }
        if (isFunction(value)) {
          var n = value.name ? ': ' + value.name : '';
          base = ' [Function' + n + ']';
        }
        if (isRegExp(value)) {
          base = ' ' + RegExp.prototype.toString.call(value);
        }
        if (isDate(value)) {
          base = ' ' + Date.prototype.toUTCString.call(value);
        }
        if (isError(value)) {
          base = ' ' + formatError(value);
        }
        if (keys.length === 0 && (!array || value.length == 0)) {
          return braces[0] + base + braces[1];
        }
        if (recurseTimes < 0) {
          if (isRegExp(value)) {
            return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
          } else {
            return ctx.stylize('[Object]', 'special');
          }
        }
        ctx.seen.push(value);
        var output;
        if (array) {
          output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
        } else {
          output = keys.map(function(key) {
            return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
          });
        }
        ctx.seen.pop();
        return reduceToSingleString(output, base, braces);
      }
      function formatPrimitive(ctx, value) {
        if (isUndefined(value))
          return ctx.stylize('undefined', 'undefined');
        if (isString(value)) {
          var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
          return ctx.stylize(simple, 'string');
        }
        if (isNumber(value))
          return ctx.stylize('' + value, 'number');
        if (isBoolean(value))
          return ctx.stylize('' + value, 'boolean');
        if (isNull(value))
          return ctx.stylize('null', 'null');
      }
      function formatError(value) {
        return '[' + Error.prototype.toString.call(value) + ']';
      }
      function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
        var output = [];
        for (var i = 0,
            l = value.length; i < l; ++i) {
          if (hasOwnProperty(value, String(i))) {
            output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
          } else {
            output.push('');
          }
        }
        shims.forEach(keys, function(key) {
          if (!key.match(/^\d+$/)) {
            output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
          }
        });
        return output;
      }
      function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
        var name,
            str,
            desc;
        desc = shims.getOwnPropertyDescriptor(value, key) || {value: value[key]};
        if (desc.get) {
          if (desc.set) {
            str = ctx.stylize('[Getter/Setter]', 'special');
          } else {
            str = ctx.stylize('[Getter]', 'special');
          }
        } else {
          if (desc.set) {
            str = ctx.stylize('[Setter]', 'special');
          }
        }
        if (!hasOwnProperty(visibleKeys, key)) {
          name = '[' + key + ']';
        }
        if (!str) {
          if (shims.indexOf(ctx.seen, desc.value) < 0) {
            if (isNull(recurseTimes)) {
              str = formatValue(ctx, desc.value, null);
            } else {
              str = formatValue(ctx, desc.value, recurseTimes - 1);
            }
            if (str.indexOf('\n') > -1) {
              if (array) {
                str = str.split('\n').map(function(line) {
                  return '  ' + line;
                }).join('\n').substr(2);
              } else {
                str = '\n' + str.split('\n').map(function(line) {
                  return '   ' + line;
                }).join('\n');
              }
            }
          } else {
            str = ctx.stylize('[Circular]', 'special');
          }
        }
        if (isUndefined(name)) {
          if (array && key.match(/^\d+$/)) {
            return str;
          }
          name = JSON.stringify('' + key);
          if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
            name = name.substr(1, name.length - 2);
            name = ctx.stylize(name, 'name');
          } else {
            name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
            name = ctx.stylize(name, 'string');
          }
        }
        return name + ': ' + str;
      }
      function reduceToSingleString(output, base, braces) {
        var numLinesEst = 0;
        var length = shims.reduce(output, function(prev, cur) {
          numLinesEst++;
          if (cur.indexOf('\n') >= 0)
            numLinesEst++;
          return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
        }, 0);
        if (length > 60) {
          return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
        }
        return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
      }
      function isArray(ar) {
        return shims.isArray(ar);
      }
      exports.isArray = isArray;
      function isBoolean(arg) {
        return typeof arg === 'boolean';
      }
      exports.isBoolean = isBoolean;
      function isNull(arg) {
        return arg === null;
      }
      exports.isNull = isNull;
      function isNullOrUndefined(arg) {
        return arg == null;
      }
      exports.isNullOrUndefined = isNullOrUndefined;
      function isNumber(arg) {
        return typeof arg === 'number';
      }
      exports.isNumber = isNumber;
      function isString(arg) {
        return typeof arg === 'string';
      }
      exports.isString = isString;
      function isSymbol(arg) {
        return typeof arg === 'symbol';
      }
      exports.isSymbol = isSymbol;
      function isUndefined(arg) {
        return arg === void 0;
      }
      exports.isUndefined = isUndefined;
      function isRegExp(re) {
        return isObject(re) && objectToString(re) === '[object RegExp]';
      }
      exports.isRegExp = isRegExp;
      function isObject(arg) {
        return typeof arg === 'object' && arg;
      }
      exports.isObject = isObject;
      function isDate(d) {
        return isObject(d) && objectToString(d) === '[object Date]';
      }
      exports.isDate = isDate;
      function isError(e) {
        return isObject(e) && objectToString(e) === '[object Error]';
      }
      exports.isError = isError;
      function isFunction(arg) {
        return typeof arg === 'function';
      }
      exports.isFunction = isFunction;
      function isPrimitive(arg) {
        return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || typeof arg === 'symbol' || typeof arg === 'undefined';
      }
      exports.isPrimitive = isPrimitive;
      function isBuffer(arg) {
        return arg && typeof arg === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.binarySlice === 'function';
        ;
      }
      exports.isBuffer = isBuffer;
      function objectToString(o) {
        return Object.prototype.toString.call(o);
      }
      function pad(n) {
        return n < 10 ? '0' + n.toString(10) : n.toString(10);
      }
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      function timestamp() {
        var d = new Date();
        var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
        return [d.getDate(), months[d.getMonth()], time].join(' ');
      }
      exports.log = function() {
        console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
      };
      exports.inherits = function(ctor, superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = shims.create(superCtor.prototype, {constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }});
      };
      exports._extend = function(origin, add) {
        if (!add || !isObject(add))
          return origin;
        var keys = shims.keys(add);
        var i = keys.length;
        while (i--) {
          origin[keys[i]] = add[keys[i]];
        }
        return origin;
      };
      function hasOwnProperty(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      }
    }, {"_shims": 27}],
    31: [function(require, module, exports) {
      var process = module.exports = {};
      process.nextTick = (function() {
        var canSetImmediate = typeof window !== 'undefined' && window.setImmediate;
        var canPost = typeof window !== 'undefined' && window.postMessage && window.addEventListener;
        ;
        if (canSetImmediate) {
          return function(f) {
            return window.setImmediate(f);
          };
        }
        if (canPost) {
          var queue = [];
          window.addEventListener('message', function(ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
              ev.stopPropagation();
              if (queue.length > 0) {
                var fn = queue.shift();
                fn();
              }
            }
          }, true);
          return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
          };
        }
        return function nextTick(fn) {
          setTimeout(fn, 0);
        };
      })();
      process.title = 'browser';
      process.browser = true;
      process.env = {};
      process.argv = [];
      process.binding = function(name) {
        throw new Error('process.binding is not supported');
      };
      process.cwd = function() {
        return '/';
      };
      process.chdir = function(dir) {
        throw new Error('process.chdir is not supported');
      };
    }, {}]
  }, {}, [1]);
  ;
})(require('process'));
