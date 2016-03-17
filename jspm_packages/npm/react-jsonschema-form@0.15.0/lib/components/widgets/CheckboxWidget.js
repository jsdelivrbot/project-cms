/* */ 
(function(process) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {"default": obj};
  }
  var _react = require('react');
  var _react2 = _interopRequireDefault(_react);
  function CheckboxWidget(_ref) {
    var schema = _ref.schema;
    var defaultValue = _ref.defaultValue;
    var value = _ref.value;
    var required = _ref.required;
    var placeholder = _ref.placeholder;
    var onChange = _ref.onChange;
    return _react2["default"].createElement("input", {
      type: "checkbox",
      title: placeholder,
      checked: value,
      defaultChecked: defaultValue,
      required: required,
      onChange: function(event) {
        return onChange(event.target.checked);
      }
    });
  }
  if (process.env.NODE_ENV !== "production") {
    CheckboxWidget.propTypes = {
      schema: _react.PropTypes.object.isRequired,
      onChange: _react.PropTypes.func,
      defaultValue: _react.PropTypes.bool,
      value: _react.PropTypes.bool,
      required: _react.PropTypes.bool,
      placeholder: _react.PropTypes.string
    };
  }
  exports["default"] = CheckboxWidget;
  module.exports = exports["default"];
})(require('process'));
