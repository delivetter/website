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
    colorScheme?: "default" | "green";
}

// Componente para gestionar el estilo y las interacciones del GeoJSON
export function GeoJSONWithInteractions({
    selectedBarrio,
    onSelectBarrio,
    colorScheme = "default",
}: GeoJSONWithInteractionsProps) {
    const [barriosGeoJSON, setBarriosGeoJSON] = useState<BarriosGeoJSON | null>(
        null
    );

    const geoJsonRef = useRef<L.GeoJSON | null>(null);
    const map = useMap();

    // Estilos para los diferentes estados de los barrios
    const defaultStyle = {
        weight: 1,
        color: "#666",
        fillColor: "#f0f0f0",
        fillOpacity: 0.3,
    };

    const hoverStyle =
        colorScheme === "green"
            ? {
                  weight: 2,
                  color: "#15803D",
                  fillColor: "#BBF7D0",
                  fillOpacity: 0.6,
              }
            : {
                  weight: 2,
                  color: "#3B82F6",
                  fillColor: "#BFDBFE",
                  fillOpacity: 0.6,
              };

    const selectedStyle =
        colorScheme === "green"
            ? {
                  weight: 2,
                  color: "#166534", // borde verde
                  fillColor: "#86EFAC", // relleno verde
                  fillOpacity: 0.7,
              }
            : {
                  weight: 2,
                  color: "#1D4ED8", // azul
                  fillColor: "#93C5FD",
                  fillOpacity: 0.7,
              };

    useEffect(() => {
        barriosGeoJSONPromise.then((geojson) => {
            setBarriosGeoJSON(geojson);
        });
    }, []);

    // Resetea y aplica los estilos cuando cambia el barrio seleccionado
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

    // Configura las interacciones para cada feature del GeoJSON
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
                        layer.setStyle(hoverStyle);
                    }

                    // Trae la capa al frente para mejor visualización
                    layer.bringToFront();
                },
                // Al quitar el ratón, restaura el estilo original
                mouseout: () => {
                    if (name !== selectedBarrio) {
                        layer.setStyle(defaultStyle);
                    } else {
                        layer.setStyle(selectedStyle);
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
                        ? selectedStyle
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
