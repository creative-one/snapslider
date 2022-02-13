export const checkIfScrollToIsFinished = (finished, ref) => {
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            if (finished === ref.current.scrollLeft) {
                resolve("Success!");
                // or
                // reject ("Error!");
                clearInterval(interval);
            }
        }, 25);
    })
}

export const inlineOffset = (ref, offset) => {
    const trackLeft = ref.current.offsetLeft
    return offset - trackLeft
}
