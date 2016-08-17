/* */ 
'use strict';
var _promise = require('babel-runtime/core-js/promise');
var _promise2 = _interopRequireDefault(_promise);
var _typeof2 = require('babel-runtime/helpers/typeof');
var _typeof3 = _interopRequireDefault(_typeof2);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
var Wreck = require('wreck');
var Qs = require('qs');
var ndjson = require('ndjson');
var getFilesStream = require('./get-files-stream');
var isNode = require('detect-node');
function parseChunkedJson(res, cb) {
  var parsed = [];
  res.pipe(ndjson.parse()).on('data', parsed.push.bind(parsed)).on('end', function() {
    return cb(null, parsed);
  });
}
function onRes(buffer, cb) {
  return function(err, res) {
    if (err) {
      return cb(err);
    }
    var stream = Boolean(res.headers['x-stream-output']);
    var chunkedObjects = Boolean(res.headers['x-chunked-output']);
    var isJson = res.headers['content-type'] && res.headers['content-type'].indexOf('application/json') === 0;
    if (res.statusCode >= 400 || !res.statusCode) {
      var _ret = function() {
        var error = new Error('Server responded with ' + res.statusCode);
        return {v: Wreck.read(res, {json: true}, function(err, payload) {
            if (err) {
              return cb(err);
            }
            if (payload) {
              error.code = payload.Code;
              error.message = payload.Message || payload.toString();
            }
            cb(error);
          })};
      }();
      if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object")
        return _ret.v;
    }
    if (stream && !buffer)
      return cb(null, res);
    if (chunkedObjects) {
      if (isJson)
        return parseChunkedJson(res, cb);
      return Wreck.read(res, null, cb);
    }
    Wreck.read(res, {json: isJson}, cb);
  };
}
function requestAPI(config, path, args, qs, files, buffer, cb) {
  qs = qs || {};
  if (Array.isArray(path))
    path = path.join('/');
  if (args && !Array.isArray(args))
    args = [args];
  if (args)
    qs.arg = args;
  if (files && !Array.isArray(files))
    files = [files];
  if (qs.r) {
    qs.recursive = qs.r;
    delete qs.r;
  }
  if (!isNode && qs.recursive && path === 'add') {
    return cb(new Error('Recursive uploads are not supported in the browser'));
  }
  qs['stream-channels'] = true;
  var stream = void 0;
  if (files) {
    stream = getFilesStream(files, qs);
  }
  delete qs.followSymlinks;
  var port = config.port ? ':' + config.port : '';
  var opts = {
    method: files ? 'POST' : 'GET',
    uri: config.protocol + '://' + config.host + port + config['api-path'] + path + '?' + Qs.stringify(qs, {arrayFormat: 'repeat'}),
    headers: {}
  };
  if (isNode) {
    opts.headers['User-Agent'] = config['user-agent'];
  }
  if (files) {
    if (!stream.boundary) {
      return cb(new Error('No boundary in multipart stream'));
    }
    opts.headers['Content-Type'] = 'multipart/form-data; boundary=' + stream.boundary;
    opts.downstreamRes = stream;
    opts.payload = stream;
  }
  return Wreck.request(opts.method, opts.uri, opts, onRes(buffer, cb));
}
exports = module.exports = function getRequestAPI(config) {
  return function(path, args, qs, files, buffer, cb) {
    if (typeof buffer === 'function') {
      cb = buffer;
      buffer = false;
    }
    if (typeof cb !== 'function' && typeof _promise2.default !== 'undefined') {
      return new _promise2.default(function(resolve, reject) {
        requestAPI(config, path, args, qs, files, buffer, function(err, res) {
          if (err)
            return reject(err);
          resolve(res);
        });
      });
    }
    return requestAPI(config, path, args, qs, files, buffer, cb);
  };
};
