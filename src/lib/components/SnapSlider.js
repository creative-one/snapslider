import React, {useEffect, useRef} from 'react'
import './SnapSlider.scss'
import _ from "lodash";
import dragPlugin from "../dragPlugin";
import usePlugins from "../usePlugins";

export default function SnapSlider({
    plugins = [dragPlugin],
    children = [],
    onUpdateSettings = () => {},
    ...props
}) {
    console.log('render slider') //eslint-disable-line
    const sliderRef = useRef()
    const trackRef = useRef()
    const [settings] = usePlugins(trackRef, props, plugins, children)

    const {
        itemsPerGroup,
        groupSize,
        gap,
    } = settings

    console.log(itemsPerGroup) //eslint-disable-line

    useEffect(() => {
        //onUpdateSettings(settings)
    }, [settings, onUpdateSettings])

    const slides = Array.isArray(children) ? children : [children]
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
    return (
        <div ref={sliderRef} className={'snapslider'} style={{ "--snapslider-gab": gap }}>
            <Track {...{slidesWithGroups, trackStyles, groupStyles, slideStyles, trackRef}} />
        </div>
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
