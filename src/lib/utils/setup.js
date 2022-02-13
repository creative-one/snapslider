import _ from "lodash";
import {checkIfScrollToIsFinished, inlineOffset} from "./helper";

export const setupSlides = (slides, settings) => {
    const {
        itemsPerGroup,
        groupSize,
    } = settings
    const slidesCount = slides.length
    const slidesWithGroups = _.groupBy(slides.map((slide, key) => {
        return {
            content: slide,
            group: key / itemsPerGroup
        }
    }), slide => Math.floor(slide.group))

    const trackStyles = {
        gridAutoColumns: `${groupSize}`,
    }
    const groupStyles = {
        gridAutoColumns: `minmax(auto, ${100 / itemsPerGroup}%)`
    }
    const slideStyles = {}

    return {
        slidesWithGroups,
        trackStyles,
        groupStyles,
        slideStyles,
        slidesCount,
    }
}

export const handleSlideChange = (
    newSlide,
    trackRef,
    changeStartCallback = () => {},
    changeEndCallback = () => {}
) => {
    const slides = Array.from(trackRef.current.querySelectorAll('.snapslider--group'))
    const newActive = slides[newSlide - 1]
    if(newActive) {
        trackRef.current.scrollTo({
            left: inlineOffset(trackRef, newActive.offsetLeft),
            behavior: 'smooth'
        })
        changeStartCallback(newSlide, slides)

        checkIfScrollToIsFinished(newActive.offsetLeft, trackRef).then(() => {
            changeEndCallback(newSlide, slides)
        })
    }
}

export const handleActiveSlide = (
    trackRef,
    scrollLeft,
    setActiveSlide
) => {
    const slides = Array.from(trackRef.current.querySelectorAll('.snapslider--group'))
    if(slides) {
        const slidesLeftValues = slides.length ? Array.from(slides).map(slide => {
            return inlineOffset(trackRef, slide.offsetLeft)
        }) : []
        const closest = slidesLeftValues.reduce(function(prev, curr) {
            return (Math.abs(curr - scrollLeft) < Math.abs(prev - scrollLeft) ? curr : prev);
        });
        const activeSlide = slidesLeftValues.indexOf(closest)
        if(activeSlide >= 0) {
            setActiveSlide(activeSlide + 1)
        }
    }
}
