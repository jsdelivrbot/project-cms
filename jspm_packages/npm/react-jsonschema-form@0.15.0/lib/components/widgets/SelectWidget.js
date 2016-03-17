/* */ 
(function(process) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {"default": obj};
  }
  var _react = require('react');
  var _react2 = _interopRequireDefault(_react);
  var _utils = require('../../utils');
  function processValue(type, value) {
    if (type === "boolean") {
      return value === "true";
    } else if (type === "number") {
      return (0, _utils.asNumber)(value);
    }
    return value;
  }
  function SelectWidget(_ref) {
    var schema = _ref.schema;
    var options = _ref.options;
    var placeholder = _ref.placeholder;
    var value = _ref.value;
    var defaultValue = _ref.defaultValue;
    var required = _ref.required;
    var multiple = _ref.multiple;
    var onChange = _ref.onChange;
    return _react2["default"].createElement("select", {
      multiple: multiple,
      title: placeholder,
      value: value,
      defaultValue: defaultValue,
      onChange: function(event) {
        var newValue = undefined;
        if (multiple) {
          newValue = [].filter.call(event.target.options, function(o) {
            return o.selected;
          }).map(function(o) {
            return o.value;
          });
        } else {
          newValue = event.target.value;
        }
        onChange(processValue(schema.type, newValue));
      }
    }, options.map(function(_ref2, i) {
      var value = _ref2.value;
      var label = _ref2.label;
      return _react2["default"].createElement("option", {
        key: i,
        value: value
      }, label);
    }));
  }
  if (process.env.NODE_ENV !== "production") {
    SelectWidget.propTypes = {
      schema: _react.PropTypes.object.isRequired,
      options: _react.PropTypes.array.isRequired,
      placeholder: _react.PropTypes.string,
      value: _react.PropTypes.any,
      defaultValue: _react.PropTypes.any,
      required: _react.PropTypes.bool,
      multiple: _react.PropTypes.bool,
      onChange: _react.PropTypes.func
    };
  }
  exports["default"] = SelectWidget;
  module.exports = exports["default"];
})(require('process'));
