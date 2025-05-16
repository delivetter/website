import { useEffect, useRef } from "react";
import { CircleMarker, MapContainer, TileLayer, useMap } from "react-leaflet";
import SetupMapPane from "./SetupMapPane";
import MapLegend from "./MapLegend";
import { Neighborhood, StartPoint, Warehouse } from "@/lib/neighborhoods";
import L from "leaflet";

interface MiniBarrioMapProps {
    className?: string;
    selectedBarrio: Neighborhood;
    startPoint: StartPoint | null;
    setStartPoint: React.Dispatch<React.SetStateAction<StartPoint | null>>;
    selectedWarehouse: Warehouse | null;
    setSelectedWarehouse: React.Dispatch<
        React.SetStateAction<Warehouse | null>
    >;
}

export default function MiniBarrioMap({
    className,
    selectedBarrio,
    startPoint,
    setStartPoint,
    selectedWarehouse,
    setSelectedWarehouse,
}: MiniBarrioMapProps) {
    const mapRef = useRef<L.Map | null>(null);
    const layerRef = useRef<L.GeoJSON | null>(null);

    // Pintar el barrio y centrar
    useEffect(() => {
        const selectedFeature = selectedBarrio.geoJSONFeature;

        if (!mapRef.current) return;

        // ✅ Solo quitamos el layer si existe y está en el mapa
        if (layerRef.current && mapRef.current.hasLayer(layerRef.current)) {
            mapRef.current.removeLayer(layerRef.current);
        }

        const newLayer = L.geoJSON(selectedFeature, {
            style: {
                color: "#15803D",
                weight: 3,
                fillColor: "#BBF7D0",
                fillOpacity: 0.5,
            },
        });

        newLayer.addTo(mapRef.current);
        layerRef.current = newLayer;

        mapRef.current.fitBounds(newLayer.getBounds(), {
            padding: [10, 10],
        });
    }, [mapRef, selectedBarrio]);

    useEffect(() => {
        const style = document.createElement("style");
        style.innerHTML = `
      .almacen-disponible {
        width: 16px;
        height: 16px;
        background-color: #9CA3AF;
        border: 2px solid #4B5563;
      }
      .almacen-seleccionado {
        width: 16px;
        height: 16px;
        background-color: #C4B5FD;
        border: 2px solid #7C3AED;
      }
    `;
        document.head.appendChild(style);
    }, []);

    return (
        <div className="h-full flex flex-col gap-y-5">
            <MapLegend />
            <MapContainer
                className={className}
                zoom={14}
                center={[39.4699, -0.3763]}
                scrollWheelZoom={true}
                dragging={true}
                zoomControl={true}
                attributionControl={false}
                doubleClickZoom={false}
            >
                <SetupMapPane mapRef={mapRef} />
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Almacenes */}
                {selectedBarrio.almacenes_locations.map((p, idx) => {
                    const isSelected =
                        selectedWarehouse?.lat === p.lat &&
                        selectedWarehouse?.lon === p.lon;

                    return (
                        <CircleMarker
                            key={`almacen-${idx}`}
                            center={[p.lat, p.lon]}
                            radius={5}
                            pathOptions={{
                                color: isSelected ? "#8B5CF6" : "#4B5563", // contorno
                                fillColor: isSelected ? "#DDD6FE" : "#9CA3AF", // interior
                                weight: 3,
                                fillOpacity: 0.8,
                            }}
                            eventHandlers={{
                                click: () => {
                                    console.log(
                                        "🏬 Almacén seleccionado:",
                                        p.lat,
                                        p.lon
                                    );
                                    setSelectedWarehouse({
                                        id: p.id,
                                        lat: p.lat,
                                        lon: p.lon,
                                    });
                                },
                            }}
                            pane="topPane"
                        />
                    );
                })}

                {/* Puntos periféricos */}
                {selectedBarrio.puntos_perifericos_locations.map((p, idx) => {
                    const isSelected =
                        startPoint?.lat === p.lat && startPoint?.lon === p.lon;
                    return (
                        <CircleMarker
                            key={idx}
                            center={[p.lat, p.lon]}
                            radius={6}
                            pathOptions={{
                                color: isSelected ? "#DC2626" : "#16A34A",
                                fillColor: isSelected ? "#F87171" : "#4ADE80",
                                fillOpacity: 0.9,
                            }}
                            eventHandlers={{
                                click: () => {
                                    console.log(
                                        "✅ Punto seleccionado:",
                                        p.lat,
                                        p.lon
                                    );
                                    setStartPoint({
                                        id: p.id,
                                        lat: p.lat,
                                        lon: p.lon,
                                    });
                                },
                            }}
                            pane="topPane"
                        />
                    );
                })}
            </MapContainer>
        </div>
    );
}
