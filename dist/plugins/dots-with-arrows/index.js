"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Index;

require("./styles.css");

var _Controls = require("../../components/Controls");

function Index(props) {
  const {
    prevSlide,
    nextSlide,
    activeSlide,
    groupCount
  } = props;
  return /*#__PURE__*/React.createElement("div", {
    className: 'snapslider-plugin-dots-with-arrows'
  }, /*#__PURE__*/React.createElement(_Controls.Arrow, {
    onClick: prevSlide,
    label: /*#__PURE__*/React.createElement(_Controls.ArrowPrevIcon, null),
    isDisabled: activeSlide === 1
  }), /*#__PURE__*/React.createElement(_Controls.Dots, props), /*#__PURE__*/React.createElement(_Controls.Arrow, {
    onClick: nextSlide,
    label: /*#__PURE__*/React.createElement(_Controls.ArrowNextIcon, null),
    isDisabled: activeSlide === groupCount,
    isNext: true
  }));
}