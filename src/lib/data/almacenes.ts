import Papa from "papaparse";
import { BarrioCoordinatesPointsRow } from "./common/types";

interface AlmacenesRow extends BarrioCoordinatesPointsRow {
    id: string;
}

export const almacenesPromise = fetch("almacenes.csv")
    .then((res) => res.text())
    .then((csvText) => {
        const { data } = Papa.parse<AlmacenesRow>(csvText, {
            header: true,
            skipEmptyLines: true,
            delimiter: ",",
            dynamicTyping: true,
            transform: (value, field: string) => {
                if (field === "barrio") return value.trim();
                if (field === "id") return value.trim();
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
