"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Arrows", {
  enumerable: true,
  get: function get() {
    return _Controls.Arrows;
  }
});
Object.defineProperty(exports, "Dots", {
  enumerable: true,
  get: function get() {
    return _Controls.Dots;
  }
});
exports.default = void 0;

var _SnapSlider = _interopRequireDefault(require("./components/SnapSlider"));

var _Controls = require("./components/Controls");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _SnapSlider.default;
exports.default = _default;