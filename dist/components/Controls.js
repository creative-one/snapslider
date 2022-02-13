"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DotsWithArrows = exports.Dots = exports.Arrows = exports.ArrowPrevIcon = exports.ArrowNextIcon = exports.Arrow = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ArrowPrevIcon = () => /*#__PURE__*/_react.default.createElement("svg", {
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  x: "0px",
  y: "0px",
  viewBox: "0 0 50 50"
}, /*#__PURE__*/_react.default.createElement("polygon", {
  points: "31,5 36,5 19,25 36,45 31,45 14,25 "
}));

exports.ArrowPrevIcon = ArrowPrevIcon;

const ArrowNextIcon = () => /*#__PURE__*/_react.default.createElement("svg", {
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  x: "0px",
  y: "0px",
  viewBox: "0 0 50 50"
}, /*#__PURE__*/_react.default.createElement("polygon", {
  points: "19,5 14,5 31,25 14,45 19,45 36,25 "
}));

exports.ArrowNextIcon = ArrowNextIcon;

const Arrow = _ref => {
  let {
    isNext = false,
    onClick,
    label,
    isDisabled
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("button", {
    className: "snapslider--arrow ".concat(isNext ? 'prev' : 'next', " ").concat(isDisabled ? 'disabled' : ''),
    onClick: onClick
  }, label);
};

exports.Arrow = Arrow;

const Arrows = _ref2 => {
  let {
    prevSlide,
    nextSlide,
    labels = {
      prev: /*#__PURE__*/_react.default.createElement(ArrowPrevIcon, null),
      next: /*#__PURE__*/_react.default.createElement(ArrowNextIcon, null)
    },
    activeSlide,
    groupCount
  } = _ref2;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: 'snapslider--arrows'
  }, /*#__PURE__*/_react.default.createElement(Arrow, {
    onClick: prevSlide,
    label: labels.prev,
    isDisabled: activeSlide === 1
  }), /*#__PURE__*/_react.default.createElement(Arrow, {
    onClick: nextSlide,
    label: labels.next,
    isDisabled: activeSlide === groupCount,
    isNext: true
  }));
};

exports.Arrows = Arrows;

const Dots = _ref3 => {
  let {
    groupCount,
    goToSlide,
    withIndex = false,
    activeSlide
  } = _ref3;
  const dots = Array(groupCount).fill(undefined);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: 'snapslider--dots'
  }, dots.map((dot, key) => /*#__PURE__*/_react.default.createElement("button", {
    key: key,
    "data-slide": key,
    className: "snapslider--dot ".concat(activeSlide === key + 1 ? 'active' : ''),
    onClick: () => goToSlide(key + 1)
  }, withIndex && key + 1)));
};

exports.Dots = Dots;

const DotsWithArrows = props => {
  const {
    prevSlide,
    nextSlide,
    activeSlide,
    groupCount
  } = props;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: 'snapslider---dots-with-arrows'
  }, /*#__PURE__*/_react.default.createElement(Arrow, {
    onClick: prevSlide,
    label: /*#__PURE__*/_react.default.createElement(ArrowPrevIcon, null),
    isDisabled: activeSlide === 1
  }), /*#__PURE__*/_react.default.createElement(Dots, props), /*#__PURE__*/_react.default.createElement(Arrow, {
    onClick: nextSlide,
    label: /*#__PURE__*/_react.default.createElement(ArrowNextIcon, null),
    isDisabled: activeSlide === groupCount,
    isNext: true
  }));
};

exports.DotsWithArrows = DotsWithArrows;