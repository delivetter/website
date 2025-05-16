import { MapContainer, TileLayer } from "react-leaflet";
import {
    GeoJSONWithInteractions,
    GeoJSONWithInteractionsProps,
} from "./GeoJSONWithInteractions";

export type BarrioMapProps = GeoJSONWithInteractionsProps;

export function BarrioMap({
    onSelectBarrio,
    selectedBarrio,
    colorScheme = "primary",
}: BarrioMapProps) {
    return (
        <div className="rounded-lg overflow-hidden shadow mb-6">
            <MapContainer
                center={[39.4699, -0.3763] as L.LatLngExpression}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: "400px", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GeoJSONWithInteractions
                    selectedBarrio={selectedBarrio}
                    onSelectBarrio={onSelectBarrio}
                    colorScheme={colorScheme}
                />
            </MapContainer>
        </div>
    );
}
