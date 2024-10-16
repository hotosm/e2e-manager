import { useState, useEffect } from "react";
import MapDraw from '../../components/Map/MapDraw';
import geojsonArea from "@mapbox/geojson-area";
import { Button } from '@hotosm/ui/dist/react';
import { useNavigate } from 'react-router-dom'
import "./AOI.styles.css";
import { useDispatch } from 'react-redux';
import { setAOI, setGrid } from '../../store/projectSlice';
import extent from 'turf-extent';
import squareGrid from '@turf/square-grid';
import { useSelector } from 'react-redux';

const AOI = () => {

    const aoi = useSelector((state) => state.project.aoi);
    const [areaKm2, setAreaKm2] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDraw = (data) => {
        if (data && data.features.length > 0) {
            dispatch(setAOI(data));
        } else {
            setAreaKm2(null);
            dispatch(setAOI(null));
        }
    }

    useEffect(() => {
        if (!aoi) return;
        const geom = aoi.features[0].geometry;
        const areaKm2 = geojsonArea.geometry(geom)/1000000;
        setAreaKm2(Math.round(areaKm2, 8));
        if (areaKm2 < 500) {
            const bbox = extent(aoi);
            const cellSide = 0.25;
            const grid = squareGrid(bbox, cellSide, { mask: aoi });
            dispatch(setGrid(grid));
        }
    }, [aoi]);

    return (
        <>
            <div className="aoi-view--top">
                <h1 className="title"><strong>Start</strong> | Select an Area ({areaKm2 || 0} km2)</h1>
                <Button variant="primary" disabled={!areaKm2} onClick={() => navigate("/image")}>Next</Button>
            </div>
            <MapDraw aoi={aoi} onDraw={handleDraw} center={[-13.56, -16.52]} zoom={3} />
        </>
    )
}

export default AOI;
