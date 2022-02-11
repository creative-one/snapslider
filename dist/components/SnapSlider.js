"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SnapSlider;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

require("./SnapSlider.scss");

var _lodash = _interopRequireDefault(require("lodash"));

var _dragPlugin = _interopRequireDefault(require("../dragPlugin"));

var _usePlugins = _interopRequireDefault(require("../usePlugins"));

const _excluded = ["plugins", "children", "onUpdateSettings"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function SnapSlider(_ref) {
  let {
    plugins = [_dragPlugin.default],
    children = [],
    onUpdateSettings = () => {}
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  console.log('render slider'); //eslint-disable-line

  const sliderRef = (0, _react.useRef)();
  const trackRef = (0, _react.useRef)();
  const [settings] = (0, _usePlugins.default)(trackRef, props, plugins, children);
  const {
    itemsPerGroup,
    groupSize,
    gap
  } = settings;
  console.log(itemsPerGroup); //eslint-disable-line

  (0, _react.useEffect)(() => {//onUpdateSettings(settings)
  }, [settings, onUpdateSettings]);
  const slides = Array.isArray(children) ? children : [children];

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
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: sliderRef,
    className: 'snapslider',
    style: {
      "--snapslider-gab": gap
    }
  }, /*#__PURE__*/_react.default.createElement(Track, {
    slidesWithGroups,
    trackStyles,
    groupStyles,
    slideStyles,
    trackRef
  }));
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