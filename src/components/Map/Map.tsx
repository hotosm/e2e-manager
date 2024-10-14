import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { getMapBase } from "./MapBaselayer";
import "./Map.style.css";
import "./mapbox-gl-draw.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import geojsonArea from "@mapbox/geojson-area";

const Map = ({
    source,
    config,
    center,
    zoom,
    mapProps,
    onLoad,
    aoi,
    className
}) => {

    const map = useRef(null);
    const draw = useRef(null);
    const mapContainer = useRef(null);
    const [areaKm2, setAreaKm2] = useState(null);

    MapboxDraw.constants.classes.CONTROL_BASE  = 'maplibregl-ctrl';
    MapboxDraw.constants.classes.CONTROL_PREFIX = 'maplibregl-ctrl-';
    MapboxDraw.constants.classes.CONTROL_GROUP = 'maplibregl-ctrl-group';

    // Map initialization
    useEffect(() => {
        if (map.current) return;

        const rasterStyle = getMapBase(source, config);
        let mapLibreOptions = {
            container: mapContainer.current,
            style: rasterStyle,
            center,
            zoom: zoom || 17,
            ...mapProps
        }
        map.current = new maplibregl.Map(mapLibreOptions);

        // Run immediately on the first time
        map.current.on("load", () => {
            map.current.addControl(new maplibregl.NavigationControl());
            draw.current = new MapboxDraw({
                displayControlsDefault: false,
                controls: {
                    polygon: true,
                    trash: true
                }

            });

            const updateArea = (e) => {
                const data = draw.current.getAll();
                if (data.features.length > 0) {
                    const area = geojsonArea.geometry(data.features[0].geometry);
                    setAreaKm2(Math.round(area/1000000, 2));
                } else {
                    setAreaKm2(null);
                }
            }
        
            map.current.on('draw.create', updateArea);
            map.current.on('draw.delete', updateArea);
            map.current.on('draw.update', updateArea);
            map.current.addControl(draw.current);
                onLoad && onLoad();
        });
    }, [center]);

    // AOI
    useEffect(() => {
        if (!map.current || !aoi) return;
        if (map.current.getSource("aoi")) {
            map.current.getSource("aoi").setData(aoi);
        }
    }, [aoi]);

    // Center
    useEffect(() => {
        if (!map.current || !center) return;
        map.current.setCenter(center);
    }, [map.current, center]);

    // Zoom
    useEffect(() => {
        if (!map.current || !zoom) return;
        map.current.setZoom(zoom);
    }, [map.current, zoom]);

    return (
        <div
            className={"mapWrapper"}
            style={{ position: "relative" }}
        >
            <div className={"mapContainer"} ref={mapContainer} />
            { areaKm2 &&
                <h4>Area: {areaKm2} km2</h4>
            }
        </div>
    );
}

export default Map;