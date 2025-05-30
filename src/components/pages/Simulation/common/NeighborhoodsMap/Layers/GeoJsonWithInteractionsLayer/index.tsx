import { useCallback, useEffect, useRef, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import {
    type BarriosFeatureCollection,
    barriosGeoJSONPromise,
    BarriosGeoJSONProperties,
} from "@/lib/data/barriosGeoJSON";
import { getGeoJSONStyle } from "./geoJsonStyles";
import { Neighborhood } from "@/lib/neighborhoods";
import { MAP_CENTER, MAP_ZOOM } from "../..";

export interface GeoJSONWithInteractionsProps {
    selectedNeighborhood: Neighborhood | null;
    onSelectNeighborhood: (neighborhood: string) => void;
    colorScheme?: "primary" | "secondary";
}

type BarriosGeoJSON = L.GeoJSON<BarriosGeoJSONProperties>;

export function GeoJSONWithInteractionsLayer({
    selectedNeighborhood,
    onSelectNeighborhood,
    colorScheme = "primary",
}: GeoJSONWithInteractionsProps) {
    const [barriosGeoJSON, setBarriosGeoJSON] =
        useState<BarriosFeatureCollection | null>(null);
    const geoJsonRef = useRef<BarriosGeoJSON | null>(null);
    const map = useMap();

    const styles = getGeoJSONStyle(colorScheme);

    // Load GeoJSON data once
    useEffect(() => {
        barriosGeoJSONPromise.then(setBarriosGeoJSON);
    }, []);

    // Update styles if selectedBarrio changes
    useEffect(() => {
        if (geoJsonRef.current) {
            geoJsonRef.current.eachLayer((layer) => {
                const typedLayer = layer as L.Polygon<BarriosGeoJSONProperties>;
                const name = typedLayer.feature?.properties?.nombre;
                typedLayer.setStyle(
                    name === selectedNeighborhood?.barrio
                        ? styles.selected
                        : styles.default
                );

                if (!selectedNeighborhood) {
                    map.flyTo(MAP_CENTER, MAP_ZOOM, {
                        animate: true,
                        duration: 0.2,
                    });
                    return;
                }

                if (name === selectedNeighborhood.barrio) {
                    map.fitBounds(typedLayer.getBounds(), {
                        padding: [20, 20],
                        maxZoom: 16,
                        animate: true,
                    });
                }
            });
        }
    }, [selectedNeighborhood, styles, map]);

    // Interactions for each feature
    const onEachFeature = useCallback<
        NonNullable<BarriosGeoJSON["options"]["onEachFeature"]>
    >(
        (feature, layer: L.Polygon<BarriosGeoJSONProperties>) => {
            const name = feature?.properties?.nombre;
            if (!name) return;

            layer.on({
                click: () => onSelectNeighborhood(name),
                mouseover: () => {
                    if (name !== selectedNeighborhood?.barrio) {
                        layer.setStyle(styles.hover);
                    }
                    layer.bringToFront();
                },
                mouseout: () => {
                    layer.setStyle(
                        name === selectedNeighborhood?.barrio
                            ? styles.selected
                            : styles.default
                    );
                },
            });

            layer.bindTooltip(name, {
                direction: "top",
                sticky: true,
                offset: [0, -5],
                opacity: 0.9,
                className: "leaflet-tooltip-own", // <- still CSS-based
            });

            if (name === selectedNeighborhood?.barrio) {
                map.fitBounds(layer.getBounds(), {
                    padding: [20, 20],
                    maxZoom: 16,
                    animate: true,
                });
            }
        },
        [selectedNeighborhood, onSelectNeighborhood, styles]
    );

    // Create and mount GeoJSON layer
    useEffect(() => {
        if (!barriosGeoJSON) return;

        const geoJsonLayer = L.geoJSON(barriosGeoJSON, {
            style: (feature) =>
                feature?.properties?.nombre === selectedNeighborhood?.barrio
                    ? styles.selected
                    : styles.default,
            onEachFeature,
        });

        geoJsonRef.current = geoJsonLayer;
        geoJsonLayer.addTo(map);

        return () => {
            map.removeLayer(geoJsonLayer);
        };
    }, [barriosGeoJSON, selectedNeighborhood, onEachFeature, map, styles]);

    return null;
}
