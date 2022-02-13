import './App.css';
import SnapSlider, {Arrows, DotsWithArrows} from "./lib";
import {useEffect, useState} from "react";

function App() {
    console.log('test') //eslint-disable-line
    const images = useRandomImages()
    const [count, setCount] = useState(1)

    return (
        <div className="App">
            <h1>SnapSlider v1</h1>
            <Section title={(<>
                <span>Bilderslider</span>
                <input
                    type={"range"}
                    min={1}
                    max={12}
                    value={count}
                    onChange={e => setCount(e.target.value)}
                />
            </>)}>
                <SnapSlider
                    groupSize={'100%'}
                    itemsPerGroup={count}
                    onUpdateSettings={({itemsPerGroup}) => setCount(itemsPerGroup)}
                    onScroll={(scrollPos) => {
                        //console.log(scrollPos) //eslint-disable-line
                    }}
                    topControls={(props) => {
                        return <div>
                            <div className={'example-index'}>
                                <div>
                                    <span className={'current'}>{props.activeSlide}</span>
                                    <span>{props.groupCount}</span>
                                </div>
                            </div>
                            <Arrows {...props} />
                        </div>
                    }}
                >
                    {images.map(image => <img key={image.id} src={image.download_url} alt={image.author}/>)}
                </SnapSlider>
            </Section>
            <Section title={(<>
                <span>Bilderslider</span>
                <input
                    type={"range"}
                    min={1}
                    max={12}
                    value={count}
                    onChange={e => setCount(e.target.value)}
                />
            </>)}>
                <SnapSlider
                    groupSize={'100%'}
                    itemsPerGroup={count}
                    onUpdateSettings={({itemsPerGroup}) => setCount(itemsPerGroup)}
                    bottomControls={DotsWithArrows}
                >
                    {images.map(image => <img key={image.id} src={image.download_url} alt={image.author}/>)}
                </SnapSlider>
            </Section>
        </div>
    );
}

const Section = ({title, children}) => {
    return (
        <div className={'section'}>
            <h2>{title}</h2>
            {children}
        </div>
    )
}

const useRandomImages = (limit = 10) => {
    const [images, setImages] = useState([])
    useEffect(() => {
        fetch('https://picsum.photos/v2/list?limit=' + limit).then(resp => resp.json()).then(data => {
            setImages(data)
        })
    }, [limit])

    return images
}

export default App;
