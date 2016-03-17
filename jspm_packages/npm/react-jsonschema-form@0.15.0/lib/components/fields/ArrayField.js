/* */ 
(function(process) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var _createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  var _get = function get(_x, _x2, _x3) {
    var _again = true;
    _function: while (_again) {
      var object = _x,
          property = _x2,
          receiver = _x3;
      _again = false;
      if (object === null)
        object = Function.prototype;
      var desc = Object.getOwnPropertyDescriptor(object, property);
      if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);
        if (parent === null) {
          return undefined;
        } else {
          _x = parent;
          _x2 = property;
          _x3 = receiver;
          _again = true;
          desc = parent = undefined;
          continue _function;
        }
      } else if ("value" in desc) {
        return desc.value;
      } else {
        var getter = desc.get;
        if (getter === undefined) {
          return undefined;
        }
        return getter.call(receiver);
      }
    }
  };
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {"default": obj};
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  var _react = require('react');
  var _react2 = _interopRequireDefault(_react);
  var _utils = require('../../utils');
  var _widgetsSelectWidget = require('../widgets/SelectWidget');
  var _widgetsSelectWidget2 = _interopRequireDefault(_widgetsSelectWidget);
  var ArrayField = (function(_Component) {
    _inherits(ArrayField, _Component);
    _createClass(ArrayField, null, [{
      key: "defaultProps",
      value: {uiSchema: {}},
      enumerable: true
    }]);
    function ArrayField(props) {
      _classCallCheck(this, ArrayField);
      _get(Object.getPrototypeOf(ArrayField.prototype), "constructor", this).call(this, props);
      this.state = this.getStateFromProps(props);
    }
    _createClass(ArrayField, [{
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        this.setState(this.getStateFromProps(nextProps));
      }
    }, {
      key: "getStateFromProps",
      value: function getStateFromProps(props) {
        var formData = Array.isArray(props.formData) ? props.formData : null;
        return {items: (0, _utils.getDefaultFormState)(props.schema, formData) || []};
      }
    }, {
      key: "isItemRequired",
      value: function isItemRequired(itemsSchema) {
        return itemsSchema.type === "string" && itemsSchema.minLength > 0;
      }
    }, {
      key: "asyncSetState",
      value: function asyncSetState(state, options) {
        var _this = this;
        this.setState(state, function(_) {
          return _this.props.onChange(_this.state.items, options);
        });
      }
    }, {
      key: "onAddClick",
      value: function onAddClick(event) {
        event.preventDefault();
        var items = this.state.items;
        var schema = this.props.schema;
        this.asyncSetState({items: items.concat((0, _utils.getDefaultFormState)(schema.items))}, {validate: false});
      }
    }, {
      key: "onDropClick",
      value: function onDropClick(index, event) {
        event.preventDefault();
        this.asyncSetState({items: this.state.items.filter(function(_, i) {
            return i !== index;
          })}, {validate: false});
      }
    }, {
      key: "onChange",
      value: function onChange(index, value) {
        this.asyncSetState({items: this.state.items.map(function(item, i) {
            return index === i ? value : item;
          })}, {validate: false});
      }
    }, {
      key: "onSelectChange",
      value: function onSelectChange(value) {
        this.asyncSetState({items: value}, {validate: false});
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;
        var _props = this.props;
        var schema = _props.schema;
        var uiSchema = _props.uiSchema;
        var name = _props.name;
        var title = schema.title || name;
        var items = this.state.items;
        var SchemaField = this.props.registry.SchemaField;
        if ((0, _utils.isMultiSelect)(schema)) {
          return _react2["default"].createElement(_widgetsSelectWidget2["default"], {
            multiple: true,
            onChange: this.onSelectChange.bind(this),
            options: (0, _utils.optionsList)(schema.items),
            schema: schema,
            title: title,
            defaultValue: schema["default"],
            value: items
          });
        }
        return _react2["default"].createElement("fieldset", {className: "field field-array field-array-of-" + schema.items.type}, title ? _react2["default"].createElement("legend", null, title) : null, schema.description ? _react2["default"].createElement("div", {className: "field-description"}, schema.description) : null, _react2["default"].createElement("div", {className: "array-item-list"}, items.map(function(item, index) {
          return _react2["default"].createElement("div", {key: index}, _react2["default"].createElement(SchemaField, {
            schema: schema.items,
            uiSchema: uiSchema.items,
            formData: items[index],
            required: _this2.isItemRequired(schema.items),
            onChange: _this2.onChange.bind(_this2, index),
            registry: _this2.props.registry
          }), _react2["default"].createElement("p", {className: "array-item-remove"}, _react2["default"].createElement("button", {
            type: "button",
            onClick: _this2.onDropClick.bind(_this2, index)
          }, "-")));
        })), _react2["default"].createElement("p", {className: "array-item-add"}, _react2["default"].createElement("button", {
          type: "button",
          onClick: this.onAddClick.bind(this)
        }, "+")));
      }
    }, {
      key: "itemTitle",
      get: function get() {
        var schema = this.props.schema;
        return schema.items.title || schema.items.description || "Item";
      }
    }]);
    return ArrayField;
  })(_react.Component);
  if (process.env.NODE_ENV !== "production") {
    ArrayField.propTypes = {
      schema: _react.PropTypes.object.isRequired,
      uiSchema: _react.PropTypes.object,
      onChange: _react.PropTypes.func.isRequired,
      formData: _react.PropTypes.array,
      registry: _react.PropTypes.shape({
        SchemaField: _react.PropTypes.func.isRequired,
        TitleField: _react.PropTypes.func.isRequired
      })
    };
  }
  exports["default"] = ArrayField;
  module.exports = exports["default"];
})(require('process'));
