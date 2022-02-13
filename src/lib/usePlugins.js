import {useEffect, useRef, useState} from "react";

export default function usePlugins (ref, props, plugins, slides) {
    const init = useRef(true)
    const [settings, setSettings] = useState(props)

    const updateSettings = data => {
        console.log('updateSettings') //eslint-disable-line
        setSettings(prev => {
            return {...prev, ...data}
        })
    }

    //updatable props
    const {itemsPerGroup, groupSize} = props
    useEffect(() => {
        updateSettings({itemsPerGroup})
    }, [itemsPerGroup]) //eslint-disable-line
    useEffect(() => {
        updateSettings({groupSize})
    }, [groupSize]) //eslint-disable-line

    useEffect(() => {
        if(ref.current && slides.length > 0) {
            plugins.forEach(plugin => {
                plugin({
                    props,
                    ref,
                    slides,
                    isInit: init.current
                })
            })
            init.current = false
        }
    }, [ref, slides.length, settings]) //eslint-disable-line
    return [settings]
}
