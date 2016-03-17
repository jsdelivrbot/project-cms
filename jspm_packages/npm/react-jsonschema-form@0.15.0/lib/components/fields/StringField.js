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
  var _widgetsTextWidget = require('../widgets/TextWidget');
  var _widgetsTextWidget2 = _interopRequireDefault(_widgetsTextWidget);
  var _widgetsSelectWidget = require('../widgets/SelectWidget');
  var _widgetsSelectWidget2 = _interopRequireDefault(_widgetsSelectWidget);
  function StringField(props) {
    var schema = props.schema;
    var name = props.name;
    var uiSchema = props.uiSchema;
    var formData = props.formData;
    var widgets = props.widgets;
    var required = props.required;
    var onChange = props.onChange;
    var title = schema.title;
    var description = schema.description;
    var widget = uiSchema["ui:widget"];
    var commonProps = {
      schema: schema,
      label: title || name,
      placeholder: description,
      onChange: onChange,
      value: (0, _utils.defaultFieldValue)(formData, schema),
      required: required,
      defaultValue: schema["default"]
    };
    if (Array.isArray(schema["enum"])) {
      if (widget) {
        var Widget = (0, _utils.getAlternativeWidget)(schema.type, widget, widgets);
        return _react2["default"].createElement(Widget, _extends({options: (0, _utils.optionsList)(schema)}, commonProps));
      }
      return _react2["default"].createElement(_widgetsSelectWidget2["default"], _extends({options: (0, _utils.optionsList)(schema)}, commonProps));
    }
    if (widget) {
      var Widget = (0, _utils.getAlternativeWidget)(schema.type, widget, widgets);
      return _react2["default"].createElement(Widget, commonProps);
    }
    return _react2["default"].createElement(_widgetsTextWidget2["default"], commonProps);
  }
  if (process.env.NODE_ENV !== "production") {
    StringField.propTypes = {
      schema: _react.PropTypes.object.isRequired,
      onChange: _react.PropTypes.func.isRequired,
      formData: _react.PropTypes.oneOfType([_react2["default"].PropTypes.string, _react2["default"].PropTypes.number]),
      required: _react.PropTypes.bool
    };
  }
  StringField.defaultProps = {uiSchema: {}};
  exports["default"] = StringField;
  module.exports = exports["default"];
})(require('process'));
