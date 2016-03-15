/* */ 
(function(Buffer) {
  "use strict";
  var _slicedToArray = function(arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      var _arr = [];
      for (var _iterator = arr[Symbol.iterator](),
          _step; !(_step = _iterator.next()).done; ) {
        _arr.push(_step.value);
        if (i && _arr.length === i)
          break;
      }
      return _arr;
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
  var _toConsumableArray = function(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0,
          arr2 = Array(arr.length); i < arr.length; i++)
        arr2[i] = arr[i];
      return arr2;
    } else {
      return Array.from(arr);
    }
  };
  var _prototypeProperties = function(child, staticProps, instanceProps) {
    if (staticProps)
      Object.defineProperties(child, staticProps);
    if (instanceProps)
      Object.defineProperties(child.prototype, instanceProps);
  };
  var _get = function get(object, property, receiver) {
    var desc = Object.getOwnPropertyDescriptor(object, property);
    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);
      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc && desc.writable) {
      return desc.value;
    } else {
      var getter = desc.get;
      if (getter === undefined) {
        return undefined;
      }
      return getter.call(receiver);
    }
  };
  var _inherits = function(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      subClass.__proto__ = superClass;
  };
  var _classCallCheck = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  var _abstractLeveldown = require('abstract-leveldown');
  var AbstractLevelDOWN = _abstractLeveldown.AbstractLevelDOWN;
  var AbstractIterator = _abstractLeveldown.AbstractIterator;
  var serialize = function(value) {
    if (value == null || value === "")
      return {NULL: true};
    var type = value.constructor.name;
    var reduce = function(value) {
      return Object.keys(value).reduce(function(acc, key) {
        acc[key] = serialize(value[key]);
        return acc;
      }, {});
    };
    switch (type) {
      case "String":
        return {S: value};
      case "Buffer":
        return {B: value.toString("base64")};
      case "Boolean":
        return {BOOL: value};
      case "Number":
        return {N: String(value)};
      case "Array":
        return {L: value.map(serialize)};
      case "Object":
        return {M: reduce(value)};
      default:
        throw new Error("Cannot serialize " + type);
    }
  };
  var parse = function(val) {
    var type = Object.keys(val)[0];
    var value = val[type];
    var reduce = function(value) {
      return Object.keys(value).reduce(function(acc, key) {
        acc[key] = parse(value[key]);
        return acc;
      }, {});
    };
    switch (type) {
      case "NULL":
        return null;
      case "S":
        return value;
      case "B":
        return Buffer(value, "base64");
      case "BOOL":
        return value;
      case "N":
        return parseFloat(value, 10);
      case "L":
        return value.map(parse);
      case "M":
        return reduce(value);
      default:
        throw new Error("Cannot parse " + type + ".");
    }
  };
  var DynamoIterator = (function(AbstractIterator) {
    function DynamoIterator(db, options) {
      _classCallCheck(this, DynamoIterator);
      _get(Object.getPrototypeOf(DynamoIterator.prototype), "constructor", this).call(this, db);
      this._limit = Infinity;
      if (options.limit !== -1)
        this._limit = options.limit;
      this._reverse = false;
      if (options.reverse === true)
        this._reverse = true;
      if ("gt" in options || "gte" in options) {
        this._lowerBound = {
          key: options.gt || options.gte,
          inclusive: "gte" in options
        };
      }
      if ("lt" in options || "lte" in options) {
        this._upperBound = {
          key: options.lt || options.lte,
          inclusive: "lte" in options
        };
      }
      this._params = {
        TableName: this.db._table.name,
        KeyConditions: {}
      };
      if (this._limit !== Infinity)
        this._params.Limit = this._limit;
      if (this._reverse)
        this._params.ScanIndexForward = false;
      this._params.KeyConditions[this.db._schema.hash.name] = {
        ComparisonOperator: "EQ",
        AttributeValueList: [serialize(this.db._schema.hash.value)]
      };
      if (this._lowerBound && this._upperBound) {
        this._params.KeyConditions[this.db._schema.range.name] = {
          ComparisonOperator: "BETWEEN",
          AttributeValueList: [serialize(this._lowerBound.key), serialize(this._upperBound.key)]
        };
      } else if (this._lowerBound) {
        this._params.KeyConditions[this.db._schema.range.name] = {
          ComparisonOperator: this._lowerBound.inclusive ? "GE" : "GT",
          AttributeValueList: [serialize(this._lowerBound.key)]
        };
      } else if (this._upperBound) {
        this._params.KeyConditions[this.db._schema.range.name] = {
          ComparisonOperator: this._upperBound.inclusive ? "LE" : "LT",
          AttributeValueList: [serialize(this._upperBound.key)]
        };
      }
      this._items = [];
      this._cursor = 0;
    }
    _inherits(DynamoIterator, AbstractIterator);
    _prototypeProperties(DynamoIterator, null, {_next: {
        value: function _next(cb) {
          var _this = this;
          var item = this._items[this._cursor];
          if (item) {
            setImmediate(cb, null, item.key, JSON.stringify(item.value));
            delete this._items[this._cursor];
            this._cursor++;
            return;
          }
          if (item === null || this._cursor === this._limit) {
            setImmediate(cb);
            return;
          }
          this.db._dynamo.query(this._params, function(err, data) {
            if (err)
              return cb(err);
            var Items = data.Items;
            var LastEvaluatedKey = data.LastEvaluatedKey;
            for (var _iterator = Items[Symbol.iterator](),
                _step; !(_step = _iterator.next()).done; ) {
              var _item = _step.value;
              _this._items.push(_this.db._toKV(_item));
            }
            if (!LastEvaluatedKey)
              _this._items.push(null);
            _this._params.ExclusiveStartKey = LastEvaluatedKey;
            _this._next(cb);
          });
        },
        writable: true,
        configurable: true
      }});
    return DynamoIterator;
  })(AbstractIterator);
  var DynamoDOWN = (function(AbstractLevelDOWN) {
    function DynamoDOWN(dynamo, location) {
      _classCallCheck(this, DynamoDOWN);
      _get(Object.getPrototypeOf(DynamoDOWN.prototype), "constructor", this).call(this, location);
      var _location$split = location.split("/");
      var _location$split2 = _slicedToArray(_location$split, 2);
      var table = _location$split2[0];
      var hash = _location$split2[1];
      this._dynamo = dynamo;
      this._table = {name: table};
      this._schema = {
        hash: {value: hash},
        range: {}
      };
    }
    _inherits(DynamoDOWN, AbstractLevelDOWN);
    _prototypeProperties(DynamoDOWN, null, {
      _toItem: {
        value: function _toItem(_ref) {
          var key = _ref.key;
          var value = _ref.value;
          var item = value ? JSON.parse(value) : {};
          item[this._schema.hash.name] = this._schema.hash.value;
          item[this._schema.range.name] = key;
          return serialize(item).M;
        },
        writable: true,
        configurable: true
      },
      _toKV: {
        value: function _toKV(item) {
          var value = parse({M: item});
          var key = value[this._schema.range.name];
          delete value[this._schema.range.name];
          delete value[this._schema.hash.name];
          return {
            key: key,
            value: value
          };
        },
        writable: true,
        configurable: true
      },
      _open: {
        value: function _open(options, cb) {
          var _this = this;
          var params = {TableName: this._table.name};
          var ontable = function(err, data) {
            if (err)
              return cb(err);
            for (var _iterator = data.Table.KeySchema[Symbol.iterator](),
                _step; !(_step = _iterator.next()).done; ) {
              var _step$value = _step.value;
              var KeyType = _step$value.KeyType;
              var AttributeName = _step$value.AttributeName;
              _this._schema[KeyType.toLowerCase()].name = AttributeName;
            }
            cb();
          };
          this._dynamo.describeTable(params, ontable);
        },
        writable: true,
        configurable: true
      },
      _get: {
        value: function _get(key, options, cb) {
          var _this = this;
          var TableName = this._table.name;
          var valueEncoding = options.valueEncoding;
          var Key = this._toItem({key: key});
          var params = {
            TableName: TableName,
            Key: Key
          };
          this._dynamo.getItem(params, function(err, data) {
            if (err)
              return cb(err);
            if (!data.Item)
              return cb(new Error("NotFound"));
            var _toKV = _this._toKV(data.Item);
            var value = _toKV.value;
            var isValue = valueEncoding !== "json";
            var item = isValue ? value.value : JSON.stringify(value);
            if (options.asBuffer !== false)
              item = new Buffer(item);
            cb(null, item);
          });
        },
        writable: true,
        configurable: true
      },
      _put: {
        value: function _put(key, value, options, cb) {
          var TableName = this._table.name;
          var valueEncoding = options.valueEncoding;
          var Item = this._toItem({
            key: key,
            value: value
          });
          var params = {
            TableName: TableName,
            Item: Item
          };
          this._dynamo.putItem(params, function(err) {
            return cb(err);
          });
        },
        writable: true,
        configurable: true
      },
      _del: {
        value: function _del(key, options, cb) {
          var TableName = this._table.name;
          var Key = this._toItem({key: key});
          var params = {
            TableName: TableName,
            Key: Key
          };
          this._dynamo.deleteItem(params, function(err) {
            return cb(err);
          });
        },
        writable: true,
        configurable: true
      },
      _iterator: {
        value: function _iterator(options) {
          return new DynamoIterator(this, options);
        },
        writable: true,
        configurable: true
      },
      _batch: {
        value: function _batch(array, options, cb) {
          var _this = this;
          var TableName = this._table.name;
          var ops = array.map(function(_ref) {
            var type = _ref.type;
            var key = _ref.key;
            var value = _ref.value;
            return type === "del" ? {DeleteRequest: {Key: _this._toItem({key: key})}} : {PutRequest: {Item: _this._toItem({
                  key: key,
                  value: value
                })}};
          });
          var params = {RequestItems: {}};
          var loop = function(err, data) {
            if (err)
              return cb(err);
            var reqs = [];
            if (data && data.UnprocessedItems && data.UnprocessedItems[TableName]) {
              reqs.push.apply(reqs, _toConsumableArray(data.UnprocessedItems[TableName]));
            }
            reqs.push.apply(reqs, _toConsumableArray(ops.splice(0, 25 - reqs.length)));
            if (reqs.length === 0)
              return cb();
            params.RequestItems[TableName] = reqs;
            _this._dynamo.batchWriteItem(params, loop);
          };
          loop();
        },
        writable: true,
        configurable: true
      }
    });
    return DynamoDOWN;
  })(AbstractLevelDOWN);
  module.exports = function(dynamo) {
    var ctor = function(location) {
      return new DynamoDOWN(dynamo, location);
    };
    ctor.destroy = function(location, cb) {
      var dynamoDown = ctor(location);
      dynamoDown.open(function(err) {
        if (err)
          return cb(err);
        var iterator = dynamoDown.iterator();
        var ops = [];
        var pull = function(err) {
          if (err)
            return cb(err);
          iterator.next(function(err, key) {
            if (err)
              return cb(err);
            if (!key)
              return flush(cb);
            ops.push({
              type: "del",
              key: key
            });
            ops.length < 25 ? pull() : flush(pull);
          });
        };
        var flush = function(cb) {
          dynamoDown.batch(ops.splice(0), cb);
        };
        pull();
      });
    };
    return ctor;
  };
})(require('buffer').Buffer);
