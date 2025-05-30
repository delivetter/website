import { useEffect, useState } from "react";
import { CircleMarker, useMap } from "react-leaflet";
import type { Neighborhood, StartPoint, Warehouse } from "@/lib/neighborhoods";

export interface NeighborhoodPointsLayerProps {
    selectedNeighborhood: Neighborhood;
    startPoint: StartPoint | null;
    setStartPoint: React.Dispatch<React.SetStateAction<StartPoint | null>>;
    selectedWarehouse: Warehouse | null;
    setSelectedWarehouse: React.Dispatch<
        React.SetStateAction<Warehouse | null>
    >;
    mapRef: React.MutableRefObject<L.Map | null>;
}

export default function NeighborhoodPointsLayer({
    selectedNeighborhood,
    startPoint,
    setStartPoint,
    selectedWarehouse,
    setSelectedWarehouse,
    mapRef,
}: NeighborhoodPointsLayerProps) {
    const map = useMap();
    const [paneReady, setPaneReady] = useState(false);

    useEffect(() => {
        if (!map) return;

        mapRef.current = map;

        const paneName = "topPane";
        const existingPane = map.getPane(paneName);

        if (!existingPane) {
            const pane = map.createPane(paneName);
            if (pane?.style) {
                pane.style.zIndex = "900";
            }
        }

        setPaneReady(true);
    }, [map]);

    if (!paneReady) return null;

    return (
        <>
            {/* Almacenes */}
            {selectedNeighborhood.almacenes_locations.map((p, idx) => {
                const isSelected =
                    selectedWarehouse?.lat === p.lat &&
                    selectedWarehouse?.lon === p.lon;

                return (
                    <CircleMarker
                        key={`almacen-${idx}`}
                        center={[p.lat, p.lon]}
                        radius={5}
                        pathOptions={{
                            color: isSelected ? "#8B5CF6" : "#4B5563",
                            fillColor: isSelected ? "#DDD6FE" : "#9CA3AF",
                            weight: 3,
                            fillOpacity: 0.8,
                        }}
                        eventHandlers={{
                            click: () =>
                                setSelectedWarehouse({
                                    id: p.id,
                                    lat: p.lat,
                                    lon: p.lon,
                                }),
                        }}
                        pane="topPane"
                    />
                );
            })}

            {/* Puntos periféricos */}
            {selectedNeighborhood.puntos_perifericos_locations.map((p, idx) => {
                const isSelected =
                    startPoint?.lat === p.lat && startPoint?.lon === p.lon;
                return (
                    <CircleMarker
                        key={`start-${idx}`}
                        center={[p.lat, p.lon]}
                        radius={6}
                        pathOptions={{
                            color: isSelected ? "#DC2626" : "#16A34A",
                            fillColor: isSelected ? "#F87171" : "#4ADE80",
                            weight: 2,
                            fillOpacity: 0.9,
                        }}
                        eventHandlers={{
                            click: () =>
                                setStartPoint({
                                    id: p.id,
                                    lat: p.lat,
                                    lon: p.lon,
                                }),
                        }}
                        pane="topPane"
                    />
                );
            })}
        </>
    );
}
