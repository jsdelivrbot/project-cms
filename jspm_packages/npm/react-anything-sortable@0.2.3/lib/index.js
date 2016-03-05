/* */ 
"use strict";
var _interopRequire = function(obj) {
  return obj && obj.__esModule ? obj["default"] : obj;
};
exports.__esModule = true;
"use strict";
var React = _interopRequire(require('react/addons'));
var _utilsJs = require('./utils');
var on = _utilsJs.on;
var off = _utilsJs.off;
var isFunction = _utilsJs.isFunction;
var isNumeric = _utilsJs.isNumeric;
var position = _utilsJs.position;
var closest = _utilsJs.closest;
var get = _utilsJs.get;
var assign = _utilsJs.assign;
var width = _utilsJs.width;
var height = _utilsJs.height;
var outerWidthWithMargin = _utilsJs.outerWidthWithMargin;
var outerHeightWithMargin = _utilsJs.outerHeightWithMargin;
var CX = React.addons.classSet;
var CloneWithProps = React.addons.cloneWithProps;
exports["default"] = React.createClass({
  displayName: "index",
  propTypes: {
    onSort: React.PropTypes.func,
    className: React.PropTypes.string
  },
  getInitialState: function getInitialState() {
    this._dimensionArr = this.props.children ? Array.isArray(this.props.children) ? this.props.children.map(function() {
      return {};
    }) : [{}] : [];
    this._orderArr = [];
    var i = 0;
    while (i < this._dimensionArr.length) {
      this._orderArr.push(i++);
    }
    return {
      isDragging: false,
      placeHolderIndex: null,
      left: null,
      top: null
    };
  },
  componentDidMount: function componentDidMount() {
    this.containerWidth = this.getDOMNode().offsetWidth;
  },
  componentWillUnmount: function componentWillUnmount() {
    this.unbindEvent();
  },
  bindEvent: function bindEvent() {
    var _this = this;
    this.__mouseMoveHandler = function(e) {
      if ((e.pageX || e.clientX) === _this._prevX && (e.pageY || e.clientY) === _this._prevY || _this._prevX === null && _this._prevY === null) {
        return false;
      }
      _this.handleMouseMove.call(_this, e);
    };
    this.__mouseUpHandler = function(e) {
      _this.handleMouseUp.call(_this, e);
    };
    on(document, "mousemove", this.__mouseMoveHandler);
    on(document, "mouseup", this.__mouseUpHandler);
  },
  unbindEvent: function unbindEvent() {
    off(document, "mousemove", this.__mouseMoveHandler);
    off(document, "mouseup", this.__mouseUpHandler);
    this.__mouseMoveHandler = null;
    this.__mouseUpHandler = null;
  },
  handleMouseDown: function handleMouseDown(e, index) {
    this._draggingIndex = index;
    this._prevX = e.pageX || e.clientX;
    this._prevY = e.pageY || e.clientY;
    this._initOffset = e.offset;
    this._isReadyForDragging = true;
    this._hasInitDragging = false;
    this.bindEvent();
  },
  handleMouseMove: function handleMouseMove(e) {
    this._isMouseMoving = true;
    if (!this._isReadyForDragging) {
      return false;
    }
    if (!this._hasInitDragging) {
      this._dimensionArr[this._draggingIndex].isPlaceHolder = true;
      this._hasInitDragging = false;
    }
    var newOffset = this.calculateNewOffset(e);
    var newIndex = this.calculateNewIndex(e);
    this._draggingIndex = newIndex;
    this.setState({
      isDragging: true,
      top: newOffset.top,
      left: newOffset.left,
      placeHolderIndex: newIndex
    });
    this._prevX = e.pageX || e.clientX;
    this._prevY = e.pageY || e.clientY;
  },
  handleMouseUp: function handleMouseUp() {
    var _hasMouseMoved = this._isMouseMoving;
    this.unbindEvent();
    this._draggingIndex = null;
    this._isReadyForDragging = false;
    this._isMouseMoving = false;
    this._initOffset = null;
    this._prevX = null;
    this._prevY = null;
    if (this.state.isDragging) {
      this._dimensionArr[this.state.placeHolderIndex].isPlaceHolder = false;
      if (isFunction(this.props.onSort)) {
        this.props.onSort(this.getSortData());
      }
    }
    if (this.isMounted() && _hasMouseMoved) {
      this.setState({
        isDragging: false,
        placeHolderIndex: null,
        left: null,
        top: null
      });
    }
  },
  handleChildUpdate: function handleChildUpdate(offset, width, height, fullWidth, fullHeight, index) {
    assign(this._dimensionArr[index], {
      top: offset.top,
      left: offset.left,
      width: width,
      height: height,
      fullWidth: fullWidth,
      fullHeight: fullHeight
    });
  },
  getIndexByOffset: function getIndexByOffset(offset, direction) {
    var _this = this;
    if (!offset || !isNumeric(offset.top) || !isNumeric(offset.left)) {
      return 0;
    }
    var _dimensionArr = this._dimensionArr;
    var offsetX = offset.left;
    var offsetY = offset.top;
    var prevIndex = this.state.placeHolderIndex !== null ? this.state.placeHolderIndex : this._draggingIndex;
    var newIndex = undefined;
    _dimensionArr.every(function(coord, index) {
      var relativeLeft = offsetX - coord.left;
      var relativeTop = offsetY - coord.top;
      if (offsetX < 0) {
        newIndex = 0;
        return false;
      } else if (offsetX > _this.containerWidth) {
        newIndex = _dimensionArr.length - 1;
        return false;
      } else if (relativeLeft < coord.fullWidth && relativeTop < coord.fullHeight) {
        if (relativeLeft < coord.fullWidth / 2 && direction === "left") {
          newIndex = index;
        } else if (relativeLeft > coord.fullWidth / 2 && direction === "right") {
          newIndex = Math.min(index + 1, _dimensionArr.length - 1);
        }
        return false;
      }
      return true;
    });
    return newIndex !== undefined ? newIndex : prevIndex;
  },
  swapArrayItemPosition: function swapArrayItemPosition(arr, src, to) {
    if (!arr || !isNumeric(src) || !isNumeric(to)) {
      return arr;
    }
    var srcEl = arr.splice(src, 1)[0];
    arr.splice(to, 0, srcEl);
    return arr;
  },
  calculateNewOffset: function calculateNewOffset(e) {
    var deltaX = this._prevX - (e.pageX || e.clientX);
    var deltaY = this._prevY - (e.pageY || e.clientY);
    var prevLeft = this.state.left !== null ? this.state.left : this._initOffset.left;
    var prevTop = this.state.top !== null ? this.state.top : this._initOffset.top;
    var newLeft = prevLeft - deltaX;
    var newTop = prevTop - deltaY;
    return {
      left: newLeft,
      top: newTop
    };
  },
  calculateNewIndex: function calculateNewIndex(e) {
    var placeHolderIndex = this.state.placeHolderIndex !== null ? this.state.placeHolderIndex : this._draggingIndex;
    var target = closest(e.target || e.srcElement, ".ui-sortable-item") || get(".ui-sortable-dragging");
    var offset = position(target);
    var direction = this._prevX > (e.pageX || e.clientX) ? "left" : "right";
    var newIndex = this.getIndexByOffset(offset, direction);
    if (newIndex !== placeHolderIndex) {
      this._dimensionArr = this.swapArrayItemPosition(this._dimensionArr, placeHolderIndex, newIndex);
      this._orderArr = this.swapArrayItemPosition(this._orderArr, placeHolderIndex, newIndex);
    }
    return newIndex;
  },
  getSortData: function getSortData() {
    var _this = this;
    return this._orderArr.map(function(itemIndex, index) {
      if (_this._dimensionArr[index].isDeleted) {
        return undefined;
      }
      var item = Array.isArray(_this.props.children) ? _this.props.children[itemIndex] : _this.props.children;
      if (!item) {
        return undefined;
      }
      return item.props.sortData;
    });
  },
  renderItems: function renderItems() {
    var _this = this;
    var _ref = this;
    var _dimensionArr = _ref._dimensionArr;
    var _orderArr = _ref._orderArr;
    var draggingItem = undefined;
    var items = _orderArr.map(function(itemIndex, index) {
      var item = Array.isArray(_this.props.children) ? _this.props.children[itemIndex] : _this.props.children;
      if (_dimensionArr[index].isDeleted) {
        return undefined;
      }
      if (!item) {
        return undefined;
      }
      if (index === _this._draggingIndex) {
        draggingItem = _this.renderDraggingItem(item);
      }
      var isPlaceHolder = _dimensionArr[index].isPlaceHolder;
      var itemClassName = CX({
        "ui-sortable-item": true,
        "ui-sortable-placeholder": isPlaceHolder,
        visible: _this.state.isDragging && isPlaceHolder
      });
      return CloneWithProps(item, {
        key: index,
        sortableClassName: itemClassName,
        sortableIndex: index,
        onSortableItemMouseDown: isPlaceHolder ? undefined : function(e) {
          _this.handleMouseDown.call(_this, e, index);
        },
        onSortableItemMount: _this.handleChildUpdate
      });
    });
    return items.concat([draggingItem]);
  },
  renderDraggingItem: function renderDraggingItem(item) {
    if (!item) {
      return;
    }
    var style = {
      top: this.state.top,
      left: this.state.left,
      width: this._dimensionArr[this._draggingIndex].width,
      height: this._dimensionArr[this._draggingIndex].height
    };
    return CloneWithProps(item, {
      sortableClassName: "ui-sortable-item ui-sortable-dragging",
      key: this._dimensionArr.length,
      sortableStyle: style,
      isDragging: true
    });
  },
  render: function render() {
    var className = "ui-sortable " + (this.props.className || "");
    return React.createElement("div", {className: className}, this.renderItems());
  }
});
var SortableItemMixin = {
  getDefaultProps: function getDefaultProps() {
    return {
      sortableClassName: "",
      sortableStyle: {},
      onSortableItemMount: function() {},
      onSortableItemUnmount: function() {},
      onSortableItemMouseDown: function() {}
    };
  },
  handleSortableItemMouseDown: function handleSortableItemMouseDown(e) {
    var target = closest(e.target || e.srcElement, ".ui-sortable-item");
    var evt = {
      pageX: e.pageX || e.clientX,
      pageY: e.pageY || e.clientY,
      offset: position(target)
    };
    this.props.onSortableItemMouseDown(evt, this.props.sortableIndex);
  },
  componentDidMount: function componentDidMount() {
    var node = this.getDOMNode();
    on(node, "selectstart", function(e) {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
    });
    this.props.onSortableItemMount(position(node), width(node), height(node), outerWidthWithMargin(node), outerHeightWithMargin(node), this.props.sortableIndex);
  },
  componentDidUpdate: function componentDidUpdate() {
    var node = this.getDOMNode();
    this.props.onSortableItemMount(position(node), width(node), height(node), outerWidthWithMargin(node), outerHeightWithMargin(node), this.props.sortableIndex);
  },
  renderWithSortable: function renderWithSortable(item) {
    return React.addons.cloneWithProps(item, {
      className: this.props.sortableClassName,
      style: this.props.sortableStyle,
      key: this.props.sortableIndex,
      onMouseDown: this.handleSortableItemMouseDown
    });
  }
};
exports.SortableItemMixin = SortableItemMixin;
