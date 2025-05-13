import Papa from "papaparse";
import { BarrioCoordinatesPointsRow } from "./common/types";

export const almacenesPromise = fetch("almacenes.csv")
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
        console.error("Error parsing almacenes.csv:", error);
        throw error;
    });
