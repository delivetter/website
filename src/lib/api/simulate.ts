import { Neighborhood, StartPoint, Warehouse } from "../neighborhoods";

export interface ModelResults {
    total_kms_walk: number;
    total_hours_walk: number;
    total_kms_drive: number;
    total_hours_drive: number;
    distance_cost_van: number;
    distance_cost_ona: number;
    time_cost_van: number;
    time_cost_ona: number;
    total_cost: number;
}

export interface ModelOutput {
    results: ModelResults;
    map_html: string;
}

export interface SimulateOutput {
    m1: ModelOutput;
    m2: ModelOutput;
}

export const simulate = async (
    e: React.FormEvent,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setSimulationResult: React.Dispatch<
        React.SetStateAction<SimulateOutput | null>
    >,
    selectedNeighborhood: Neighborhood | null,
    startPoint: StartPoint | null,
    selectedWarehouse: Warehouse | null,
    selectedPackageQty: number | null
) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        const response = await fetch("https://api.delivetter.tech/simulate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTc0NzM4MTc1MSwiZXhwIjozNzQ3Mzg1MzUxfQ.bd4p_EaeyXqydoSSDbJHoxtocinK0FOoPY9gYs-hrOg",
            },
            body: JSON.stringify({
                barrio: selectedNeighborhood!.barrio,
                nodo_entrada: startPoint!.id,
                almacen: selectedWarehouse!.id,
                num_paquetes: selectedPackageQty,
            }),
        });

        if (!response.ok) throw new Error(await response.text());

        const data: SimulateOutput = await response.json();
        setSimulationResult(data); // puedes dividirlo en dos si quieres M1 y M2 separados
    } catch (err) {
        throw err
    } finally {
        setIsLoading(false);
    }
};
