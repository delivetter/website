import { Neighborhood } from "@/lib/neighborhoods";
import { cn } from "@/lib/utils";
import React from "react";

export interface NeighborhoodSelectProps {
    neighborhoods: Record<string, Neighborhood>;
    selectedNeighborhood: Neighborhood | null;
    setSelectedNeighborhood: React.Dispatch<
        React.SetStateAction<Neighborhood | null>
    >;
    selectedSimulationType: string;
    className?: string;
}

export default function NeighborhoodSelect({
    neighborhoods,
    selectedNeighborhood,
    setSelectedNeighborhood,
    className,
}: NeighborhoodSelectProps) {
    return (
        <select
            value={selectedNeighborhood?.barrio || ""}
            onChange={(e) =>
                setSelectedNeighborhood(
                    e.target.value ? neighborhoods[e.target.value] : null
                )
            }
            className={cn("w-full p-3 rounded-md focus:outline-none", className)}
        >
            <option value="" disabled>
                No neighborhood selected
            </option>
            {Object.keys(neighborhoods)
                .sort()
                .map((barrio) => (
                    <option key={barrio} value={barrio}>
                        {barrio}
                    </option>
                ))}
        </select>
    );
}
