import { Geometry } from "geojson";
import { Coordinates } from "../types/coordinates";

export type BarriosGeoJSONProperties = {
    coddistbar: string;
    nombre: string;
    coddistrit: string;
    codbarrio: string;
    gis_gis_barrios_area: number;
    geo_point_2d: Coordinates;
};

export type BarriosGeoJSON = GeoJSON.FeatureCollection<
    Geometry,
    BarriosGeoJSONProperties
>;

export const barriosGeoJSONPromise = fetch("barris.geojson")
    .then(async (res) => {
        const geojson: BarriosGeoJSON = await res.json();
        return geojson;
    })
    .catch((error) => {
        console.error("Error fetching barrios.geojson:", error);
        throw error;
    });
