"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = usePlugins;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = require("react");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function usePlugins(ref, props, plugins, slides) {
  const init = (0, _react.useRef)(true);
  const [settings, setSettings] = (0, _react.useState)(props);

  const updateSettings = data => {
    console.log('updateSettings'); //eslint-disable-line

    setSettings(prev => {
      return _objectSpread(_objectSpread({}, prev), data);
    });
  }; //updatable props


  const {
    itemsPerGroup,
    groupSize
  } = props;
  (0, _react.useEffect)(() => {
    updateSettings({
      itemsPerGroup
    });
  }, [itemsPerGroup]); //eslint-disable-line

  (0, _react.useEffect)(() => {
    updateSettings({
      groupSize
    });
  }, [groupSize]); //eslint-disable-line

  (0, _react.useEffect)(() => {
    if (ref.current && slides.length > 0) {
      plugins.forEach(plugin => {
        plugin({
          settings,
          ref,
          updateSettings,
          slides,
          isInit: init.current
        });
      });
      init.current = false;
    }
  }, [ref, slides.length, settings]); //eslint-disable-line

  return [settings];
}