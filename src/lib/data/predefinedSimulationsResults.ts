import Papa from "papaparse";

export type PredefinedSimulationResultRow = {
    modelo: string;
    barrio: string;
    comercios_barrio: number;
    cids_barrio: number;
    almacenes_barrio: number;
    paquetes: number;
    comercios_seleccionados: number;
    semilla: number;
    total_kms_walk: number;
    total_hours_walk: number;
    total_kms_drive: number;
    total_hours_drive: number;
    distance_cost_van: number;
    distance_cost_ona: number;
    time_cost_van: number;
    time_cost_ona: number;
    total_cost: number;
};

export const predefinedSimulationsResultsPromise = fetch(
    "results_simulations_agrupado.csv"
)
    .then((res) => res.text())
    .then((csv) => {
        const { data } = Papa.parse<PredefinedSimulationResultRow>(csv, {
            header: true,
            skipEmptyLines: true,
            delimiter: ",",
            dynamicTyping: true,
            transform: (value, field: string) => {
                if (["barrio", "modelo"].includes(field)) {
                    return value.trim();
                }
                return value;
            },
        });

        return data.filter(
            (row) => row.barrio && row.modelo && !isNaN(row.paquetes)
        );
    })
    .catch((error) => {
        console.error("Error parsing results_simulations_agrupado.csv:", error);
        throw error;
    });
