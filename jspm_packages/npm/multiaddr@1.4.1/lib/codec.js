/* */ 
(function(Buffer) {
  'use strict';
  var map = require('lodash.map');
  var filter = require('lodash.filter');
  var convert = require('./convert');
  var protocols = require('./protocols');
  var varint = require('varint');
  module.exports = {
    stringToStringTuples: stringToStringTuples,
    stringTuplesToString: stringTuplesToString,
    tuplesToStringTuples: tuplesToStringTuples,
    stringTuplesToTuples: stringTuplesToTuples,
    bufferToTuples: bufferToTuples,
    tuplesToBuffer: tuplesToBuffer,
    bufferToString: bufferToString,
    stringToBuffer: stringToBuffer,
    fromString: fromString,
    fromBuffer: fromBuffer,
    validateBuffer: validateBuffer,
    isValidBuffer: isValidBuffer,
    cleanPath: cleanPath,
    ParseError: ParseError,
    protoFromTuple: protoFromTuple,
    sizeForAddr: sizeForAddr
  };
  function stringToStringTuples(str) {
    var tuples = [];
    var parts = str.split('/').slice(1);
    if (parts.length === 1 && parts[0] === '') {
      return [];
    }
    for (var p = 0; p < parts.length; p++) {
      var part = parts[p];
      var proto = protocols(part);
      if (proto.size === 0) {
        tuples.push([part]);
        continue;
      }
      p++;
      if (p >= parts.length) {
        throw ParseError('invalid address: ' + str);
      }
      tuples.push([part, parts[p]]);
    }
    return tuples;
  }
  function stringTuplesToString(tuples) {
    var parts = [];
    map(tuples, function(tup) {
      var proto = protoFromTuple(tup);
      parts.push(proto.name);
      if (tup.length > 1) {
        parts.push(tup[1]);
      }
    });
    return '/' + parts.join('/');
  }
  function stringTuplesToTuples(tuples) {
    return map(tuples, function(tup) {
      if (!Array.isArray(tup)) {
        tup = [tup];
      }
      var proto = protoFromTuple(tup);
      if (tup.length > 1) {
        return [proto.code, convert.toBuffer(proto.code, tup[1])];
      }
      return [proto.code];
    });
  }
  function tuplesToStringTuples(tuples) {
    return map(tuples, function(tup) {
      var proto = protoFromTuple(tup);
      if (tup.length > 1) {
        return [proto.code, convert.toString(proto.code, tup[1])];
      }
      return [proto.code];
    });
  }
  function tuplesToBuffer(tuples) {
    return fromBuffer(Buffer.concat(map(tuples, function(tup) {
      var proto = protoFromTuple(tup);
      var buf = new Buffer(varint.encode(proto.code));
      if (tup.length > 1) {
        buf = Buffer.concat([buf, tup[1]]);
      }
      return buf;
    })));
  }
  function sizeForAddr(p, addr) {
    if (p.size > 0) {
      return p.size / 8;
    } else if (p.size === 0) {
      return 0;
    } else {
      var size = varint.decode(addr);
      return size + varint.decode.bytes;
    }
  }
  function bufferToTuples(buf) {
    var tuples = [];
    var i = 0;
    while (i < buf.length) {
      var code = varint.decode(buf, i);
      var n = varint.decode.bytes;
      var p = protocols(code);
      var size = sizeForAddr(p, buf.slice(i + n));
      if (size === 0) {
        tuples.push([code]);
        i += n;
        continue;
      }
      var addr = buf.slice(i + n, i + n + size);
      i += size + n;
      if (i > buf.length) {
        throw ParseError('Invalid address buffer: ' + buf.toString('hex'));
      }
      tuples.push([code, addr]);
    }
    return tuples;
  }
  function bufferToString(buf) {
    var a = bufferToTuples(buf);
    var b = tuplesToStringTuples(a);
    return stringTuplesToString(b);
  }
  function stringToBuffer(str) {
    str = cleanPath(str);
    var a = stringToStringTuples(str);
    var b = stringTuplesToTuples(a);
    return tuplesToBuffer(b);
  }
  function fromString(str) {
    return stringToBuffer(str);
  }
  function fromBuffer(buf) {
    var err = validateBuffer(buf);
    if (err)
      throw err;
    return new Buffer(buf);
  }
  function validateBuffer(buf) {
    try {
      bufferToTuples(buf);
    } catch (err) {
      return err;
    }
  }
  function isValidBuffer(buf) {
    return validateBuffer(buf) === undefined;
  }
  function cleanPath(str) {
    return '/' + filter(str.trim().split('/')).join('/');
  }
  function ParseError(str) {
    return new Error('Error parsing address: ' + str);
  }
  function protoFromTuple(tup) {
    var proto = protocols(tup[0]);
    return proto;
  }
})(require('buffer').Buffer);
