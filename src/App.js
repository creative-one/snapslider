import './App.css';
import SnapSlider from "./lib";
import {useEffect, useState} from "react";

function App() {
    console.log('test') //eslint-disable-line
    const images = useRandomImages()
    const [count, setCount] = useState(2)

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
