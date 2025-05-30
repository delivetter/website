import { MapContainer, TileLayer } from "react-leaflet";
import { GeoJSONWithInteractionsLayer } from "./Layers/GeoJsonWithInteractionsLayer";
import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import NeighborhoodsMapMenu from "./Menu";
import { Neighborhood, StartPoint, Warehouse } from "@/lib/neighborhoods";
import NeighborhoodPointsLayer from "./Layers/NeighborhoodPointsLayer";

interface NeighborhoodsMapProps {
    neighborhoods: Record<string, Neighborhood>;
    selectedNeighborhood: Neighborhood | null;
    setSelectedNeighborhood: React.Dispatch<
        React.SetStateAction<Neighborhood | null>
    >;
    selectedSimulationType: string;
    startPoint?: StartPoint | null;
    setStartPoint?: React.Dispatch<React.SetStateAction<StartPoint | null>>;
    selectedWarehouse?: Warehouse | null;
    setSelectedWarehouse?: React.Dispatch<
        React.SetStateAction<Warehouse | null>
    >;
    className?: string;
}

export const MAP_CENTER: [number, number] = [39.465, -0.35];
export const MAP_ZOOM = 12;

export function NeighborhoodsMap({
    neighborhoods,
    selectedNeighborhood,
    setSelectedNeighborhood,
    startPoint,
    setStartPoint,
    selectedWarehouse,
    setSelectedWarehouse,
    selectedSimulationType,
    className,
}: NeighborhoodsMapProps) {
    const mapRef = useRef<L.Map | null>(null);
    
    return (
        <div
            className={cn(
                "relative rounded-lg shadow overflow-hidden",
                className
            )}
        >
            <MapContainer
                center={MAP_CENTER}
                zoom={MAP_ZOOM}
                className="h-full w-full"
                scrollWheelZoom={false}
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GeoJSONWithInteractionsLayer
                    selectedNeighborhood={selectedNeighborhood}
                    onSelectNeighborhood={(name: string) =>
                        setSelectedNeighborhood(neighborhoods[name])
                    }
                    colorScheme={
                        selectedSimulationType === "predefined"
                            ? "primary"
                            : "secondary"
                    }
                />
                {selectedSimulationType === "interactive" &&
                    selectedNeighborhood && (
                        <NeighborhoodPointsLayer
                            selectedNeighborhood={selectedNeighborhood}
                            startPoint={startPoint!}
                            setStartPoint={setStartPoint!}
                            selectedWarehouse={selectedWarehouse!}
                            setSelectedWarehouse={setSelectedWarehouse!}
                            mapRef={mapRef}
                        />
                    )}
            </MapContainer>
            <NeighborhoodsMapMenu
                selectedSimulationType={selectedSimulationType}
                selectedNeighborhood={selectedNeighborhood}
                setSelectedNeighborhood={setSelectedNeighborhood}
                neighborhoods={neighborhoods}
            />
        </div>
    );
}
