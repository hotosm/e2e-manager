import { useState } from "react";
import Map from '../components/Map/MapDraw';
import geojsonArea from "@mapbox/geojson-area";
import { Button } from '@hotosm/ui/dist/react';
import { useNavigate } from 'react-router-dom'
import "./AOI.styles.css";

const AOI = () => {

    const [areaKm2, setAreaKm2] = useState(null);
    const navigate = useNavigate();

    const drawAOIHandler = (data) => {
        if (data.features.length > 0) {
            const area = geojsonArea.geometry(data.features[0].geometry);
            setAreaKm2(Math.round(area/1000000, 2));
        } else {
            setAreaKm2(null);
        }
    }

    return (
        <>
            <div className="aoi-view--top">
                <h1 className="title">Welcome!</h1>
                <Button variant="primary" disabled={!areaKm2} onClick={() => navigate("/image")}>Next</Button>
            </div>
            <p className="body">Select an Area of Interest (AOI) for your project: <strong>{areaKm2 || 0} km2</strong></p>
            <Map onDrawAOI={drawAOIHandler} center={[-13.56, -16.52]} zoom={3} />
        </>
    )
}

export default AOI;
