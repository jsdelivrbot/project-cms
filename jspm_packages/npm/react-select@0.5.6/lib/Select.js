/* */ 
'use strict';
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
var React = require('react');
var Input = require('react-input-autosize');
var classes = require('classnames');
var Value = require('./Value');
var requestId = 0;
var Select = React.createClass({
  displayName: 'Select',
  propTypes: {
    allowCreate: React.PropTypes.bool,
    asyncOptions: React.PropTypes.func,
    autoload: React.PropTypes.bool,
    className: React.PropTypes.string,
    clearable: React.PropTypes.bool,
    clearAllText: React.PropTypes.string,
    clearValueText: React.PropTypes.string,
    delimiter: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    filterOption: React.PropTypes.func,
    filterOptions: React.PropTypes.func,
    ignoreCase: React.PropTypes.bool,
    inputProps: React.PropTypes.object,
    matchPos: React.PropTypes.string,
    matchProp: React.PropTypes.string,
    multi: React.PropTypes.bool,
    name: React.PropTypes.string,
    addLabelText: React.PropTypes.string,
    noResultsText: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onOptionLabelClick: React.PropTypes.func,
    optionRenderer: React.PropTypes.func,
    options: React.PropTypes.array,
    placeholder: React.PropTypes.string,
    searchable: React.PropTypes.bool,
    searchPromptText: React.PropTypes.string,
    value: React.PropTypes.any,
    valueRenderer: React.PropTypes.func
  },
  getDefaultProps: function getDefaultProps() {
    return {
      allowCreate: false,
      asyncOptions: undefined,
      autoload: true,
      className: undefined,
      clearable: true,
      clearAllText: 'Clear all',
      clearValueText: 'Clear value',
      delimiter: ',',
      disabled: false,
      ignoreCase: true,
      inputProps: {},
      matchPos: 'any',
      matchProp: 'any',
      name: undefined,
      addLabelText: 'Add {label} ?',
      noResultsText: 'No results found',
      onChange: undefined,
      onOptionLabelClick: undefined,
      options: undefined,
      placeholder: 'Select...',
      searchable: true,
      searchPromptText: 'Type to search',
      value: undefined
    };
  },
  getInitialState: function getInitialState() {
    return {
      isFocused: false,
      isLoading: false,
      isOpen: false,
      options: this.props.options
    };
  },
  componentWillMount: function componentWillMount() {
    this._optionsCache = {};
    this._optionsFilterString = '';
    var self = this;
    this._closeMenuIfClickedOutside = function(event) {
      if (!self.state.isOpen) {
        return;
      }
      var menuElem = React.findDOMNode(self.refs.selectMenuContainer);
      var controlElem = React.findDOMNode(self.refs.control);
      var eventOccuredOutsideMenu = self.clickedOutsideElement(menuElem, event);
      var eventOccuredOutsideControl = self.clickedOutsideElement(controlElem, event);
      if (eventOccuredOutsideMenu && eventOccuredOutsideControl) {
        self.setState({isOpen: false}, self._unbindCloseMenuIfClickedOutside);
      }
    };
    this._bindCloseMenuIfClickedOutside = function() {
      if (!document.addEventListener && document.attachEvent) {
        document.attachEvent('onclick', this._closeMenuIfClickedOutside);
      } else {
        document.addEventListener('click', this._closeMenuIfClickedOutside);
      }
    };
    this._unbindCloseMenuIfClickedOutside = function() {
      if (!document.removeEventListener && document.detachEvent) {
        document.detachEvent('onclick', this._closeMenuIfClickedOutside);
      } else {
        document.removeEventListener('click', this._closeMenuIfClickedOutside);
      }
    };
    this.setState(this.getStateFromValue(this.props.value));
  },
  componentDidMount: function componentDidMount() {
    if (this.props.asyncOptions && this.props.autoload) {
      this.autoloadAsyncOptions();
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    clearTimeout(this._blurTimeout);
    clearTimeout(this._focusTimeout);
    if (this.state.isOpen) {
      this._unbindCloseMenuIfClickedOutside();
    }
  },
  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    if (JSON.stringify(newProps.options) !== JSON.stringify(this.props.options)) {
      this.setState({
        options: newProps.options,
        filteredOptions: this.filterOptions(newProps.options)
      });
    }
    if (newProps.value !== this.state.value || newProps.placeholder !== this.state.placeholder) {
      this.setState(this.getStateFromValue(newProps.value, newProps.options, newProps.placeholder));
    }
  },
  componentDidUpdate: function componentDidUpdate() {
    var self = this;
    if (!this.props.disabled && this._focusAfterUpdate) {
      clearTimeout(this._blurTimeout);
      this._focusTimeout = setTimeout(function() {
        self.getInputNode().focus();
        self._focusAfterUpdate = false;
      }, 50);
    }
    if (this._focusedOptionReveal) {
      if (this.refs.focused && this.refs.menu) {
        var focusedDOM = React.findDOMNode(this.refs.focused);
        var menuDOM = React.findDOMNode(this.refs.menu);
        var focusedRect = focusedDOM.getBoundingClientRect();
        var menuRect = menuDOM.getBoundingClientRect();
        if (focusedRect.bottom > menuRect.bottom || focusedRect.top < menuRect.top) {
          menuDOM.scrollTop = focusedDOM.offsetTop + focusedDOM.clientHeight - menuDOM.offsetHeight;
        }
      }
      this._focusedOptionReveal = false;
    }
  },
  focus: function focus() {
    this.getInputNode().focus();
  },
  clickedOutsideElement: function clickedOutsideElement(element, event) {
    var eventTarget = event.target ? event.target : event.srcElement;
    while (eventTarget != null) {
      if (eventTarget === element)
        return false;
      eventTarget = eventTarget.offsetParent;
    }
    return true;
  },
  getStateFromValue: function getStateFromValue(value, options, placeholder) {
    if (!options) {
      options = this.state.options;
    }
    if (!placeholder) {
      placeholder = this.props.placeholder;
    }
    this._optionsFilterString = '';
    var values = this.initValuesArray(value, options),
        filteredOptions = this.filterOptions(options, values);
    return {
      value: values.map(function(v) {
        return v.value;
      }).join(this.props.delimiter),
      values: values,
      inputValue: '',
      filteredOptions: filteredOptions,
      placeholder: !this.props.multi && values.length ? values[0].label : placeholder,
      focusedOption: !this.props.multi && values.length ? values[0] : filteredOptions[0]
    };
  },
  initValuesArray: function initValuesArray(values, options) {
    if (!Array.isArray(values)) {
      if (typeof values === 'string') {
        values = values === '' ? [] : values.split(this.props.delimiter);
      } else {
        values = values ? [values] : [];
      }
    }
    return values.map(function(val) {
      if (typeof val === 'string') {
        for (var key in options) {
          if (options.hasOwnProperty(key) && options[key] && options[key].value === val) {
            return options[key];
          }
        }
        return {
          value: val,
          label: val
        };
      } else {
        return val;
      }
    });
  },
  setValue: function setValue(value, focusAfterUpdate) {
    if (focusAfterUpdate || focusAfterUpdate === undefined) {
      this._focusAfterUpdate = true;
    }
    var newState = this.getStateFromValue(value);
    newState.isOpen = false;
    this.fireChangeEvent(newState);
    this.setState(newState);
  },
  selectValue: function selectValue(value) {
    if (!this.props.multi) {
      this.setValue(value);
    } else if (value) {
      this.addValue(value);
    }
    this._unbindCloseMenuIfClickedOutside();
  },
  addValue: function addValue(value) {
    this.setValue(this.state.values.concat(value));
  },
  popValue: function popValue() {
    this.setValue(this.state.values.slice(0, this.state.values.length - 1));
  },
  removeValue: function removeValue(valueToRemove) {
    this.setValue(this.state.values.filter(function(value) {
      return value !== valueToRemove;
    }));
  },
  clearValue: function clearValue(event) {
    if (event && event.type === 'mousedown' && event.button !== 0) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    this.setValue(null);
  },
  resetValue: function resetValue() {
    this.setValue(this.state.value === '' ? null : this.state.value);
  },
  getInputNode: function getInputNode() {
    var input = this.refs.input;
    return this.props.searchable ? input : React.findDOMNode(input);
  },
  fireChangeEvent: function fireChangeEvent(newState) {
    if (newState.value !== this.state.value && this.props.onChange) {
      this.props.onChange(newState.value, newState.values);
    }
  },
  handleMouseDown: function handleMouseDown(event) {
    if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    if (this.state.isFocused) {
      this.setState({isOpen: true}, this._bindCloseMenuIfClickedOutside);
    } else {
      this._openAfterFocus = true;
      this.getInputNode().focus();
    }
  },
  handleMouseDownOnArrow: function handleMouseDownOnArrow(event) {
    if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
      return;
    }
    if (!this.state.isOpen) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    this.setState({isOpen: false}, this._unbindCloseMenuIfClickedOutside);
  },
  handleInputFocus: function handleInputFocus(event) {
    var newIsOpen = this.state.isOpen || this._openAfterFocus;
    this.setState({
      isFocused: true,
      isOpen: newIsOpen
    }, function() {
      if (newIsOpen) {
        this._bindCloseMenuIfClickedOutside();
      } else {
        this._unbindCloseMenuIfClickedOutside();
      }
    });
    this._openAfterFocus = false;
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  },
  handleInputBlur: function handleInputBlur(event) {
    var self = this;
    this._blurTimeout = setTimeout(function() {
      if (self._focusAfterUpdate)
        return;
      self.setState({isFocused: false});
    }, 50);
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  },
  handleKeyDown: function handleKeyDown(event) {
    if (this.state.disabled)
      return;
    switch (event.keyCode) {
      case 8:
        if (!this.state.inputValue) {
          this.popValue();
        }
        return;
      case 9:
        if (event.shiftKey || !this.state.isOpen || !this.state.focusedOption) {
          return;
        }
        this.selectFocusedOption();
        break;
      case 13:
        if (!this.state.isOpen)
          return;
        this.selectFocusedOption();
        break;
      case 27:
        if (this.state.isOpen) {
          this.resetValue();
        } else {
          this.clearValue(event);
        }
        break;
      case 38:
        this.focusPreviousOption();
        break;
      case 40:
        this.focusNextOption();
        break;
      case 188:
        if (this.props.allowCreate && this.props.multi) {
          event.preventDefault();
          event.stopPropagation();
          this.selectFocusedOption();
        } else {
          return;
        }
        break;
      default:
        return;
    }
    event.preventDefault();
  },
  _getNewFocusedOption: function _getNewFocusedOption(filteredOptions) {
    for (var key in filteredOptions) {
      if (filteredOptions.hasOwnProperty(key) && filteredOptions[key] === this.state.focusedOption) {
        return filteredOptions[key];
      }
    }
    return filteredOptions[0];
  },
  handleInputChange: function handleInputChange(event) {
    this._optionsFilterString = event.target.value;
    if (this.props.asyncOptions) {
      this.setState({
        isLoading: true,
        inputValue: event.target.value
      });
      this.loadAsyncOptions(event.target.value, {
        isLoading: false,
        isOpen: true
      }, this._bindCloseMenuIfClickedOutside);
    } else {
      var filteredOptions = this.filterOptions(this.state.options);
      this.setState({
        isOpen: true,
        inputValue: event.target.value,
        filteredOptions: filteredOptions,
        focusedOption: this._getNewFocusedOption(filteredOptions)
      }, this._bindCloseMenuIfClickedOutside);
    }
  },
  autoloadAsyncOptions: function autoloadAsyncOptions() {
    var self = this;
    this.loadAsyncOptions(this.props.value || '', {}, function() {
      self.setValue(self.props.value, false);
    });
  },
  loadAsyncOptions: function loadAsyncOptions(input, state, callback) {
    var thisRequestId = this._currentRequestId = requestId++;
    for (var i = 0; i <= input.length; i++) {
      var cacheKey = input.slice(0, i);
      if (this._optionsCache[cacheKey] && (input === cacheKey || this._optionsCache[cacheKey].complete)) {
        var options = this._optionsCache[cacheKey].options;
        var filteredOptions = this.filterOptions(options);
        var newState = {
          options: options,
          filteredOptions: filteredOptions,
          focusedOption: this._getNewFocusedOption(filteredOptions)
        };
        for (var key in state) {
          if (state.hasOwnProperty(key)) {
            newState[key] = state[key];
          }
        }
        this.setState(newState);
        if (callback)
          callback.call(this, {});
        return;
      }
    }
    var self = this;
    this.props.asyncOptions(input, function(err, data) {
      if (err)
        throw err;
      self._optionsCache[input] = data;
      if (thisRequestId !== self._currentRequestId) {
        return;
      }
      var filteredOptions = self.filterOptions(data.options);
      var newState = {
        options: data.options,
        filteredOptions: filteredOptions,
        focusedOption: self._getNewFocusedOption(filteredOptions)
      };
      for (var key in state) {
        if (state.hasOwnProperty(key)) {
          newState[key] = state[key];
        }
      }
      self.setState(newState);
      if (callback)
        callback.call(self, {});
    });
  },
  filterOptions: function filterOptions(options, values) {
    if (!this.props.searchable) {
      return options;
    }
    var filterValue = this._optionsFilterString;
    var exclude = (values || this.state.values).map(function(i) {
      return i.value;
    });
    if (this.props.filterOptions) {
      return this.props.filterOptions.call(this, options, filterValue, exclude);
    } else {
      var filterOption = function filterOption(op) {
        if (this.props.multi && exclude.indexOf(op.value) > -1)
          return false;
        if (this.props.filterOption)
          return this.props.filterOption.call(this, op, filterValue);
        var valueTest = String(op.value),
            labelTest = String(op.label);
        if (this.props.ignoreCase) {
          valueTest = valueTest.toLowerCase();
          labelTest = labelTest.toLowerCase();
          filterValue = filterValue.toLowerCase();
        }
        return !filterValue || this.props.matchPos === 'start' ? this.props.matchProp !== 'label' && valueTest.substr(0, filterValue.length) === filterValue || this.props.matchProp !== 'value' && labelTest.substr(0, filterValue.length) === filterValue : this.props.matchProp !== 'label' && valueTest.indexOf(filterValue) >= 0 || this.props.matchProp !== 'value' && labelTest.indexOf(filterValue) >= 0;
      };
      return (options || []).filter(filterOption, this);
    }
  },
  selectFocusedOption: function selectFocusedOption() {
    if (this.props.allowCreate && !this.state.focusedOption) {
      return this.selectValue(this.state.inputValue);
    }
    return this.selectValue(this.state.focusedOption);
  },
  focusOption: function focusOption(op) {
    this.setState({focusedOption: op});
  },
  focusNextOption: function focusNextOption() {
    this.focusAdjacentOption('next');
  },
  focusPreviousOption: function focusPreviousOption() {
    this.focusAdjacentOption('previous');
  },
  focusAdjacentOption: function focusAdjacentOption(dir) {
    this._focusedOptionReveal = true;
    var ops = this.state.filteredOptions;
    if (!this.state.isOpen) {
      this.setState({
        isOpen: true,
        inputValue: '',
        focusedOption: this.state.focusedOption || ops[dir === 'next' ? 0 : ops.length - 1]
      }, this._bindCloseMenuIfClickedOutside);
      return;
    }
    if (!ops.length) {
      return;
    }
    var focusedIndex = -1;
    for (var i = 0; i < ops.length; i++) {
      if (this.state.focusedOption === ops[i]) {
        focusedIndex = i;
        break;
      }
    }
    var focusedOption = ops[0];
    if (dir === 'next' && focusedIndex > -1 && focusedIndex < ops.length - 1) {
      focusedOption = ops[focusedIndex + 1];
    } else if (dir === 'previous') {
      if (focusedIndex > 0) {
        focusedOption = ops[focusedIndex - 1];
      } else {
        focusedOption = ops[ops.length - 1];
      }
    }
    this.setState({focusedOption: focusedOption});
  },
  unfocusOption: function unfocusOption(op) {
    if (this.state.focusedOption === op) {
      this.setState({focusedOption: null});
    }
  },
  buildMenu: function buildMenu() {
    var focusedValue = this.state.focusedOption ? this.state.focusedOption.value : null;
    var renderLabel = this.props.optionRenderer || function(op) {
      return op.label;
    };
    if (this.state.filteredOptions.length > 0) {
      focusedValue = focusedValue == null ? this.state.filteredOptions[0] : focusedValue;
    }
    var options = this.state.filteredOptions;
    if (this.props.allowCreate && this.state.inputValue.trim()) {
      var inputValue = this.state.inputValue;
      options = options.slice();
      options.unshift({
        value: inputValue,
        label: inputValue,
        create: true
      });
    }
    var ops = Object.keys(options).map(function(key) {
      var op = options[key];
      var isSelected = this.state.value === op.value;
      var isFocused = focusedValue === op.value;
      var optionClass = classes({
        'Select-option': true,
        'is-selected': isSelected,
        'is-focused': isFocused,
        'is-disabled': op.disabled
      });
      var ref = isFocused ? 'focused' : null;
      var mouseEnter = this.focusOption.bind(this, op);
      var mouseLeave = this.unfocusOption.bind(this, op);
      var mouseDown = this.selectValue.bind(this, op);
      var renderedLabel = renderLabel(op);
      return op.disabled ? React.createElement('div', {
        ref: ref,
        key: 'option-' + op.value,
        className: optionClass
      }, renderedLabel) : React.createElement('div', {
        ref: ref,
        key: 'option-' + op.value,
        className: optionClass,
        onMouseEnter: mouseEnter,
        onMouseLeave: mouseLeave,
        onMouseDown: mouseDown,
        onClick: mouseDown
      }, op.create ? this.props.addLabelText.replace('{label}', op.label) : renderedLabel);
    }, this);
    return ops.length ? ops : React.createElement('div', {className: 'Select-noresults'}, this.props.asyncOptions && !this.state.inputValue ? this.props.searchPromptText : this.props.noResultsText);
  },
  handleOptionLabelClick: function handleOptionLabelClick(value, event) {
    if (this.props.onOptionLabelClick) {
      this.props.onOptionLabelClick(value, event);
    }
  },
  render: function render() {
    var selectClass = classes('Select', this.props.className, {
      'is-multi': this.props.multi,
      'is-searchable': this.props.searchable,
      'is-open': this.state.isOpen,
      'is-focused': this.state.isFocused,
      'is-loading': this.state.isLoading,
      'is-disabled': this.props.disabled,
      'has-value': this.state.value
    });
    var value = [];
    if (this.props.multi) {
      this.state.values.forEach(function(val) {
        value.push(React.createElement(Value, {
          key: val.value,
          option: val,
          renderer: this.props.valueRenderer,
          optionLabelClick: !!this.props.onOptionLabelClick,
          onOptionLabelClick: this.handleOptionLabelClick.bind(this, val),
          onRemove: this.removeValue.bind(this, val),
          disabled: this.props.disabled
        }));
      }, this);
    }
    if (!this.state.inputValue && (!this.props.multi || !value.length)) {
      value.push(React.createElement('div', {
        className: 'Select-placeholder',
        key: 'placeholder'
      }, this.state.placeholder));
    }
    var loading = this.state.isLoading ? React.createElement('span', {
      className: 'Select-loading',
      'aria-hidden': 'true'
    }) : null;
    var clear = this.props.clearable && this.state.value && !this.props.disabled ? React.createElement('span', {
      className: 'Select-clear',
      title: this.props.multi ? this.props.clearAllText : this.props.clearValueText,
      'aria-label': this.props.multi ? this.props.clearAllText : this.props.clearValueText,
      onMouseDown: this.clearValue,
      onClick: this.clearValue,
      dangerouslySetInnerHTML: {__html: '&times;'}
    }) : null;
    var menu;
    var menuProps;
    if (this.state.isOpen) {
      menuProps = {
        ref: 'menu',
        className: 'Select-menu'
      };
      if (this.props.multi) {
        menuProps.onMouseDown = this.handleMouseDown;
      }
      menu = React.createElement('div', {
        ref: 'selectMenuContainer',
        className: 'Select-menu-outer'
      }, React.createElement('div', menuProps, this.buildMenu()));
    }
    var input;
    var inputProps = {
      ref: 'input',
      className: 'Select-input',
      tabIndex: this.props.tabIndex || 0,
      onFocus: this.handleInputFocus,
      onBlur: this.handleInputBlur
    };
    for (var key in this.props.inputProps) {
      if (this.props.inputProps.hasOwnProperty(key)) {
        inputProps[key] = this.props.inputProps[key];
      }
    }
    if (!this.props.disabled) {
      if (this.props.searchable) {
        input = React.createElement(Input, _extends({
          value: this.state.inputValue,
          onChange: this.handleInputChange,
          minWidth: '5'
        }, inputProps));
      } else {
        input = React.createElement('div', inputProps, ' ');
      }
    } else if (!this.props.multi || !this.state.values.length) {
      input = React.createElement('div', {className: 'Select-input'}, ' ');
    }
    return React.createElement('div', {
      ref: 'wrapper',
      className: selectClass
    }, React.createElement('input', {
      type: 'hidden',
      ref: 'value',
      name: this.props.name,
      value: this.state.value,
      disabled: this.props.disabled
    }), React.createElement('div', {
      className: 'Select-control',
      ref: 'control',
      onKeyDown: this.handleKeyDown,
      onMouseDown: this.handleMouseDown,
      onTouchEnd: this.handleMouseDown
    }, value, input, React.createElement('span', {
      className: 'Select-arrow-zone',
      onMouseDown: this.handleMouseDownOnArrow
    }), React.createElement('span', {
      className: 'Select-arrow',
      onMouseDown: this.handleMouseDownOnArrow
    }), loading, clear), menu);
  }
});
module.exports = Select;
