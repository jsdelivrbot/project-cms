/* */ 
(function(Buffer, process) {
  var cryptoLib = require('crypto');
  var Buffer = require('buffer').Buffer;
  var AWS;
  var util = {
    engine: function engine() {
      if (util.isBrowser() && typeof navigator !== 'undefined') {
        return navigator.userAgent;
      } else {
        return process.platform + '/' + process.version;
      }
    },
    userAgent: function userAgent() {
      var name = util.isBrowser() ? 'js' : 'nodejs';
      var agent = 'aws-sdk-' + name + '/' + require('./core').VERSION;
      if (name === 'nodejs')
        agent += ' ' + util.engine();
      return agent;
    },
    isBrowser: function isBrowser() {
      return process && process.browser;
    },
    isNode: function isNode() {
      return !util.isBrowser();
    },
    nodeRequire: function nodeRequire(module) {
      if (util.isNode())
        return require(module);
    },
    multiRequire: function multiRequire(module1, module2) {
      return require(util.isNode() ? module1 : module2);
    },
    uriEscape: function uriEscape(string) {
      var output = encodeURIComponent(string);
      output = output.replace(/[^A-Za-z0-9_.~\-%]+/g, escape);
      output = output.replace(/[*]/g, function(ch) {
        return '%' + ch.charCodeAt(0).toString(16).toUpperCase();
      });
      return output;
    },
    uriEscapePath: function uriEscapePath(string) {
      var parts = [];
      util.arrayEach(string.split('/'), function(part) {
        parts.push(util.uriEscape(part));
      });
      return parts.join('/');
    },
    urlParse: function urlParse(url) {
      return require('url').parse(url);
    },
    urlFormat: function urlFormat(url) {
      return require('url').format(url);
    },
    queryStringParse: function queryStringParse(qs) {
      return require('querystring').parse(qs);
    },
    queryParamsToString: function queryParamsToString(params) {
      var items = [];
      var escape = util.uriEscape;
      var sortedKeys = Object.keys(params).sort();
      util.arrayEach(sortedKeys, function(name) {
        var value = params[name];
        var ename = escape(name);
        var result = ename + '=';
        if (Array.isArray(value)) {
          var vals = [];
          util.arrayEach(value, function(item) {
            vals.push(escape(item));
          });
          result = ename + '=' + vals.sort().join('&' + ename + '=');
        } else if (value !== undefined && value !== null) {
          result = ename + '=' + escape(value);
        }
        items.push(result);
      });
      return items.join('&');
    },
    readFileSync: function readFileSync(path) {
      if (typeof window !== 'undefined')
        return null;
      return util.nodeRequire('fs').readFileSync(path, 'utf-8');
    },
    base64: {
      encode: function encode64(string) {
        return new Buffer(string).toString('base64');
      },
      decode: function decode64(string) {
        return new Buffer(string, 'base64');
      }
    },
    Buffer: Buffer,
    buffer: {
      toStream: function toStream(buffer) {
        if (!util.Buffer.isBuffer(buffer))
          buffer = new util.Buffer(buffer);
        var readable = new (util.nodeRequire('stream').Readable)();
        var pos = 0;
        readable._read = function(size) {
          if (pos >= buffer.length)
            return readable.push(null);
          var end = pos + size;
          if (end > buffer.length)
            end = buffer.length;
          readable.push(buffer.slice(pos, end));
          pos = end;
        };
        return readable;
      },
      concat: function(buffers) {
        var length = 0,
            offset = 0,
            buffer = null,
            i;
        for (i = 0; i < buffers.length; i++) {
          length += buffers[i].length;
        }
        buffer = new Buffer(length);
        for (i = 0; i < buffers.length; i++) {
          buffers[i].copy(buffer, offset);
          offset += buffers[i].length;
        }
        return buffer;
      }
    },
    string: {
      byteLength: function byteLength(string) {
        if (string === null || string === undefined)
          return 0;
        if (typeof string === 'string')
          string = new Buffer(string);
        if (typeof string.byteLength === 'number') {
          return string.byteLength;
        } else if (typeof string.length === 'number') {
          return string.length;
        } else if (typeof string.size === 'number') {
          return string.size;
        } else if (typeof string.path === 'string') {
          return util.nodeRequire('fs').lstatSync(string.path).size;
        } else {
          throw util.error(new Error('Cannot determine length of ' + string), {object: string});
        }
      },
      upperFirst: function upperFirst(string) {
        return string[0].toUpperCase() + string.substr(1);
      },
      lowerFirst: function lowerFirst(string) {
        return string[0].toLowerCase() + string.substr(1);
      }
    },
    ini: {parse: function string(ini) {
        var currentSection,
            map = {};
        util.arrayEach(ini.split(/\r?\n/), function(line) {
          line = line.split(/(^|\s);/)[0];
          var section = line.match(/^\s*\[([^\[\]]+)\]\s*$/);
          if (section) {
            currentSection = section[1];
          } else if (currentSection) {
            var item = line.match(/^\s*(.+?)\s*=\s*(.+?)\s*$/);
            if (item) {
              map[currentSection] = map[currentSection] || {};
              map[currentSection][item[1]] = item[2];
            }
          }
        });
        return map;
      }},
    fn: {
      noop: function() {},
      makeAsync: function makeAsync(fn, expectedArgs) {
        if (expectedArgs && expectedArgs <= fn.length) {
          return fn;
        }
        return function() {
          var args = Array.prototype.slice.call(arguments, 0);
          var callback = args.pop();
          var result = fn.apply(null, args);
          callback(result);
        };
      }
    },
    jamespath: {
      query: function query(expression, data) {
        if (!data)
          return [];
        var results = [];
        var expressions = expression.split(/\s+\|\|\s+/);
        util.arrayEach.call(this, expressions, function(expr) {
          var objects = [data];
          var tokens = expr.split('.');
          util.arrayEach.call(this, tokens, function(token) {
            var match = token.match('^(.+?)(?:\\[(-?\\d+|\\*|)\\])?$');
            var newObjects = [];
            util.arrayEach.call(this, objects, function(obj) {
              if (match[1] === '*') {
                util.arrayEach.call(this, obj, function(value) {
                  newObjects.push(value);
                });
              } else if (obj.hasOwnProperty(match[1])) {
                newObjects.push(obj[match[1]]);
              }
            });
            objects = newObjects;
            if (match[2] !== undefined) {
              newObjects = [];
              util.arrayEach.call(this, objects, function(obj) {
                if (Array.isArray(obj)) {
                  if (match[2] === '*' || match[2] === '') {
                    newObjects = newObjects.concat(obj);
                  } else {
                    var idx = parseInt(match[2], 10);
                    if (idx < 0)
                      idx = obj.length + idx;
                    newObjects.push(obj[idx]);
                  }
                }
              });
              objects = newObjects;
            }
            if (objects.length === 0)
              return util.abort;
          });
          if (objects.length > 0) {
            results = objects;
            return util.abort;
          }
        });
        return results;
      },
      find: function find(expression, data) {
        return util.jamespath.query(expression, data)[0];
      }
    },
    date: {
      getDate: function getDate() {
        if (!AWS)
          AWS = require('./core');
        if (AWS.config.systemClockOffset) {
          return new Date(new Date().getTime() + AWS.config.systemClockOffset);
        } else {
          return new Date();
        }
      },
      iso8601: function iso8601(date) {
        if (date === undefined) {
          date = util.date.getDate();
        }
        return date.toISOString().replace(/\.\d{3}Z$/, 'Z');
      },
      rfc822: function rfc822(date) {
        if (date === undefined) {
          date = util.date.getDate();
        }
        return date.toUTCString();
      },
      unixTimestamp: function unixTimestamp(date) {
        if (date === undefined) {
          date = util.date.getDate();
        }
        return date.getTime() / 1000;
      },
      from: function format(date) {
        if (typeof date === 'number') {
          return new Date(date * 1000);
        } else {
          return new Date(date);
        }
      },
      format: function format(date, formatter) {
        if (!formatter)
          formatter = 'iso8601';
        return util.date[formatter](util.date.from(date));
      },
      parseTimestamp: function parseTimestamp(value) {
        if (typeof value === 'number') {
          return new Date(value * 1000);
        } else if (value.match(/^\d+$/)) {
          return new Date(value * 1000);
        } else if (value.match(/^\d{4}/)) {
          return new Date(value);
        } else if (value.match(/^\w{3},/)) {
          return new Date(value);
        } else {
          throw util.error(new Error('unhandled timestamp format: ' + value), {code: 'TimestampParserError'});
        }
      }
    },
    crypto: {
      crc32Table: [0x00000000, 0x77073096, 0xEE0E612C, 0x990951BA, 0x076DC419, 0x706AF48F, 0xE963A535, 0x9E6495A3, 0x0EDB8832, 0x79DCB8A4, 0xE0D5E91E, 0x97D2D988, 0x09B64C2B, 0x7EB17CBD, 0xE7B82D07, 0x90BF1D91, 0x1DB71064, 0x6AB020F2, 0xF3B97148, 0x84BE41DE, 0x1ADAD47D, 0x6DDDE4EB, 0xF4D4B551, 0x83D385C7, 0x136C9856, 0x646BA8C0, 0xFD62F97A, 0x8A65C9EC, 0x14015C4F, 0x63066CD9, 0xFA0F3D63, 0x8D080DF5, 0x3B6E20C8, 0x4C69105E, 0xD56041E4, 0xA2677172, 0x3C03E4D1, 0x4B04D447, 0xD20D85FD, 0xA50AB56B, 0x35B5A8FA, 0x42B2986C, 0xDBBBC9D6, 0xACBCF940, 0x32D86CE3, 0x45DF5C75, 0xDCD60DCF, 0xABD13D59, 0x26D930AC, 0x51DE003A, 0xC8D75180, 0xBFD06116, 0x21B4F4B5, 0x56B3C423, 0xCFBA9599, 0xB8BDA50F, 0x2802B89E, 0x5F058808, 0xC60CD9B2, 0xB10BE924, 0x2F6F7C87, 0x58684C11, 0xC1611DAB, 0xB6662D3D, 0x76DC4190, 0x01DB7106, 0x98D220BC, 0xEFD5102A, 0x71B18589, 0x06B6B51F, 0x9FBFE4A5, 0xE8B8D433, 0x7807C9A2, 0x0F00F934, 0x9609A88E, 0xE10E9818, 0x7F6A0DBB, 0x086D3D2D, 0x91646C97, 0xE6635C01, 0x6B6B51F4, 0x1C6C6162, 0x856530D8, 0xF262004E, 0x6C0695ED, 0x1B01A57B, 0x8208F4C1, 0xF50FC457, 0x65B0D9C6, 0x12B7E950, 0x8BBEB8EA, 0xFCB9887C, 0x62DD1DDF, 0x15DA2D49, 0x8CD37CF3, 0xFBD44C65, 0x4DB26158, 0x3AB551CE, 0xA3BC0074, 0xD4BB30E2, 0x4ADFA541, 0x3DD895D7, 0xA4D1C46D, 0xD3D6F4FB, 0x4369E96A, 0x346ED9FC, 0xAD678846, 0xDA60B8D0, 0x44042D73, 0x33031DE5, 0xAA0A4C5F, 0xDD0D7CC9, 0x5005713C, 0x270241AA, 0xBE0B1010, 0xC90C2086, 0x5768B525, 0x206F85B3, 0xB966D409, 0xCE61E49F, 0x5EDEF90E, 0x29D9C998, 0xB0D09822, 0xC7D7A8B4, 0x59B33D17, 0x2EB40D81, 0xB7BD5C3B, 0xC0BA6CAD, 0xEDB88320, 0x9ABFB3B6, 0x03B6E20C, 0x74B1D29A, 0xEAD54739, 0x9DD277AF, 0x04DB2615, 0x73DC1683, 0xE3630B12, 0x94643B84, 0x0D6D6A3E, 0x7A6A5AA8, 0xE40ECF0B, 0x9309FF9D, 0x0A00AE27, 0x7D079EB1, 0xF00F9344, 0x8708A3D2, 0x1E01F268, 0x6906C2FE, 0xF762575D, 0x806567CB, 0x196C3671, 0x6E6B06E7, 0xFED41B76, 0x89D32BE0, 0x10DA7A5A, 0x67DD4ACC, 0xF9B9DF6F, 0x8EBEEFF9, 0x17B7BE43, 0x60B08ED5, 0xD6D6A3E8, 0xA1D1937E, 0x38D8C2C4, 0x4FDFF252, 0xD1BB67F1, 0xA6BC5767, 0x3FB506DD, 0x48B2364B, 0xD80D2BDA, 0xAF0A1B4C, 0x36034AF6, 0x41047A60, 0xDF60EFC3, 0xA867DF55, 0x316E8EEF, 0x4669BE79, 0xCB61B38C, 0xBC66831A, 0x256FD2A0, 0x5268E236, 0xCC0C7795, 0xBB0B4703, 0x220216B9, 0x5505262F, 0xC5BA3BBE, 0xB2BD0B28, 0x2BB45A92, 0x5CB36A04, 0xC2D7FFA7, 0xB5D0CF31, 0x2CD99E8B, 0x5BDEAE1D, 0x9B64C2B0, 0xEC63F226, 0x756AA39C, 0x026D930A, 0x9C0906A9, 0xEB0E363F, 0x72076785, 0x05005713, 0x95BF4A82, 0xE2B87A14, 0x7BB12BAE, 0x0CB61B38, 0x92D28E9B, 0xE5D5BE0D, 0x7CDCEFB7, 0x0BDBDF21, 0x86D3D2D4, 0xF1D4E242, 0x68DDB3F8, 0x1FDA836E, 0x81BE16CD, 0xF6B9265B, 0x6FB077E1, 0x18B74777, 0x88085AE6, 0xFF0F6A70, 0x66063BCA, 0x11010B5C, 0x8F659EFF, 0xF862AE69, 0x616BFFD3, 0x166CCF45, 0xA00AE278, 0xD70DD2EE, 0x4E048354, 0x3903B3C2, 0xA7672661, 0xD06016F7, 0x4969474D, 0x3E6E77DB, 0xAED16A4A, 0xD9D65ADC, 0x40DF0B66, 0x37D83BF0, 0xA9BCAE53, 0xDEBB9EC5, 0x47B2CF7F, 0x30B5FFE9, 0xBDBDF21C, 0xCABAC28A, 0x53B39330, 0x24B4A3A6, 0xBAD03605, 0xCDD70693, 0x54DE5729, 0x23D967BF, 0xB3667A2E, 0xC4614AB8, 0x5D681B02, 0x2A6F2B94, 0xB40BBE37, 0xC30C8EA1, 0x5A05DF1B, 0x2D02EF8D],
      crc32: function crc32(data) {
        var tbl = util.crypto.crc32Table;
        var crc = 0 ^ -1;
        if (typeof data === 'string') {
          data = new Buffer(data);
        }
        for (var i = 0; i < data.length; i++) {
          var code = data.readUInt8(i);
          crc = (crc >>> 8) ^ tbl[(crc ^ code) & 0xFF];
        }
        return (crc ^ -1) >>> 0;
      },
      hmac: function hmac(key, string, digest, fn) {
        if (!digest)
          digest = 'binary';
        if (digest === 'buffer') {
          digest = undefined;
        }
        if (!fn)
          fn = 'sha256';
        if (typeof string === 'string')
          string = new Buffer(string);
        return cryptoLib.createHmac(fn, key).update(string).digest(digest);
      },
      md5: function md5(data, digest, callback) {
        return util.crypto.hash('md5', data, digest, callback);
      },
      sha256: function sha256(data, digest, callback) {
        return util.crypto.hash('sha256', data, digest, callback);
      },
      hash: function(algorithm, data, digest, callback) {
        var hash = util.crypto.createHash(algorithm);
        if (!digest) {
          digest = 'binary';
        }
        if (digest === 'buffer') {
          digest = undefined;
        }
        if (typeof data === 'string')
          data = new Buffer(data);
        var sliceFn = util.arraySliceFn(data);
        var isBuffer = Buffer.isBuffer(data);
        if (util.isBrowser() && typeof ArrayBuffer !== 'undefined' && data && data.buffer instanceof ArrayBuffer)
          isBuffer = true;
        if (callback && typeof data === 'object' && typeof data.on === 'function' && !isBuffer) {
          data.on('data', function(chunk) {
            hash.update(chunk);
          });
          data.on('error', function(err) {
            callback(err);
          });
          data.on('end', function() {
            callback(null, hash.digest(digest));
          });
        } else if (callback && sliceFn && !isBuffer && typeof FileReader !== 'undefined') {
          var index = 0,
              size = 1024 * 512;
          var reader = new FileReader();
          reader.onerror = function() {
            callback(new Error('Failed to read data.'));
          };
          reader.onload = function() {
            var buf = new Buffer(new Uint8Array(reader.result));
            hash.update(buf);
            index += buf.length;
            reader._continueReading();
          };
          reader._continueReading = function() {
            if (index >= data.size) {
              callback(null, hash.digest(digest));
              return;
            }
            var back = index + size;
            if (back > data.size)
              back = data.size;
            reader.readAsArrayBuffer(sliceFn.call(data, index, back));
          };
          reader._continueReading();
        } else {
          if (util.isBrowser() && typeof data === 'object' && !isBuffer) {
            data = new Buffer(new Uint8Array(data));
          }
          var out = hash.update(data).digest(digest);
          if (callback)
            callback(null, out);
          return out;
        }
      },
      toHex: function toHex(data) {
        var out = [];
        for (var i = 0; i < data.length; i++) {
          out.push(('0' + data.charCodeAt(i).toString(16)).substr(-2, 2));
        }
        return out.join('');
      },
      createHash: function createHash(algorithm) {
        return cryptoLib.createHash(algorithm);
      }
    },
    abort: {},
    each: function each(object, iterFunction) {
      for (var key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          var ret = iterFunction.call(this, key, object[key]);
          if (ret === util.abort)
            break;
        }
      }
    },
    arrayEach: function arrayEach(array, iterFunction) {
      for (var idx in array) {
        if (array.hasOwnProperty(idx)) {
          var ret = iterFunction.call(this, array[idx], parseInt(idx, 10));
          if (ret === util.abort)
            break;
        }
      }
    },
    update: function update(obj1, obj2) {
      util.each(obj2, function iterator(key, item) {
        obj1[key] = item;
      });
      return obj1;
    },
    merge: function merge(obj1, obj2) {
      return util.update(util.copy(obj1), obj2);
    },
    copy: function copy(object) {
      if (object === null || object === undefined)
        return object;
      var dupe = {};
      for (var key in object) {
        dupe[key] = object[key];
      }
      return dupe;
    },
    isEmpty: function isEmpty(obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          return false;
        }
      }
      return true;
    },
    arraySliceFn: function arraySliceFn(obj) {
      var fn = obj.slice || obj.webkitSlice || obj.mozSlice;
      return typeof fn === 'function' ? fn : null;
    },
    isType: function isType(obj, type) {
      if (typeof type === 'function')
        type = util.typeName(type);
      return Object.prototype.toString.call(obj) === '[object ' + type + ']';
    },
    typeName: function typeName(type) {
      if (type.hasOwnProperty('name'))
        return type.name;
      var str = type.toString();
      var match = str.match(/^\s*function (.+)\(/);
      return match ? match[1] : str;
    },
    error: function error(err, options) {
      var originalError = null;
      if (typeof err.message === 'string' && err.message !== '') {
        if (typeof options === 'string' || (options && options.message)) {
          originalError = util.copy(err);
          originalError.message = err.message;
        }
      }
      err.message = err.message || null;
      if (typeof options === 'string') {
        err.message = options;
      } else if (typeof options === 'object' && options !== null) {
        util.update(err, options);
        if (options.message)
          err.message = options.message;
        if (options.code || options.name)
          err.code = options.code || options.name;
        if (options.stack)
          err.stack = options.stack;
      }
      if (typeof Object.defineProperty === 'function') {
        Object.defineProperty(err, 'name', {
          writable: true,
          enumerable: false
        });
        Object.defineProperty(err, 'message', {enumerable: true});
      }
      err.name = options && options.name || err.name || err.code || 'Error';
      err.time = new Date();
      if (originalError)
        err.originalError = originalError;
      return err;
    },
    inherit: function inherit(klass, features) {
      var newObject = null;
      if (features === undefined) {
        features = klass;
        klass = Object;
        newObject = {};
      } else {
        var ctor = function ConstructorWrapper() {};
        ctor.prototype = klass.prototype;
        newObject = new ctor();
      }
      if (features.constructor === Object) {
        features.constructor = function() {
          if (klass !== Object) {
            return klass.apply(this, arguments);
          }
        };
      }
      features.constructor.prototype = newObject;
      util.update(features.constructor.prototype, features);
      features.constructor.__super__ = klass;
      return features.constructor;
    },
    mixin: function mixin() {
      var klass = arguments[0];
      for (var i = 1; i < arguments.length; i++) {
        for (var prop in arguments[i].prototype) {
          var fn = arguments[i].prototype[prop];
          if (prop !== 'constructor') {
            klass.prototype[prop] = fn;
          }
        }
      }
      return klass;
    },
    hideProperties: function hideProperties(obj, props) {
      if (typeof Object.defineProperty !== 'function')
        return;
      util.arrayEach(props, function(key) {
        Object.defineProperty(obj, key, {
          enumerable: false,
          writable: true,
          configurable: true
        });
      });
    },
    property: function property(obj, name, value, enumerable, isValue) {
      var opts = {
        configurable: true,
        enumerable: enumerable !== undefined ? enumerable : true
      };
      if (typeof value === 'function' && !isValue) {
        opts.get = value;
      } else {
        opts.value = value;
        opts.writable = true;
      }
      Object.defineProperty(obj, name, opts);
    },
    memoizedProperty: function memoizedProperty(obj, name, get, enumerable) {
      var cachedValue = null;
      util.property(obj, name, function() {
        if (cachedValue === null) {
          cachedValue = get();
        }
        return cachedValue;
      }, enumerable);
    },
    hoistPayloadMember: function hoistPayloadMember(resp) {
      var req = resp.request;
      var operation = req.operation;
      var output = req.service.api.operations[operation].output;
      if (output.payload) {
        var payloadMember = output.members[output.payload];
        var responsePayload = resp.data[output.payload];
        if (payloadMember.type === 'structure') {
          util.each(responsePayload, function(key, value) {
            util.property(resp.data, key, value, false);
          });
        }
      }
    },
    computeSha256: function computeSha256(body, done) {
      if (util.isNode()) {
        var Stream = util.nodeRequire('stream').Stream;
        var fs = util.nodeRequire('fs');
        if (body instanceof Stream) {
          if (typeof body.path === 'string') {
            body = fs.createReadStream(body.path);
          } else {
            return done(new Error('Non-file stream objects are ' + 'not supported with SigV4'));
          }
        }
      }
      util.crypto.sha256(body, 'hex', function(err, sha) {
        if (err)
          done(err);
        else
          done(null, sha);
      });
    },
    isClockSkewed: function isClockSkewed(serverTime) {
      if (serverTime) {
        util.property(AWS.config, 'isClockSkewed', Math.abs(new Date().getTime() - serverTime) >= 300000, false);
        return AWS.config.isClockSkewed;
      }
    },
    applyClockOffset: function applyClockOffset(serverTime) {
      if (serverTime)
        AWS.config.systemClockOffset = serverTime - new Date().getTime();
    },
    extractRequestId: function extractRequestId(resp) {
      var requestId = resp.httpResponse.headers['x-amz-request-id'] || resp.httpResponse.headers['x-amzn-requestid'];
      if (!requestId && resp.data && resp.data.ResponseMetadata) {
        requestId = resp.data.ResponseMetadata.RequestId;
      }
      if (requestId) {
        resp.requestId = requestId;
      }
      if (resp.error) {
        resp.error.requestId = requestId;
      }
    }
  };
  module.exports = util;
})(require('buffer').Buffer, require('process'));
