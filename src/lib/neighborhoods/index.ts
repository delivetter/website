import { almacenesPromise } from "../data/almacenes";
import { predefinedSimulationsResultsPromise } from "../data/predefinedSimulationsResults";
import { puntosPerifericosPromise } from "../data/puntosPerifericos";
import { barriosGeoJSONPromise } from "../data/barriosGeoJSON";
import { Coordinates } from "../types/coordinates";

export type Neighborhood = {
    barrio: string;
    almacenes_locations: Coordinates[];
    puntos_perifericos_locations: Coordinates[];
    almacenes_barrio: number;
    comercios_barrio: number;
    cids_barrio: number;
    paquetes: number[];
    geoJSONFeature: Awaited<typeof barriosGeoJSONPromise>["features"][number];
};

export const getNeighborhoods = async () => {
    const [
        predefinedSimulationsResults,
        almacenes,
        puntosPerifericos,
        barriosGeoJSON,
    ] = await Promise.all([
        predefinedSimulationsResultsPromise,
        almacenesPromise,
        puntosPerifericosPromise,
        barriosGeoJSONPromise,
    ]);

    const result: Record<string, Neighborhood> = {};

    for (const row of barriosGeoJSON.features) {
        result[row.properties.nombre] = {
            barrio: row.properties.nombre,
            almacenes_locations: [],
            puntos_perifericos_locations: [],
            almacenes_barrio: 0,
            comercios_barrio: 0,
            cids_barrio: 0,
            paquetes: [],
            geoJSONFeature: row,
        };
    }

    for (const row of predefinedSimulationsResults) {
        const barrio = result[row.barrio]!;
        barrio.almacenes_barrio = row.almacenes_barrio;
        barrio.comercios_barrio = row.comercios_barrio;
        barrio.cids_barrio = row.cids_barrio;

        if (!barrio.paquetes.includes(row.paquetes)) {
            barrio.paquetes.push(row.paquetes);
        }
    }

    for (const row of almacenes) {
        const barrio = result[row.barrio]!;
        if (
            !barrio.almacenes_locations.some(
                ({ lon, lat }) => lon === row.x && lat === row.y
            )
        ) {
            barrio.almacenes_locations.push({ lon: row.x, lat: row.y });
        }
    }

    for (const row of puntosPerifericos) {
        const barrio = result[row.barrio]!;
        if (
            !barrio.puntos_perifericos_locations.some(
                ({ lon, lat }) => lon === row.x && lat === row.y
            )
        ) {
            barrio.puntos_perifericos_locations.push({
                lon: row.x,
                lat: row.y,
            });
        }
    }

    return result;
};
