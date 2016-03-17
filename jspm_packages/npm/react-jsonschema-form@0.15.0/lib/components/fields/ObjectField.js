/* */ 
(function(process) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var _createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  var _get = function get(_x, _x2, _x3) {
    var _again = true;
    _function: while (_again) {
      var object = _x,
          property = _x2,
          receiver = _x3;
      _again = false;
      if (object === null)
        object = Function.prototype;
      var desc = Object.getOwnPropertyDescriptor(object, property);
      if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);
        if (parent === null) {
          return undefined;
        } else {
          _x = parent;
          _x2 = property;
          _x3 = receiver;
          _again = true;
          desc = parent = undefined;
          continue _function;
        }
      } else if ("value" in desc) {
        return desc.value;
      } else {
        var getter = desc.get;
        if (getter === undefined) {
          return undefined;
        }
        return getter.call(receiver);
      }
    }
  };
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {"default": obj};
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _inherits(subClass, superClass) {
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
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  var _react = require('react');
  var _react2 = _interopRequireDefault(_react);
  var _utils = require('../../utils');
  var ObjectField = (function(_Component) {
    _inherits(ObjectField, _Component);
    _createClass(ObjectField, null, [{
      key: "defaultProps",
      value: {uiSchema: {}},
      enumerable: true
    }]);
    function ObjectField(props) {
      _classCallCheck(this, ObjectField);
      _get(Object.getPrototypeOf(ObjectField.prototype), "constructor", this).call(this, props);
      this.state = this.getStateFromProps(props);
    }
    _createClass(ObjectField, [{
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        this.setState(this.getStateFromProps(nextProps));
      }
    }, {
      key: "getStateFromProps",
      value: function getStateFromProps(props) {
        return (0, _utils.getDefaultFormState)(props.schema, props.formData) || {};
      }
    }, {
      key: "isRequired",
      value: function isRequired(name) {
        var schema = this.props.schema;
        return Array.isArray(schema.required) && schema.required.indexOf(name) !== -1;
      }
    }, {
      key: "asyncSetState",
      value: function asyncSetState(state) {
        var _this = this;
        this.setState(state, function(_) {
          return _this.props.onChange(_this.state);
        });
      }
    }, {
      key: "onChange",
      value: function onChange(name, value) {
        this.asyncSetState(_defineProperty({}, name, value));
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;
        var _props = this.props;
        var schema = _props.schema;
        var uiSchema = _props.uiSchema;
        var name = _props.name;
        var title = schema.title || name;
        var _props$registry = this.props.registry;
        var SchemaField = _props$registry.SchemaField;
        var TitleField = _props$registry.TitleField;
        try {
          var orderedProperties = (0, _utils.orderProperties)(Object.keys(schema.properties), uiSchema["ui:order"]);
        } catch (err) {
          return _react2["default"].createElement("p", {
            className: "config-error",
            style: {color: "red"}
          }, "Invalid ", name || "root", " object field configuration:", _react2["default"].createElement("em", null, err.message), ".");
        }
        return _react2["default"].createElement("fieldset", null, title ? _react2["default"].createElement(TitleField, {title: title}) : null, schema.description ? _react2["default"].createElement("div", {className: "field-description"}, schema.description) : null, orderedProperties.map(function(name, index) {
          return _react2["default"].createElement(SchemaField, {
            key: index,
            name: name,
            required: _this2.isRequired(name),
            schema: schema.properties[name],
            uiSchema: uiSchema[name],
            formData: _this2.state[name],
            onChange: _this2.onChange.bind(_this2, name),
            registry: _this2.props.registry
          });
        }));
      }
    }]);
    return ObjectField;
  })(_react.Component);
  if (process.env.NODE_ENV !== "production") {
    ObjectField.propTypes = {
      schema: _react.PropTypes.object.isRequired,
      uiSchema: _react.PropTypes.object,
      onChange: _react.PropTypes.func.isRequired,
      formData: _react.PropTypes.object,
      required: _react.PropTypes.bool,
      registry: _react.PropTypes.shape({
        SchemaField: _react.PropTypes.func.isRequired,
        TitleField: _react.PropTypes.func.isRequired
      })
    };
  }
  exports["default"] = ObjectField;
  module.exports = exports["default"];
})(require('process'));
