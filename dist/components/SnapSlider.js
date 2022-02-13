"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SnapSlider;

require("core-js/modules/web.dom-collections.iterator.js");

require("../styles/main.scss");

var _react = _interopRequireWildcard(require("react"));

var _usePlugins = _interopRequireDefault(require("../usePlugins"));

var _dragPlugin = _interopRequireDefault(require("../plugins/dragPlugin"));

var _context = require("../utils/context");

var _setup = require("../utils/setup");

var _Controls = require("./Controls");

const _excluded = ["initActiveSlide", "plugins", "onScroll", "children", "onUpdateSettings", "topControls", "showTopControls", "bottomControls", "showBottomControls", "className"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function SnapSlider(_ref) {
  let {
    initActiveSlide = 1,
    plugins = [_dragPlugin.default],
    onScroll = () => {},
    children = [],
    onUpdateSettings = () => {},
    topControls,
    showTopControls = true,
    bottomControls,
    showBottomControls = true,
    className = "true"
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  console.log('render slider'); //eslint-disable-line

  const [activeSlide, setActiveSlide] = (0, _react.useState)(initActiveSlide);
  const ref = (0, _react.useRef)();
  const trackRef = (0, _react.useRef)();
  const slides = Array.isArray(children) ? children : [children];
  const {
    slidesWithGroups,
    trackStyles,
    groupStyles,
    slideStyles,
    slidesCount
  } = (0, _setup.setupSlides)(slides, props);

  const prevSlide = () => {
    (0, _setup.handleSlideChange)(activeSlide === 1 ? slidesCount : activeSlide - 1, trackRef);
  };

  const nextSlide = () => {
    (0, _setup.handleSlideChange)(activeSlide === slidesCount ? 1 : activeSlide + 1, trackRef);
  };

  const goToSlide = newSlide => {
    (0, _setup.handleSlideChange)(newSlide, trackRef);
  };

  const additionalProps = {
    sliderRef: ref,
    trackRef,
    activeSlide,
    slidesCount,
    groupCount: Object.keys(slidesWithGroups).length,
    settings: props,
    prevSlide,
    nextSlide,
    goToSlide
  };
  const [settings] = (0, _usePlugins.default)(trackRef, additionalProps, plugins, slides);
  (0, _react.useEffect)(() => {
    if (trackRef.current) {
      trackRef.current.addEventListener('scroll', e => {
        (0, _setup.handleActiveSlide)(trackRef, e.target.scrollLeft, setActiveSlide);
        onScroll(e.target.scrollLeft, additionalProps);
      });
    }
  }, [trackRef]); //eslint-disable-line

  console.log('Test'); //eslint-disable-line

  return /*#__PURE__*/_react.default.createElement(_context.SliderContext.Provider, {
    value: {
      sliderRef: ref,
      settings
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    ref: ref,
    className: "snapslider ".concat(className),
    style: {
      "--snapslider-gab": settings.gap
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: 'snapslider--inner'
  }, showTopControls && (topControls ? topControls(additionalProps) : /*#__PURE__*/_react.default.createElement(_Controls.Arrows, additionalProps)), /*#__PURE__*/_react.default.createElement(Track, {
    slidesWithGroups,
    trackStyles,
    groupStyles,
    slideStyles,
    trackRef
  })), showBottomControls && (bottomControls ? bottomControls(additionalProps) : /*#__PURE__*/_react.default.createElement(_Controls.Dots, additionalProps))));
}

SnapSlider.defautlProps = {
  itemsPerGroup: 1,
  groupSize: '95%',
  gap: '1rem'
};

const Track = _ref2 => {
  let {
    slidesWithGroups,
    trackStyles,
    groupStyles,
    slideStyles,
    trackRef
  } = _ref2;
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: trackRef,
    className: 'snapslider--track',
    style: trackStyles
  }, Object.values(slidesWithGroups).map((slides, key) => /*#__PURE__*/_react.default.createElement(Group, {
    key: key,
    slides,
    groupStyles,
    slideStyles
  })));
};

const Group = _ref3 => {
  let {
    slides,
    groupStyles,
    slideStyles
  } = _ref3;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: 'snapslider--group',
    style: groupStyles
  }, slides.map((slide, key) => /*#__PURE__*/_react.default.createElement(Slide, {
    key: key,
    slideContent: slide.content,
    slideStyles: slideStyles
  })));
};

const Slide = _ref4 => {
  let {
    slideContent,
    slideStyles
  } = _ref4;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: 'snapslider--slide',
    style: slideStyles
  }, slideContent);
};