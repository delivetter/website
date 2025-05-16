import { useCallback, useEffect, useRef, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import {
    type BarriosGeoJSON,
    barriosGeoJSONPromise,
    BarriosGeoJSONProperties,
} from "@/lib/data/barriosGeoJSON";

export interface GeoJSONWithInteractionsProps {
    selectedBarrio?: string;
    onSelectBarrio: (barrio: string) => void;
    colorScheme?: "primary" | "secondary";
}

const defaultStyle = {
    weight: 1,
    color: "#666",
    fillColor: "#f0f0f0",
    fillOpacity: 0.3,
};

const hoverStyle = (colorScheme: string) => ({
    weight: 2,
    color: colorScheme === "primary" ? "#3B82F6" : "#15803D",
    fillColor: colorScheme === "primary" ? "#BFDBFE" : "#BBF7D0",
    fillOpacity: 0.6,
});

const selectedStyle = (colorScheme: string) => ({
    weight: 2,
    color: colorScheme === "primary" ? "#1D4ED8" : "#166534",
    fillColor: colorScheme === "primary" ? "#93C5FD" : "#86EFAC",
    fillOpacity: 0.7,
});

export function GeoJSONWithInteractions({
    selectedBarrio,
    onSelectBarrio,
    colorScheme = "primary",
}: GeoJSONWithInteractionsProps) {
    const [barriosGeoJSON, setBarriosGeoJSON] = useState<BarriosGeoJSON | null>(
        null
    );

    const geoJsonRef = useRef<L.GeoJSON | null>(null);
    const map = useMap();

    useEffect(() => {
        barriosGeoJSONPromise.then((geojson) => {
            setBarriosGeoJSON(geojson);
        });
    }, []);

    useEffect(() => {
        if (geoJsonRef.current) {
            geoJsonRef.current.eachLayer((layer: any) => {
                if (layer && layer.feature && layer.feature.properties) {
                    const featureName = layer.feature.properties.nombre;
                    if (featureName === selectedBarrio) {
                        layer.setStyle(selectedStyle);
                    } else {
                        layer.setStyle(defaultStyle);
                    }
                }
            });
        }
    }, [selectedBarrio, selectedStyle, defaultStyle]);

    const onEachFeature = useCallback(
        (feature: any, layer: any) => {
            if (!feature || !feature.properties) return;
            const name = feature.properties.nombre;

            // Configura los eventos de interacción
            layer.on({
                // Al hacer clic, selecciona el barrio
                click: () => {
                    onSelectBarrio(name);
                },
                // Al pasar el ratón, muestra el estilo hover
                mouseover: () => {
                    if (name !== selectedBarrio) {
                        layer.setStyle(hoverStyle(colorScheme));
                    }

                    // Trae la capa al frente para mejor visualización
                    layer.bringToFront();
                },
                // Al quitar el ratón, restaura el estilo original
                mouseout: () => {
                    if (name !== selectedBarrio) {
                        layer.setStyle(defaultStyle);
                    } else {
                        layer.setStyle(selectedStyle(colorScheme));
                    }
                },
            });

            // Añade tooltip al pasar el ratón
            layer.bindTooltip(name, {
                direction: "top",
                sticky: true,
                offset: [0, -5],
                opacity: 0.9,
                className: "leaflet-tooltip-own",
            });
        },
        [selectedBarrio, onSelectBarrio]
    );

    useEffect(() => {
        // Crear la capa GeoJSON
        const geoJsonLayer = L.geoJSON<BarriosGeoJSONProperties>(
            barriosGeoJSON,
            {
                style: (feature) => {
                    if (!feature || !feature.properties) return defaultStyle;
                    const name = feature.properties.nombre;
                    return name === selectedBarrio
                        ? selectedStyle(colorScheme)
                        : defaultStyle;
                },
                onEachFeature: onEachFeature,
            }
        );

        // Guardar referencia y añadir al mapa
        geoJsonRef.current = geoJsonLayer;
        geoJsonLayer.addTo(map);

        // Limpiar al desmontar
        return () => {
            map.removeLayer(geoJsonLayer);
        };
    }, [map, onEachFeature, selectedBarrio]);

    return null;
}
