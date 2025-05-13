import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function SetupMapPane({
    mapRef,
}: {
    mapRef: React.MutableRefObject<L.Map | null>;
}) {
    const map = useMap();

    useEffect(() => {
        mapRef.current = map;

        map.createPane("topPane");
        const pane = map.getPane("topPane");
        if (pane) pane.style.zIndex = "1000";
    }, [map]);

    return null;
}
