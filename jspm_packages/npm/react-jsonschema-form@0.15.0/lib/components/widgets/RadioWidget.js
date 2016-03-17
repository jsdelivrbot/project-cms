/* */ 
(function(process) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {"default": obj};
  }
  var _react = require('react');
  var _react2 = _interopRequireDefault(_react);
  function RadioWidget(_ref) {
    var schema = _ref.schema;
    var options = _ref.options;
    var placeholder = _ref.placeholder;
    var value = _ref.value;
    var defaultValue = _ref.defaultValue;
    var required = _ref.required;
    var onChange = _ref.onChange;
    var name = Math.random().toString();
    return _react2["default"].createElement("div", {className: "field-radio-group"}, options.map(function(option, i) {
      var checked = value !== undefined ? option.value === value : option.value === defaultValue;
      return _react2["default"].createElement("label", {key: i}, _react2["default"].createElement("input", {
        type: "radio",
        name: name,
        value: option.value,
        checked: checked,
        placeholder: placeholder,
        onChange: function(_) {
          return onChange(option.value);
        }
      }), option.label);
    }));
  }
  if (process.env.NODE_ENV !== "production") {
    RadioWidget.propTypes = {
      schema: _react.PropTypes.object.isRequired,
      options: _react.PropTypes.array.isRequired,
      placeholder: _react.PropTypes.string,
      value: _react.PropTypes.any,
      defaultValue: _react.PropTypes.any,
      required: _react.PropTypes.bool,
      onChange: _react.PropTypes.func
    };
  }
  exports["default"] = RadioWidget;
  module.exports = exports["default"];
})(require('process'));
