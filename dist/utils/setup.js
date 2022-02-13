"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupSlides = exports.handleSlideChange = exports.handleActiveSlide = void 0;

require("core-js/modules/es.array.reduce.js");

var _lodash = _interopRequireDefault(require("lodash"));

var _helper = require("./helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const setupSlides = (slides, settings) => {
  const {
    itemsPerGroup,
    groupSize
  } = settings;
  const slidesCount = slides.length;

  const slidesWithGroups = _lodash.default.groupBy(slides.map((slide, key) => {
    return {
      content: slide,
      group: key / itemsPerGroup
    };
  }), slide => Math.floor(slide.group));

  const trackStyles = {
    gridAutoColumns: "".concat(groupSize)
  };
  const groupStyles = {
    gridAutoColumns: "minmax(auto, ".concat(100 / itemsPerGroup, "%)")
  };
  const slideStyles = {};
  return {
    slidesWithGroups,
    trackStyles,
    groupStyles,
    slideStyles,
    slidesCount
  };
};

exports.setupSlides = setupSlides;

const handleSlideChange = function handleSlideChange(newSlide, trackRef) {
  let changeStartCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : () => {};
  let changeEndCallback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : () => {};
  const slides = Array.from(trackRef.current.querySelectorAll('.snapslider--group'));
  const newActive = slides[newSlide - 1];

  if (newActive) {
    trackRef.current.scrollTo({
      left: (0, _helper.inlineOffset)(trackRef, newActive.offsetLeft),
      behavior: 'smooth'
    });
    changeStartCallback(newSlide, slides);
    (0, _helper.checkIfScrollToIsFinished)(newActive.offsetLeft, trackRef).then(() => {
      changeEndCallback(newSlide, slides);
    });
  }
};

exports.handleSlideChange = handleSlideChange;

const handleActiveSlide = (trackRef, scrollLeft, setActiveSlide) => {
  const slides = Array.from(trackRef.current.querySelectorAll('.snapslider--group'));

  if (slides) {
    const slidesLeftValues = slides.length ? Array.from(slides).map(slide => {
      return (0, _helper.inlineOffset)(trackRef, slide.offsetLeft);
    }) : [];
    const closest = slidesLeftValues.reduce(function (prev, curr) {
      return Math.abs(curr - scrollLeft) < Math.abs(prev - scrollLeft) ? curr : prev;
    });
    const activeSlide = slidesLeftValues.indexOf(closest);

    if (activeSlide >= 0) {
      setActiveSlide(activeSlide + 1);
    }
  }
};

exports.handleActiveSlide = handleActiveSlide;