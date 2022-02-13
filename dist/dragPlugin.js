"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dragPlugin;

require("core-js/modules/es.array.reduce.js");

function dragPlugin(_ref) {
  let {
    settings,
    ref,
    updateSettings,
    isInit
  } = _ref;
  let isMouseDown = false,
      mouseStart = 0,
      trackScrollPos = 0;

  const handleMouseDown = e => {
    //console.log('handleMouseDown', ref) //eslint-disable-line
    ref.current.style.scrollSnapType = 'unset';
    isMouseDown = true;
    mouseStart = e.x;
    trackScrollPos = ref.current.scrollLeft;
  };

  const handleMouseMove = e => {
    if (isMouseDown) {
      e.preventDefault();
      const dragDiff = mouseStart - e.x; //console.log('handleMouseMove',  scrollVal) //eslint-disable-line

      ref.current.scrollLeft = dragDiff + trackScrollPos;
    }
  };

  const handleMouseUp = e => {
    if (isMouseDown) {
      const dragDiff = (mouseStart - e.x) * 2;
      const scrollVal = dragDiff + trackScrollPos;
      const trackLeft = ref.current.offsetLeft;
      const slides = ref.current.querySelectorAll('.snapslider--group');
      const slidesLeftValues = slides.length ? Array.from(slides).map(slide => {
        return slide.offsetLeft - trackLeft;
      }) : [];
      const closest = slidesLeftValues.reduce(function (prev, curr) {
        return Math.abs(curr - scrollVal) < Math.abs(prev - scrollVal) ? curr : prev;
      });
      ref.current.scrollTo({
        left: closest,
        behavior: 'smooth'
      });
      const checkIfScrollToIsFinished = setInterval(() => {
        if (closest === trackLeft) {
          ref.current.style.scrollSnapType = 'inline mandatory';
          clearInterval(checkIfScrollToIsFinished);
        }
      }, 25);
      isMouseDown = false;
    }
  };

  if (isInit) {
    ref.current.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    setTimeout(() => {//updateSettings({groupSize: '50%'})
    }, 3000);
  }
}