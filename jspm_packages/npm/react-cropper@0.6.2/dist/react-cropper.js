/* */ 
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _cropperjs = require('cropperjs');

var _cropperjs2 = _interopRequireDefault(_cropperjs);

require('cropperjs/dist/cropper.css');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactCropper = function (_Component) {
  _inherits(ReactCropper, _Component);

  function ReactCropper() {
    _classCallCheck(this, ReactCropper);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ReactCropper).apply(this, arguments));
  }

  _createClass(ReactCropper, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var options = {};
      for (var prop in this.props) {
        if (prop !== 'src' && prop !== 'alt' && prop !== 'crossOrigin') {
          options[prop] = this.props[prop];
        }
      }
      this.img = _reactDom2.default.findDOMNode(this.refs.img);
      this.cropper = new _cropperjs2.default(this.img, options);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.src !== this.props.src) {
        this.cropper.reset().clear().replace(nextProps.src);
      }
      if (nextProps.aspectRatio !== this.props.aspectRatio) {
        this.setAspectRatio(nextProps.aspectRatio);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.img) {
        // Destroy the cropper, this makes sure events such as resize are cleaned up and do not leak
        this.cropper.destroy();
        delete this.img;
        delete this.cropper;
      }
    }
  }, {
    key: 'setDragMode',
    value: function setDragMode() {
      return this.cropper.setDragMode();
    }
  }, {
    key: 'setAspectRatio',
    value: function setAspectRatio(aspectRatio) {
      return this.cropper.setAspectRatio(aspectRatio);
    }
  }, {
    key: 'getCroppedCanvas',
    value: function getCroppedCanvas(options) {
      return this.cropper.getCroppedCanvas(options);
    }
  }, {
    key: 'setCropBoxData',
    value: function setCropBoxData(data) {
      return this.cropper.setCropBoxData(data);
    }
  }, {
    key: 'getCropBoxData',
    value: function getCropBoxData() {
      return this.cropper.getCropBoxData();
    }
  }, {
    key: 'setCanvasData',
    value: function setCanvasData(data) {
      return this.cropper.setCanvasData(data);
    }
  }, {
    key: 'getCanvasData',
    value: function getCanvasData() {
      return this.cropper.getCanvasData();
    }
  }, {
    key: 'getImageData',
    value: function getImageData() {
      return this.cropper.getImageData();
    }
  }, {
    key: 'getContainerData',
    value: function getContainerData() {
      return this.cropper.getContainerData();
    }
  }, {
    key: 'setData',
    value: function setData(data) {
      return this.cropper.setData(data);
    }
  }, {
    key: 'getData',
    value: function getData(rounded) {
      return this.cropper.getData(rounded);
    }
  }, {
    key: 'crop',
    value: function crop() {
      return this.cropper.crop;
    }
  }, {
    key: 'move',
    value: function move(offsetX, offsetY) {
      return this.cropper.move(offsetX, offsetY);
    }
  }, {
    key: 'zoom',
    value: function zoom(ratio) {
      return this.cropper.zoom(ratio);
    }
  }, {
    key: 'rotate',
    value: function rotate(degree) {
      return this.cropper.rotate(degree);
    }
  }, {
    key: 'enable',
    value: function enable() {
      return this.cropper.enable();
    }
  }, {
    key: 'disable',
    value: function disable() {
      return this.cropper.disable();
    }
  }, {
    key: 'reset',
    value: function reset() {
      return this.cropper.reset();
    }
  }, {
    key: 'clear',
    value: function clear() {
      return this.cropper.clear();
    }
  }, {
    key: 'replace',
    value: function replace(url) {
      return this.cropper.replace(url);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        _extends({}, this.props, { src: null, crossOrigin: null, alt: null }),
        _react2.default.createElement('img', {
          crossOrigin: this.props.crossOrigin,
          ref: 'img',
          src: this.props.src,
          alt: this.props.alt === undefined ? 'picture' : this.props.alt,
          style: { opacity: 0 }
        })
      );
    }
  }]);

  return ReactCropper;
}(_react.Component);

ReactCropper.propTypes = {
  // react cropper options
  crossOrigin: _react.PropTypes.string,
  src: _react.PropTypes.string,
  alt: _react.PropTypes.string,

  // cropper options
  aspectRatio: _react.PropTypes.number,
  crop: _react.PropTypes.func,
  preview: _react.PropTypes.string,
  strict: _react.PropTypes.bool,
  responsive: _react.PropTypes.bool,
  checkImageOrigin: _react.PropTypes.bool,
  background: _react.PropTypes.bool,
  modal: _react.PropTypes.bool,
  guides: _react.PropTypes.bool,
  highlight: _react.PropTypes.bool,
  autoCrop: _react.PropTypes.bool,
  autoCropArea: _react.PropTypes.number,
  dragCrop: _react.PropTypes.bool,
  movable: _react.PropTypes.bool,
  cropBoxMovable: _react.PropTypes.bool,
  cropBoxResizable: _react.PropTypes.bool,
  doubleClickToggle: _react.PropTypes.bool,
  zoomable: _react.PropTypes.bool,
  mouseWheelZoom: _react.PropTypes.bool,
  touchDragZoom: _react.PropTypes.bool,
  rotatable: _react.PropTypes.bool,
  minContainerWidth: _react.PropTypes.number,
  minContainerHeight: _react.PropTypes.number,
  minCanvasWidth: _react.PropTypes.number,
  minCanvasHeight: _react.PropTypes.number,
  minCropBoxWidth: _react.PropTypes.number,
  minCropBoxHeight: _react.PropTypes.number,
  build: _react.PropTypes.func,
  built: _react.PropTypes.func,
  dragstart: _react.PropTypes.func,
  dragmove: _react.PropTypes.func,
  dragend: _react.PropTypes.func,
  zoomin: _react.PropTypes.func,
  zoomout: _react.PropTypes.func
};
ReactCropper.defaultProps = {
  src: null
};

exports.default = ReactCropper;
