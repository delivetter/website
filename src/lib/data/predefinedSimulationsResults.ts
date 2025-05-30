import Papa from "papaparse";
import { SimulationResults } from "@/components/pages/Simulation/common/types/models";

export type PredefinedSimulationResultRow = SimulationResults & {
    modelo: string;
    barrio: string;
    comercios_barrio: number;
    cids_barrio: number;
    almacenes_barrio: number;
    paquetes: number;
    comercios_seleccionados: number;
    semilla: number;
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
                if (field === "modelo") {
                    return value.toLowerCase();
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
