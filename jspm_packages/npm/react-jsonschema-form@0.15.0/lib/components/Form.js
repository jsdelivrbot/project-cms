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
  var _get = function get(_x2, _x3, _x4) {
    var _again = true;
    _function: while (_again) {
      var object = _x2,
          property = _x3,
          receiver = _x4;
      _again = false;
      if (object === null)
        object = Function.prototype;
      var desc = Object.getOwnPropertyDescriptor(object, property);
      if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);
        if (parent === null) {
          return undefined;
        } else {
          _x2 = parent;
          _x3 = property;
          _x4 = receiver;
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
  var _jsonschema = require('jsonschema');
  var _fieldsSchemaField = require('./fields/SchemaField');
  var _fieldsSchemaField2 = _interopRequireDefault(_fieldsSchemaField);
  var _fieldsTitleField = require('./fields/TitleField');
  var _fieldsTitleField2 = _interopRequireDefault(_fieldsTitleField);
  var _utils = require('../utils');
  var _ErrorList = require('./ErrorList');
  var _ErrorList2 = _interopRequireDefault(_ErrorList);
  var Form = (function(_Component) {
    _inherits(Form, _Component);
    _createClass(Form, null, [{
      key: "defaultProps",
      value: {uiSchema: {}},
      enumerable: true
    }]);
    function Form(props) {
      _classCallCheck(this, Form);
      _get(Object.getPrototypeOf(Form.prototype), "constructor", this).call(this, props);
      this.state = this.getStateFromProps(props);
    }
    _createClass(Form, [{
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        this.setState(this.getStateFromProps(nextProps));
      }
    }, {
      key: "getStateFromProps",
      value: function getStateFromProps(props) {
        var schema = "schema" in props ? props.schema : this.props.schema;
        var edit = !!props.formData;
        var formData = (0, _utils.getDefaultFormState)(schema, props.formData) || null;
        return {
          status: "initial",
          formData: formData,
          edit: edit,
          errors: edit ? this.validate(formData, schema) : []
        };
      }
    }, {
      key: "validate",
      value: function validate(formData, schema) {
        var validator = new _jsonschema.Validator();
        return validator.validate(formData, schema || this.props.schema).errors;
      }
    }, {
      key: "renderErrors",
      value: function renderErrors() {
        var _state = this.state;
        var status = _state.status;
        var errors = _state.errors;
        if (status !== "editing" && errors.length) {
          return _react2["default"].createElement(_ErrorList2["default"], {errors: errors});
        }
        return null;
      }
    }, {
      key: "onChange",
      value: function onChange(formData) {
        var _this = this;
        var options = arguments.length <= 1 || arguments[1] === undefined ? {validate: true} : arguments[1];
        this.setState({
          status: "editing",
          formData: formData,
          errors: options.validate ? this.validate(formData) : this.state.errors
        }, function(_) {
          if (_this.props.onChange) {
            _this.props.onChange(_this.state);
          }
        });
      }
    }, {
      key: "onSubmit",
      value: function onSubmit(event) {
        var _this2 = this;
        event.preventDefault();
        this.setState({status: "submitted"});
        var errors = this.validate(this.state.formData);
        if (Object.keys(errors).length > 0) {
          this.setState({errors: errors}, function(_) {
            if (_this2.props.onError) {
              _this2.props.onError(errors);
            } else {
              console.error("Form validation failed", errors);
            }
          });
          return;
        } else if (this.props.onSubmit) {
          this.props.onSubmit(this.state);
        }
        this.setState({status: "initial"});
      }
    }, {
      key: "getRegistry",
      value: function getRegistry() {
        return {
          SchemaField: this.props.SchemaField || _fieldsSchemaField2["default"],
          TitleField: this.props.TitleField || _fieldsTitleField2["default"],
          widgets: this.props.widgets || {}
        };
      }
    }, {
      key: "render",
      value: function render() {
        var _props = this.props;
        var children = _props.children;
        var schema = _props.schema;
        var uiSchema = _props.uiSchema;
        var widgets = _props.widgets;
        var formData = this.state.formData;
        var registry = this.getRegistry();
        var _SchemaField = registry.SchemaField;
        return _react2["default"].createElement("form", {
          className: "rjsf",
          onSubmit: this.onSubmit.bind(this)
        }, this.renderErrors(), _react2["default"].createElement(_SchemaField, {
          schema: schema,
          uiSchema: uiSchema,
          formData: formData,
          widgets: widgets,
          onChange: this.onChange.bind(this),
          registry: registry
        }), children ? children : _react2["default"].createElement("p", null, _react2["default"].createElement("button", {type: "submit"}, "Submit")));
      }
    }]);
    return Form;
  })(_react.Component);
  exports["default"] = Form;
  if (process.env.NODE_ENV !== "production") {
    Form.propTypes = {
      schema: _react.PropTypes.object.isRequired,
      uiSchema: _react.PropTypes.object,
      formData: _react.PropTypes.any,
      widgets: _react.PropTypes.object,
      onChange: _react.PropTypes.func,
      onError: _react.PropTypes.func,
      onSubmit: _react.PropTypes.func,
      SchemaField: _react.PropTypes.func,
      TitleField: _react.PropTypes.func
    };
  }
  exports["default"] = Form;
  module.exports = exports["default"];
})(require('process'));
