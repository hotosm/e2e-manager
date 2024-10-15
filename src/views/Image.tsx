import MapSync from '../components/Map/MapSync';
import { Button } from '@hotosm/ui/dist/react';

import "./Image.styles.css";

const Image = () => {

    return (
        <>
            <div className="aoi-view--top">
                <h1 className="title">Image</h1>
                <Button variant="primary">Next</Button>
            </div>
            <p className="body">Check available imagery</p>
            <MapSync center={[-13.56, -16.52]} zoom={3} />
        </>
    )
}

export default Image;

