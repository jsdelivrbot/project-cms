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
    return _react2["default"].createElement("textarea", {
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
      value: _react.PropTypes.string,
      defaultValue: _react.PropTypes.string,
      required: _react.PropTypes.bool,
      onChange: _react.PropTypes.func
    };
  }
  exports["default"] = TextWidget;
  module.exports = exports["default"];
})(require('process'));
