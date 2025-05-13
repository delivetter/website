import Papa from "papaparse";
import { BarrioCoordinatesPointsRow } from "./common/types";

export const puntosPerifericosPromise = fetch("puntos_perifericos.csv")
    .then((res) => res.text())
    .then((csvText) => {
        const { data } = Papa.parse<BarrioCoordinatesPointsRow>(csvText, {
            header: true,
            skipEmptyLines: true,
            delimiter: ",",
            dynamicTyping: true,
            transform: (value, field: string) => {
                if (field === "barrio") return value.trim();
                return value;
            },
        });

        return data.filter(
            (row) => row.barrio && !isNaN(row.x) && !isNaN(row.y)
        );
    })
    .catch((error) => {
        console.error("Error parsing puntos_perifericos.csv:", error);
        throw error;
    });
