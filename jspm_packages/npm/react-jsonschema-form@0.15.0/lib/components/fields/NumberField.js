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
  var _utils = require('../../utils');
  var _StringField = require('./StringField');
  var _StringField2 = _interopRequireDefault(_StringField);
  function NumberField(props) {
    return _react2["default"].createElement(_StringField2["default"], _extends({}, props, {onChange: function(value) {
        return props.onChange((0, _utils.asNumber)(value));
      }}));
  }
  if (process.env.NODE_ENV !== "production") {
    NumberField.propTypes = {
      schema: _react.PropTypes.object.isRequired,
      onChange: _react.PropTypes.func.isRequired,
      formData: _react.PropTypes.number,
      required: _react.PropTypes.bool
    };
  }
  NumberField.defaultProps = {uiSchema: {}};
  exports["default"] = NumberField;
  module.exports = exports["default"];
})(require('process'));
