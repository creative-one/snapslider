"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inlineOffset = exports.checkIfScrollToIsFinished = void 0;

require("core-js/modules/es.promise.js");

const checkIfScrollToIsFinished = (finished, ref) => {
  return new Promise(resolve => {
    const interval = setInterval(() => {
      if (finished === ref.current.scrollLeft) {
        resolve("Success!"); // or
        // reject ("Error!");

        clearInterval(interval);
      }
    }, 25);
  });
};

exports.checkIfScrollToIsFinished = checkIfScrollToIsFinished;

const inlineOffset = (ref, offset) => {
  const trackLeft = ref.current.offsetLeft;
  return offset - trackLeft;
};

exports.inlineOffset = inlineOffset;