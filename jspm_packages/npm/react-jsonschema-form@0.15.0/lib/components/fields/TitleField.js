/* */ 
(function(process) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {"default": obj};
  }
  var _react = require('react');
  var _react2 = _interopRequireDefault(_react);
  function TitleField(props) {
    return _react2["default"].createElement("legend", null, props.title);
  }
  if (process.env.NODE_ENV !== "production") {
    TitleField.propTypes = {title: _react.PropTypes.string};
  }
  exports["default"] = TitleField;
  module.exports = exports["default"];
})(require('process'));
