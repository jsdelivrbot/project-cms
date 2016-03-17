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
  var _widgetsCheckboxWidget = require('../widgets/CheckboxWidget');
  var _widgetsCheckboxWidget2 = _interopRequireDefault(_widgetsCheckboxWidget);
  function BooleanField(props) {
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
      onChange: onChange,
      label: title || name,
      placeholder: description,
      defaultValue: schema["default"],
      value: (0, _utils.defaultFieldValue)(formData, schema),
      required: required
    };
    if (widget) {
      var Widget = (0, _utils.getAlternativeWidget)(schema.type, widget, widgets);
      return _react2["default"].createElement(Widget, _extends({options: (0, _utils.optionsList)({"enum": [true, false]})}, commonProps));
    }
    return _react2["default"].createElement(_widgetsCheckboxWidget2["default"], commonProps);
  }
  if (process.env.NODE_ENV !== "production") {
    BooleanField.propTypes = {
      schema: _react.PropTypes.object.isRequired,
      uiSchema: _react.PropTypes.object,
      onChange: _react.PropTypes.func.isRequired,
      formData: _react.PropTypes.bool,
      required: _react.PropTypes.bool
    };
  }
  BooleanField.defaultProps = {uiSchema: {}};
  exports["default"] = BooleanField;
  module.exports = exports["default"];
})(require('process'));
