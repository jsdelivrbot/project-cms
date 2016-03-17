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
  var _ArrayField = require('./ArrayField');
  var _ArrayField2 = _interopRequireDefault(_ArrayField);
  var _BooleanField = require('./BooleanField');
  var _BooleanField2 = _interopRequireDefault(_BooleanField);
  var _NumberField = require('./NumberField');
  var _NumberField2 = _interopRequireDefault(_NumberField);
  var _ObjectField = require('./ObjectField');
  var _ObjectField2 = _interopRequireDefault(_ObjectField);
  var _StringField = require('./StringField');
  var _StringField2 = _interopRequireDefault(_StringField);
  var _UnsupportedField = require('./UnsupportedField');
  var _UnsupportedField2 = _interopRequireDefault(_UnsupportedField);
  var REQUIRED_FIELD_SYMBOL = "*";
  var COMPONENT_TYPES = {
    "array": _ArrayField2["default"],
    "boolean": _BooleanField2["default"],
    "date-time": _StringField2["default"],
    "integer": _NumberField2["default"],
    "number": _NumberField2["default"],
    "object": _ObjectField2["default"],
    "string": _StringField2["default"]
  };
  function getLabel(label, required) {
    if (!label) {
      return null;
    }
    if (required) {
      return label + REQUIRED_FIELD_SYMBOL;
    }
    return label;
  }
  function getContent(_ref) {
    var type = _ref.type;
    var label = _ref.label;
    var required = _ref.required;
    var children = _ref.children;
    var displayLabel = _ref.displayLabel;
    if (!displayLabel) {
      return children;
    }
    return _react2["default"].createElement("label", null, getLabel(label, required), children);
  }
  function Wrapper(props) {
    var type = props.type;
    var classNames = props.classNames;
    return _react2["default"].createElement("div", {className: "field field-" + type + " " + classNames}, getContent(props));
  }
  if (process.env.NODE_ENV !== "production") {
    Wrapper.propTypes = {
      type: _react.PropTypes.string.isRequired,
      label: _react.PropTypes.string,
      required: _react.PropTypes.bool,
      displayLabel: _react.PropTypes.bool,
      children: _react2["default"].PropTypes.node.isRequired,
      classNames: _react2["default"].PropTypes.string
    };
  }
  Wrapper.defaultProps = {classNames: ""};
  function SchemaField(props) {
    var schema = props.schema;
    var uiSchema = props.uiSchema;
    var name = props.name;
    var required = props.required;
    var FieldComponent = COMPONENT_TYPES[schema.type] || _UnsupportedField2["default"];
    var displayLabel = true;
    if (schema.type === "array") {
      displayLabel = (0, _utils.isMultiSelect)(schema);
    }
    if (schema.type === "object") {
      displayLabel = false;
    }
    return _react2["default"].createElement(Wrapper, {
      label: schema.title || name,
      required: required,
      type: schema.type,
      displayLabel: displayLabel,
      classNames: uiSchema.classNames
    }, _react2["default"].createElement(FieldComponent, props));
  }
  SchemaField.defaultProps = {uiSchema: {}};
  if (process.env.NODE_ENV !== "production") {
    SchemaField.propTypes = {
      schema: _react.PropTypes.object.isRequired,
      uiSchema: _react.PropTypes.object,
      registry: _react.PropTypes.object
    };
  }
  exports["default"] = SchemaField;
  module.exports = exports["default"];
})(require('process'));
