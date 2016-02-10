/* */ 
(function(Buffer, process) {
  "use strict";
  var Emitter = require('events').EventEmitter,
      debug = require('debug')('knox'),
      utils = require('./utils'),
      auth = require('./auth'),
      http = require('http'),
      https = require('https'),
      url = require('url'),
      mime = require('mime'),
      fs = require('fs'),
      crypto = require('crypto'),
      once = require('once'),
      xml2js = require('xml2js'),
      StreamCounter = require('stream-counter'),
      qs = require('querystring');
  var BUCKET_OPS_MAX = 1000;
  var MIN_BUCKET_LENGTH = 3;
  var MAX_NON_US_STANDARD_BUCKET_LENGTH = 63;
  var MAX_US_STANDARD_BUCKET_LENGTH = 255;
  var US_STANDARD_BUCKET = /^[A-Za-z0-9\._-]*$/;
  var BUCKET_LABEL = /^(?:[a-z0-9][a-z0-9-]*[a-z0-9]|[a-z0-9])$/;
  var IPV4_ADDRESS = /^(\d{1,3}\.){3}(\d{1,3})$/;
  function registerReqListeners(req, fn) {
    req.on('response', function(res) {
      fn(null, res);
    });
    req.on('error', fn);
  }
  function ensureLeadingSlash(filename) {
    return filename[0] !== '/' ? '/' + filename : filename;
  }
  function removeLeadingSlash(filename) {
    return filename[0] === '/' ? filename.substring(1) : filename;
  }
  function encodeSpecialCharacters(filename) {
    return encodeURI(filename).replace(/[!'()#*+? ]/g, function(char) {
      return '%' + char.charCodeAt(0).toString(16);
    });
  }
  function getHeader(headers, headerNameLowerCase) {
    for (var header in headers) {
      if (header.toLowerCase() === headerNameLowerCase) {
        return headers[header];
      }
    }
    return null;
  }
  function isNotDnsCompliant(bucket) {
    if (bucket.length > MAX_NON_US_STANDARD_BUCKET_LENGTH) {
      return 'is more than ' + MAX_NON_US_STANDARD_BUCKET_LENGTH + ' characters';
    }
    if (IPV4_ADDRESS.test(bucket)) {
      return 'is formatted as an IPv4 address';
    }
    var bucketLabels = bucket.split('.');
    var bucketLabelsAreValid = bucketLabels.every(function(label) {
      return BUCKET_LABEL.test(label);
    });
    if (!bucketLabelsAreValid) {
      return 'does not consist of valid period-separated labels';
    }
    return false;
  }
  function isInvalid(bucket) {
    if (bucket.length < MIN_BUCKET_LENGTH) {
      return 'is less than ' + MIN_BUCKET_LENGTH + ' characters';
    }
    if (bucket.length > MAX_US_STANDARD_BUCKET_LENGTH) {
      return 'is more than ' + MAX_US_STANDARD_BUCKET_LENGTH + ' characters';
    }
    if (!US_STANDARD_BUCKET.test(bucket)) {
      return 'contains invalid characters';
    }
    return false;
  }
  function containsPeriod(bucket) {
    return bucket.indexOf('.') !== -1;
  }
  function autoDetermineStyle(options) {
    if (!options.style && options.secure !== false && containsPeriod(options.bucket)) {
      options.style = 'path';
      return;
    }
    var dnsUncompliance = isNotDnsCompliant(options.bucket);
    if (dnsUncompliance) {
      if (options.style === 'virtualHosted') {
        throw new Error('Cannot use "virtualHosted" style with a ' + 'DNS-uncompliant bucket name: "' + options.bucket + '" is ' + dnsUncompliance + '.');
      }
      options.style = 'path';
      return;
    }
    if (!options.style) {
      options.style = 'virtualHosted';
    }
  }
  function getCopyHeaders(sourceBucket, sourceFilename, headers) {
    sourceFilename = encodeSpecialCharacters(ensureLeadingSlash(sourceFilename));
    headers = utils.merge({}, headers || {});
    headers['x-amz-copy-source'] = '/' + sourceBucket + sourceFilename;
    headers['Content-Length'] = 0;
    return headers;
  }
  var Client = module.exports = exports = function Client(options) {
    console.log("new client:", options)
    if (!options.key)
      throw new Error('aws "key" required');
    if (!options.secret)
      throw new Error('aws "secret" required');
    if (!options.bucket)
      throw new Error('aws "bucket" required');
    if (options.style && options.style !== 'virtualHosted' && options.style !== 'path') {
      throw new Error('style must be "virtualHosted" or "path"');
    }
    if (options.port !== undefined && isNaN(parseInt(options.port))) {
      throw new Error('port must be a number.');
    }
    var invalidness = isInvalid(options.bucket);
    var dnsUncompliance = isNotDnsCompliant(options.bucket);
    if (invalidness) {
      throw new Error('Bucket name "' + options.bucket + '" ' + invalidness + '.');
    }
    this.options = utils.merge({}, options);
    options = utils.merge({}, options);
    autoDetermineStyle(options);
    if (!options.endpoint) {
      if (!options.region || options.region === 'us-standard' || options.region === 'us-east-1') {
        options.endpoint = 's3.amazonaws.com';
        options.region = 'us-standard';
      } else {
        options.endpoint = 's3-' + options.region + '.amazonaws.com';
      }
      if (options.region !== 'us-standard') {
        if (dnsUncompliance) {
          throw new Error('Outside of the us-standard region, bucket names must' + ' be DNS-compliant. The name "' + options.bucket + '" ' + dnsUncompliance + '.');
        }
      }
    } else {
      options.region = undefined;
    }
    var portSuffix = 'undefined' == typeof options.port ? "" : ":" + options.port;
    this.secure = 'undefined' == typeof options.port;
    if (options.style === 'virtualHosted') {
      this.host = options.bucket + '.' + options.endpoint;
      this.urlBase = options.bucket + '.' + options.endpoint + portSuffix;
    } else {
      this.host = options.endpoint;
      this.urlBase = options.endpoint + portSuffix + '/' + options.bucket;
    }
    this.agent = false;
    utils.merge(this, options);
    this.url = this.secure ? this.https : this.http;
  };
  Client.prototype.request = function(method, filename, headers) {
    var options = {
      hostname: this.host,
      agent: this.agent,
      port: this.port
    },
        date = new Date,
        headers = headers || {},
        fixedFilename = ensureLeadingSlash(filename);
    headers.Date = date.toUTCString();
    if (this.style === 'virtualHosted') {
      headers.Host = this.host;
    }
    if ('undefined' != typeof this.token)
      headers['x-amz-security-token'] = this.token;
    headers.Authorization = auth.authorization({
      key: this.key,
      secret: this.secret,
      verb: method,
      date: date,
      resource: auth.canonicalizeResource('/' + this.bucket + fixedFilename),
      contentType: getHeader(headers, 'content-type'),
      md5: getHeader(headers, 'content-md5') || '',
      amazonHeaders: auth.canonicalizeHeaders(headers)
    });
    var pathPrefix = this.style === 'path' ? '/' + this.bucket : '';
    options.method = method;
    options.path = pathPrefix + fixedFilename;
    options.headers = headers;
    var req = (this.secure ? https : http).request(options);
    req.url = this.url(filename);
    console.log("headers:", headers)
    debug('%s %s', method, req.url);
    return req;
  };
  Client.prototype.put = function(filename, headers) {
    headers = utils.merge({}, headers || {});
    return this.request('PUT', encodeSpecialCharacters(filename), headers);
  };
  Client.prototype.putFile = function(src, filename, headers, fn) {
    var self = this;
    var emitter = new Emitter;
    if ('function' == typeof headers) {
      fn = headers;
      headers = {};
    }
    debug('put %s', src);
    fs.stat(src, function(err, stat) {
      if (err)
        return fn(err);
      var contentType = mime.lookup(src);
      var charset = mime.charsets.lookup(contentType);
      if (charset) {
        contentType += '; charset=' + charset;
      }
      headers = utils.merge({
        'Content-Length': stat.size,
        'Content-Type': contentType
      }, headers);
      var stream = fs.createReadStream(src);
      var req = self.putStream(stream, filename, headers, fn);
      req.on('progress', emitter.emit.bind(emitter, 'progress'));
    });
    return emitter;
  };
  Client.prototype.putStream = function(stream, filename, headers, fn) {
    var contentLength = getHeader(headers, 'content-length');
    if (contentLength === null) {
      process.nextTick(function() {
        fn(new Error('You must specify a Content-Length header.'));
      });
      return;
    }
    var self = this;
    var req = self.put(filename, headers);
    fn = once(fn);
    registerReqListeners(req, fn);
    stream.on('error', fn);
    var counter = new StreamCounter();
    counter.on('progress', function() {
      req.emit('progress', {
        percent: counter.bytes / contentLength * 100 | 0,
        written: counter.bytes,
        total: contentLength
      });
    });
    stream.pipe(counter);
    stream.pipe(req);
    return req;
  };
  Client.prototype.putBuffer = function(buffer, filename, headers, fn) {
    if ('function' == typeof headers) {
      fn = headers;
      headers = {};
    }
    headers['Content-Length'] = buffer.length;
    var req = this.put(filename, headers);
    fn = once(fn);
    registerReqListeners(req, fn);
    req.end(buffer);
    return req;
  };
  Client.prototype.copy = function(sourceFilename, destFilename, headers) {
    return this.put(destFilename, getCopyHeaders(this.bucket, sourceFilename, headers));
  };
  Client.prototype.copyFile = function(sourceFilename, destFilename, headers, fn) {
    if ('function' == typeof headers) {
      fn = headers;
      headers = {};
    }
    var req = this.copy(sourceFilename, destFilename, headers);
    fn = once(fn);
    registerReqListeners(req, fn);
    req.end();
    return req;
  };
  Client.prototype.copyTo = function(sourceFilename, destBucket, destFilename, headers) {
    var options = utils.merge({}, this.options);
    if (typeof destBucket == 'string') {
      options.bucket = destBucket;
    } else {
      utils.merge(options, destBucket);
    }
    var client = exports.createClient(options);
    return client.put(destFilename, getCopyHeaders(this.bucket, sourceFilename, headers));
  };
  Client.prototype.copyFileTo = function(sourceFilename, destBucket, destFilename, headers, fn) {
    if ('function' == typeof headers) {
      fn = headers;
      headers = {};
    }
    var req = this.copyTo(sourceFilename, destBucket, destFilename, headers);
    fn = once(fn);
    registerReqListeners(req, fn);
    req.end();
    return req;
  };
  Client.prototype.get = function(filename, headers) {
    return this.request('GET', encodeSpecialCharacters(filename), headers);
  };
  Client.prototype.getFile = function(filename, headers, fn) {
    if ('function' == typeof headers) {
      fn = headers;
      headers = {};
    }
    var req = this.get(filename, headers);
    registerReqListeners(req, fn);
    req.end();
    return req;
  };
  Client.prototype.head = function(filename, headers) {
    return this.request('HEAD', encodeSpecialCharacters(filename), headers);
  };
  Client.prototype.headFile = function(filename, headers, fn) {
    if ('function' == typeof headers) {
      fn = headers;
      headers = {};
    }
    var req = this.head(filename, headers);
    fn = once(fn);
    registerReqListeners(req, fn);
    req.end();
    return req;
  };
  Client.prototype.del = function(filename, headers) {
    return this.request('DELETE', encodeSpecialCharacters(filename), headers);
  };
  Client.prototype.deleteFile = function(filename, headers, fn) {
    if ('function' == typeof headers) {
      fn = headers;
      headers = {};
    }
    var req = this.del(filename, headers);
    fn = once(fn);
    registerReqListeners(req, fn);
    req.end();
    return req;
  };
  function xmlEscape(string) {
    return string.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function makeDeleteXmlBuffer(keys) {
    var tags = keys.map(function(key) {
      return '<Object><Key>' + xmlEscape(removeLeadingSlash(key)) + '</Key></Object>';
    });
    return new Buffer('<?xml version="1.0" encoding="UTF-8"?>' + '<Delete>' + tags.join('') + '</Delete>', 'utf8');
  }
  Client.prototype.deleteMultiple = function(filenames, headers, fn) {
    if (filenames.length > BUCKET_OPS_MAX) {
      throw new Error('Can only delete up to ' + BUCKET_OPS_MAX + ' files ' + 'at a time. You\'ll need to batch them.');
    }
    if ('function' == typeof headers) {
      fn = headers;
      headers = {};
    }
    var xml = makeDeleteXmlBuffer(filenames);
    headers['Content-Length'] = xml.length;
    headers['Content-MD5'] = crypto.createHash('md5').update(xml).digest('base64');
    var req = this.request('POST', '/?delete', headers);
    fn = once(fn);
    registerReqListeners(req, fn);
    req.end(xml);
    return req;
  };
  var LIST_PARAMS = {
    delimiter: true,
    marker: true,
    'max-keys': true,
    prefix: true
  };
  var RESPONSE_NORMALIZATION = {
    MaxKeys: Number,
    IsTruncated: Boolean,
    LastModified: Date,
    Size: Number,
    Contents: Array,
    CommonPrefixes: Array
  };
  function normalizeResponse(data) {
    for (var key in data) {
      var Constr = RESPONSE_NORMALIZATION[key];
      if (Constr) {
        if (Constr === Date) {
          data[key] = new Date(data[key]);
        } else if (Constr === Array) {
          if (!Array.isArray(data[key])) {
            data[key] = [data[key]];
          }
        } else if (Constr === Boolean) {
          data[key] = data[key] === 'true';
        } else {
          data[key] = Constr(data[key]);
        }
      }
      if (Array.isArray(data[key])) {
        data[key].forEach(normalizeResponse);
      }
    }
  }
  Client.prototype.list = function(params, headers, fn) {
    if ('function' == typeof headers) {
      fn = headers;
      headers = {};
    }
    if ('function' == typeof params) {
      fn = params;
      params = null;
    }
    if (params && !LIST_PARAMS[Object.keys(params)[0]]) {
      headers = params;
      params = null;
    }
    var url = params ? '?' + qs.stringify(params) : '';
    var req = this.request('GET', url, headers);
    registerReqListeners(req, function(err, res) {
      if (err)
        return fn(err);
      var xmlStr = '';
      res.on('data', function(chunk) {
        xmlStr += chunk;
      });
      res.on('end', function() {
        new xml2js.Parser({
          explicitArray: false,
          explicitRoot: false
        }).parseString(xmlStr, function(err, data) {
          if (err)
            return fn(err);
          if (data == null)
            return fn(new Error('null response received'));
          delete data.$;
          normalizeResponse(data);
          if (!('Contents' in data)) {
            data.Contents = [];
          }
          fn(null, data);
        });
      });
    });
    req.on('error', fn);
    req.end();
    return req;
  };
  Client.prototype.http = function(filename) {
    filename = encodeSpecialCharacters(ensureLeadingSlash(filename));
    return 'http://' + this.urlBase + filename;
  };
  Client.prototype.https = function(filename) {
    filename = encodeSpecialCharacters(ensureLeadingSlash(filename));
    return 'https://' + this.urlBase + filename;
  };
  Client.prototype.signedUrl = function(filename, expiration, options) {
    var epoch = Math.floor(expiration.getTime() / 1000),
        pathname = url.parse(filename).pathname,
        resource = '/' + this.bucket + ensureLeadingSlash(pathname);
    if (options && options.qs) {
      resource += '?' + decodeURIComponent(qs.stringify(options.qs));
    }
    var signature = auth.signQuery({
      secret: this.secret,
      date: epoch,
      resource: resource,
      verb: (options && options.verb) || 'GET',
      contentType: options && options.contentType,
      extraHeaders: options && options.extraHeaders,
      token: this.token
    });
    var queryString = qs.stringify(utils.merge({
      Expires: epoch,
      AWSAccessKeyId: this.key,
      Signature: signature
    }, (options && options.qs) || {}));
    if (typeof this.token !== 'undefined')
      queryString += '&x-amz-security-token=' + encodeURIComponent(this.token);
    return this.url(filename) + '?' + queryString;
  };
  exports.createClient = function(options) {
    return new Client(options);
  };
})(require('buffer').Buffer, require('process'));
