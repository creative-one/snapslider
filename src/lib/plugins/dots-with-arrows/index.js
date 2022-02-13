import './styles.css'
import {Arrow, ArrowNextIcon, ArrowPrevIcon, Dots} from "../../components/Controls";

export default function Index (props) {
    const {
        prevSlide,
        nextSlide,
        activeSlide,
        groupCount
    } = props
    return (
        <div className={'snapslider-plugin-dots-with-arrows'}>
            <Arrow onClick={prevSlide} label={<ArrowPrevIcon />} isDisabled={activeSlide === 1}/>
            <Dots {...props} />
            <Arrow onClick={nextSlide} label={<ArrowNextIcon />} isDisabled={activeSlide === groupCount} isNext/>
        </div>
    )
}
