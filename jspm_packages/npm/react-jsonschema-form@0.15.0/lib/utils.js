/* */ 
"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.defaultTypeValue = defaultTypeValue;
exports.defaultFieldValue = defaultFieldValue;
exports.getAlternativeWidget = getAlternativeWidget;
exports.getDefaultFormState = getDefaultFormState;
exports.mergeObjects = mergeObjects;
exports.asNumber = asNumber;
exports.orderProperties = orderProperties;
exports.isMultiSelect = isMultiSelect;
exports.optionsList = optionsList;
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {"default": obj};
}
var _componentsWidgetsPasswordWidget = require('./components/widgets/PasswordWidget');
var _componentsWidgetsPasswordWidget2 = _interopRequireDefault(_componentsWidgetsPasswordWidget);
var _componentsWidgetsRadioWidget = require('./components/widgets/RadioWidget');
var _componentsWidgetsRadioWidget2 = _interopRequireDefault(_componentsWidgetsRadioWidget);
var _componentsWidgetsUpDownWidget = require('./components/widgets/UpDownWidget');
var _componentsWidgetsUpDownWidget2 = _interopRequireDefault(_componentsWidgetsUpDownWidget);
var _componentsWidgetsRangeWidget = require('./components/widgets/RangeWidget');
var _componentsWidgetsRangeWidget2 = _interopRequireDefault(_componentsWidgetsRangeWidget);
var _componentsWidgetsSelectWidget = require('./components/widgets/SelectWidget');
var _componentsWidgetsSelectWidget2 = _interopRequireDefault(_componentsWidgetsSelectWidget);
var _componentsWidgetsTextareaWidget = require('./components/widgets/TextareaWidget');
var _componentsWidgetsTextareaWidget2 = _interopRequireDefault(_componentsWidgetsTextareaWidget);
var altWidgetMap = {
  boolean: {
    radio: _componentsWidgetsRadioWidget2["default"],
    select: _componentsWidgetsSelectWidget2["default"]
  },
  string: {
    password: _componentsWidgetsPasswordWidget2["default"],
    radio: _componentsWidgetsRadioWidget2["default"],
    select: _componentsWidgetsSelectWidget2["default"],
    textarea: _componentsWidgetsTextareaWidget2["default"]
  },
  number: {
    updown: _componentsWidgetsUpDownWidget2["default"],
    range: _componentsWidgetsRangeWidget2["default"]
  },
  integer: {
    updown: _componentsWidgetsUpDownWidget2["default"],
    range: _componentsWidgetsRangeWidget2["default"]
  }
};
function defaultTypeValue(type) {
  switch (type) {
    case "array":
      return [];
    case "boolean":
      return false;
    case "date-time":
      return "";
    case "number":
      return 0;
    case "object":
      return {};
    case "string":
      return "";
    default:
      return undefined;
  }
}
function defaultFieldValue(formData, schema) {
  return formData === null ? defaultTypeValue(schema.type) : formData;
}
function getAlternativeWidget(type, widget) {
  var registeredWidgets = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
  if (typeof widget === "function") {
    return widget;
  }
  if (typeof widget !== "string") {
    throw new Error("Unsupported widget definition: " + typeof widget);
  }
  if (widget in registeredWidgets) {
    return registeredWidgets[widget];
  }
  if (!altWidgetMap.hasOwnProperty(type)) {
    throw new Error("No alternative widget for type " + type);
  }
  if (!altWidgetMap[type].hasOwnProperty(widget)) {
    throw new Error("No alternative widget \"" + widget + "\" for type " + type);
  }
  return altWidgetMap[type][widget];
}
function computeDefaults(schema, parentDefaults) {
  var defaults = parentDefaults;
  if (isObject(defaults) && isObject(schema["default"])) {
    defaults = mergeObjects(defaults, schema["default"]);
  } else if ("default" in schema) {
    defaults = schema["default"];
  }
  if (typeof defaults === "undefined") {
    defaults = defaultTypeValue(schema.type);
  }
  if (schema.type === "object") {
    return Object.keys(schema.properties).reduce(function(acc, key) {
      acc[key] = computeDefaults(schema.properties[key], defaults[key]);
      return acc;
    }, {});
  }
  return defaults;
}
function getDefaultFormState(schema, formData) {
  if (!isObject(schema)) {
    throw new Error("Invalid schema: " + schema);
  }
  var defaults = computeDefaults(schema);
  if (typeof formData === "undefined") {
    return defaults;
  }
  if (isObject(formData)) {
    return mergeObjects(defaults, formData);
  }
  return formData || defaults;
}
function isObject(thing) {
  return typeof thing == "object" && thing !== null && !Array.isArray(thing);
}
function mergeObjects(obj1, obj2) {
  var acc = Object.assign({}, obj1);
  return Object.keys(obj2).reduce(function(acc, key) {
    var right = obj2[key];
    if (obj1.hasOwnProperty(key) && isObject(right)) {
      acc[key] = mergeObjects(obj1[key], right);
    } else {
      acc[key] = right;
    }
    return acc;
  }, acc);
}
function asNumber(value) {
  if (/\.$/.test(value)) {
    return value;
  }
  var n = Number(value);
  var valid = typeof n === "number" && !Number.isNaN(n);
  return valid ? n : value;
}
function orderProperties(properties, order) {
  if (!Array.isArray(order)) {
    return properties;
  }
  if (order.length !== properties.length) {
    throw new Error("uiSchema order list length should match object properties length");
  }
  var fingerprint = function fingerprint(arr) {
    return [].slice.call(arr).sort().toString();
  };
  if (fingerprint(order) !== fingerprint(properties)) {
    throw new Error("uiSchema order list does not match object properties list");
  }
  return order;
}
function isMultiSelect(schema) {
  return Array.isArray(schema.items["enum"]) && schema.uniqueItems;
}
function optionsList(schema) {
  return schema["enum"].map(function(value, i) {
    var label = schema.enumNames && schema.enumNames[i] || String(value);
    return {
      label: label,
      value: value
    };
  });
}
