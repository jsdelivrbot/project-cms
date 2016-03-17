/* */ 
(function(process) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {"default": obj};
  }
  var _react = require('react');
  var _react2 = _interopRequireDefault(_react);
  function rangeSpec(schema) {
    var spec = {};
    if (schema.multipleOf) {
      spec.step = schema.multipleOf;
    }
    if (schema.minimum) {
      spec.min = schema.minimum;
    }
    if (schema.maximum) {
      spec.max = schema.maximum;
    }
    return spec;
  }
  function RangeWidget(_ref) {
    var schema = _ref.schema;
    var placeholder = _ref.placeholder;
    var value = _ref.value;
    var defaultValue = _ref.defaultValue;
    var required = _ref.required;
    var onChange = _ref.onChange;
    return _react2["default"].createElement("div", {className: "field-range-wrapper"}, _react2["default"].createElement("input", _extends({
      type: "range",
      value: value,
      defaultValue: defaultValue,
      placeholder: placeholder,
      required: required,
      onChange: function(event) {
        return onChange(event.target.value);
      }
    }, rangeSpec(schema))), _react2["default"].createElement("span", {className: "range-view"}, value));
  }
  if (process.env.NODE_ENV !== "production") {
    RangeWidget.propTypes = {
      schema: _react.PropTypes.object.isRequired,
      placeholder: _react.PropTypes.string,
      value: _react.PropTypes.oneOfType([_react2["default"].PropTypes.string, _react2["default"].PropTypes.number]),
      defaultValue: _react.PropTypes.oneOfType([_react2["default"].PropTypes.string, _react2["default"].PropTypes.number]),
      required: _react.PropTypes.bool,
      onChange: _react.PropTypes.func
    };
  }
  exports["default"] = RangeWidget;
  module.exports = exports["default"];
})(require('process'));
