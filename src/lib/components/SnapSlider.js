import '../styles/main.scss'

import React, {useEffect, useRef, useState} from 'react'
import usePlugins from "../usePlugins";

//Default Plugins
import dragPlugin from "../plugins/dragPlugin";
import {SliderContext} from "../utils/context";
import {handleActiveSlide, handleSlideChange, setupSlides} from "../utils/setup";
import {Arrows, Dots} from "./Controls";

export default function SnapSlider({initActiveSlide= 1,
    plugins = [dragPlugin],
    onScroll = () => {},
    children = [],
    onUpdateSettings = () => {},
    topControls,
    bottomControls,
    ...props
}) {
    console.log('render slider') //eslint-disable-line
    const [activeSlide, setActiveSlide] = useState(initActiveSlide)
    const ref = useRef()
    const trackRef = useRef()


    const slides = Array.isArray(children) ? children : [children]
    const {
        slidesWithGroups,
        trackStyles,
        groupStyles,
        slideStyles,
        slidesCount
    } = setupSlides(slides, props)

    const prevSlide = () => {
        handleSlideChange(activeSlide === 1 ? slidesCount : activeSlide - 1, trackRef)
    }

    const nextSlide = () => {
        handleSlideChange(activeSlide === slidesCount ? 1 : activeSlide + 1, trackRef)
    }

    const goToSlide = (newSlide) => {
        handleSlideChange(newSlide, trackRef)
    }

    const additionalProps = {
        activeSlide,
        slidesCount,
        groupCount :Object.keys(slidesWithGroups).length,
        settings: props,
        prevSlide,
        nextSlide,
        goToSlide
    }

    const [settings] = usePlugins(trackRef, additionalProps, plugins, slides)

    useEffect(() => {
        if(trackRef.current) {
            trackRef.current.addEventListener('scroll', (e) => {
                handleActiveSlide(trackRef, e.target.scrollLeft, setActiveSlide)
                onScroll(e.target.scrollLeft, additionalProps)
            })
        }
    }, [trackRef]) //eslint-disable-line

    return (
        <SliderContext.Provider value={{
            sliderRef: ref,
            settings
        }}>
            <div ref={ref} className={'snapslider'} style={{ "--snapslider-gab": settings.gap }}>
                <div className={'snapslider--inner'}>
                    {topControls ? topControls(additionalProps) : <Arrows {...additionalProps} />}
                    <Track {...{slidesWithGroups, trackStyles, groupStyles, slideStyles, trackRef}} />
                </div>
                {bottomControls ? bottomControls(additionalProps) : <Dots {...additionalProps} />}
            </div>
        </SliderContext.Provider>
    )
}

SnapSlider.defautlProps = {
    itemsPerGroup: 1,
    groupSize: '95%',
    gap: '1rem',
}

const Track = ({slidesWithGroups, trackStyles, groupStyles, slideStyles, trackRef}) => {
    return (
        <div ref={trackRef} className={'snapslider--track'} style={trackStyles}>
            {Object.values(slidesWithGroups).map((slides, key) =>
                <Group key={key} {...{slides, groupStyles, slideStyles}}/>
            )}
        </div>
    )
}

const Group = ({slides, groupStyles, slideStyles}) => {
    return (
        <div className={'snapslider--group'} style={groupStyles}>
            {slides.map((slide, key) =>
                <Slide key={key} slideContent={slide.content} slideStyles={slideStyles}/>
            )}
        </div>
    )
}

const Slide = ({slideContent, slideStyles}) => {
    return (
        <div className={'snapslider--slide'} style={slideStyles}>
            {slideContent}
        </div>
    )
}
