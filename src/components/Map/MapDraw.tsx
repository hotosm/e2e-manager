import { useRef } from "react";
import "./mapbox-gl-draw.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import Map from "./Map";

const MapDraw = ({
    onDraw,
    center,
    zoom,
    aoi,
    grid,
    source,
    onLoad
}) => {

    const draw = useRef(null);

    MapboxDraw.constants.classes.CONTROL_BASE  = 'maplibregl-ctrl';
    MapboxDraw.constants.classes.CONTROL_PREFIX = 'maplibregl-ctrl-';
    MapboxDraw.constants.classes.CONTROL_GROUP = 'maplibregl-ctrl-group';

    const handleMapLoad = (map) => {
        draw.current = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                polygon: true,
                trash: true
            }

        });

        const handleDraw = (e) => {
            const data = draw.current.getAll();
            onDraw && onDraw(data);
        }

        map.on('draw.create', handleDraw);
        map.on('draw.delete', handleDraw);
        map.on('draw.update', handleDraw);
        map.addControl(draw.current);

        onLoad && onLoad();
    }

    return (
        <Map aoi={aoi} source={"osm"} onLoad={handleMapLoad} center={center} zoom={zoom} />
    )
}

export default MapDraw;