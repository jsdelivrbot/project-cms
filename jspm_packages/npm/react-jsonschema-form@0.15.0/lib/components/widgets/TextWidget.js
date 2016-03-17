/* */ 
(function(process) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {"default": obj};
  }
  var _react = require('react');
  var _react2 = _interopRequireDefault(_react);
  function TextWidget(_ref) {
    var schema = _ref.schema;
    var placeholder = _ref.placeholder;
    var value = _ref.value;
    var defaultValue = _ref.defaultValue;
    var required = _ref.required;
    var onChange = _ref.onChange;
    return _react2["default"].createElement("input", {
      type: "text",
      value: value,
      defaultValue: defaultValue,
      placeholder: placeholder,
      required: required,
      onChange: function(event) {
        return onChange(event.target.value);
      }
    });
  }
  if (process.env.NODE_ENV !== "production") {
    TextWidget.propTypes = {
      schema: _react.PropTypes.object.isRequired,
      placeholder: _react.PropTypes.string,
      value: _react.PropTypes.oneOfType([_react2["default"].PropTypes.string, _react2["default"].PropTypes.number]),
      defaultValue: _react.PropTypes.oneOfType([_react2["default"].PropTypes.string, _react2["default"].PropTypes.number]),
      required: _react.PropTypes.bool,
      onChange: _react.PropTypes.func
    };
  }
  exports["default"] = TextWidget;
  module.exports = exports["default"];
})(require('process'));
