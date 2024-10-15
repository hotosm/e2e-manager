import { useRef } from "react";
import "./mapbox-gl-draw.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import Map from "./Map";

const MapDraw = ({
    onDrawAOI,
    center,
    zoom
}) => {

    const draw = useRef(null);

    MapboxDraw.constants.classes.CONTROL_BASE  = 'maplibregl-ctrl';
    MapboxDraw.constants.classes.CONTROL_PREFIX = 'maplibregl-ctrl-';
    MapboxDraw.constants.classes.CONTROL_GROUP = 'maplibregl-ctrl-group';

    const onLoadMap = (map) => {
        draw.current = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                polygon: true,
                trash: true
            }

        });

        const updateArea = (e) => {
            const data = draw.current.getAll();
            onDrawAOI && onDrawAOI(data);
        }

        map.on('draw.create', updateArea);
        map.on('draw.delete', updateArea);
        map.on('draw.update', updateArea);
        map.addControl(draw.current);
    }

    const map = Map({
        center: center,
        zoom: zoom,
        onLoad: onLoadMap,
    });

    return map
}

export default MapDraw;