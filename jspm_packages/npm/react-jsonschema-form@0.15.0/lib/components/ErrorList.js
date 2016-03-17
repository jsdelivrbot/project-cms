/* */ 
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ErrorList;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function ErrorList(_ref) {
  var errors = _ref.errors;

  return _react2["default"].createElement(
    "div",
    { className: "errors" },
    _react2["default"].createElement(
      "h2",
      null,
      "Errors"
    ),
    _react2["default"].createElement(
      "ul",
      null,
      errors.map(function (error, i) {
        return _react2["default"].createElement(
          "li",
          { key: i },
          error.stack
        );
      })
    )
  );
}

module.exports = exports["default"];