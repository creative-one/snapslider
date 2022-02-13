import React from 'react'

export const ArrowPrevIcon = () => (
    <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 50 50"
    >
        <polygon points="31,5 36,5 19,25 36,45 31,45 14,25 "/>
    </svg>
)

export const ArrowNextIcon = () => (
    <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 50 50"
    >
        <polygon points="19,5 14,5 31,25 14,45 19,45 36,25 "/>
    </svg>
)

export const Arrow = ({isNext = false, onClick, label, isDisabled}) => (
    <button className={`snapslider--arrow ${isNext ? 'prev' : 'next'} ${isDisabled ? 'disabled' : ''}`} onClick={onClick}>{label}</button>

)

export const Arrows = ({
   prevSlide,
   nextSlide,
   labels = {
       prev: <ArrowPrevIcon />,
       next: <ArrowNextIcon />
   },
   activeSlide,
   groupCount
}) => {
    return (
        <div className={'snapslider--arrows'}>
            <Arrow onClick={prevSlide} label={labels.prev} isDisabled={activeSlide === 1}/>
            <Arrow onClick={nextSlide} label={labels.next} isDisabled={activeSlide === groupCount} isNext/>
        </div>
    )
}

export const Dots = ({groupCount, goToSlide, withIndex = false, activeSlide}) => {
    const dots = Array(groupCount).fill(undefined)
   return (
       <div className={'snapslider--dots'}>
           {dots.map((dot, key) => (
               <button
                   key={key}
                   data-slide={key}
                   className={`snapslider--dot ${activeSlide === key + 1 ? 'active' : ''}`}
                   onClick={() => goToSlide(key + 1)}
               >
                   {withIndex && key + 1}
               </button>
           ))}
       </div>
   )
}

export const DotsWithArrows = (props) => {
    const {
        prevSlide,
        nextSlide,
        activeSlide,
        groupCount
    } = props
    return (
        <div className={'snapslider---dots-with-arrows'}>
            <Arrow onClick={prevSlide} label={<ArrowPrevIcon />} isDisabled={activeSlide === 1}/>
            <Dots {...props} />
            <Arrow onClick={nextSlide} label={<ArrowNextIcon />} isDisabled={activeSlide === groupCount} isNext/>
        </div>
    )
}
