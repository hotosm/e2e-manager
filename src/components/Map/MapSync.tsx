import { useRef, useState } from "react";
import Map from "./Map";
import "./MapSync.style.css";
import syncMaps from "@mapbox/mapbox-gl-sync-move";
import { Select, Option } from '@hotosm/ui/dist/react';

const MapSync = ({
    center,
    zoom,
    aoi,
    grid
}) => {
    const map1 = useRef(null);
    const map2 = useRef(null);
    const [sourceLeft, setSourceLeft] = useState("osm");
    const [sourceRight, setSourceRight] = useState("esri");

    const handleLoadMap = (map, ref) => {
        ref.current = map;
        if (map1.current && map2.current) {
            syncMaps(map1.current, map2.current);
        }
    }

    const handleSourceChange = (e, setter) => {
        setter(e.target.value);
    }

    return (
        <div className="maps">
            <div className="map">
                <Map grid={grid} aoi={aoi} source={sourceLeft} onLoad={(map) => handleLoadMap(map, map1)} center={center} zoom={zoom} />
                <Select value={sourceLeft} onSlChange={(e) => handleSourceChange(e, setSourceLeft)} className="selectSource">
                    <Option value="osm">OpenStreetMap</Option>
                    <Option value="esri">Satellite (ESRI)</Option>
                    <Option value="oam">Aerial</Option>
                </Select>
            </div>
            <div className="map">
                <Map grid={grid} aoi={aoi} source={sourceRight} onLoad={(map) => handleLoadMap(map, map2)} center={center} zoom={zoom} />
                <Select value={sourceRight} onSlChange={(e) => handleSourceChange(e, setSourceRight)} className="selectSource">
                    <Option value="osm">OpenStreetMap</Option>
                    <Option value="esri">Satellite (ESRI)</Option>
                    <Option value="oam">Aerial</Option>
                </Select>
            </div>
        </div>
    )
}

export default MapSync;