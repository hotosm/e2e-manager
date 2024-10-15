import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { getMapBase } from "./MapBaselayer";
import "./Map.style.css";

const Map = ({
    center,
    zoom,
    source,
    config,
    mapProps,
    onLoad
}) => {

    const map = useRef(null);
    const mapContainer = useRef(null);

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
            onLoad && onLoad(map.current);
        });
    }, [center]);

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

    // Source
    useEffect(() => {
        if (!map.current || !source) return;
        const rasterStyle = getMapBase(source, config);
        map.current.setStyle(rasterStyle)
    }, [map.current, source]);

        
    return (
        <div
            className={"mapWrapper"}
            style={{ position: "relative" }}
        >
            <div className={"mapContainer"} ref={mapContainer} />
        </div>
    );
}

export default Map;