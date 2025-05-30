export type ModelsObject<T> = {
    M1: T;
    M2: T;
};

export type SimulationResults = {
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

export type ModelsSimulationResults = ModelsObject<SimulationResults | null>;
