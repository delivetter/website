import { MapContainer, TileLayer } from "react-leaflet";
import { GeoJSONWithInteractionsLayer } from "./Layers/GeoJsonWithInteractionsLayer";
import { cn } from "@/lib/utils";
import React from "react";
import NeighborhoodsMapMenu from "./Menu";
import { Neighborhood } from "@/lib/neighborhoods";

interface BarrioMapProps {
    neighborhoods: Record<string, Neighborhood>;
    selectedNeighborhood: Neighborhood | null;
    setSelectedNeighborhood: React.Dispatch<
        React.SetStateAction<Neighborhood | null>
    >;
    selectedSimulationType: string;

    className?: string;
}

export const MAP_CENTER: [number, number] = [39.465, -0.35];
export const MAP_ZOOM = 12;

export function NeighborhoodsMap({
    neighborhoods,
    selectedNeighborhood,
    setSelectedNeighborhood,
    selectedSimulationType,
    className,
}: BarrioMapProps) {
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
