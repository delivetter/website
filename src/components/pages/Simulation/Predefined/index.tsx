import { TabsContent } from "@/components/ui/tabs";
import { NeighborhoodsMap } from "../common/NeighborhoodsMap";
import {
    FaBoxOpen,
    FaMapMarkerAlt,
} from "react-icons/fa";
import React, { useEffect, useState } from "react";
import {
    PredefinedSimulationResultRow,
    predefinedSimulationsResultsPromise,
} from "@/lib/data/predefinedSimulationsResults";
import { ModelsObject } from "../common/types/models";
import { SimulationsTabContentProps } from "../common/types/props";
import NeighborhoodInfo from "../common/NeighborhoodInfo";
import PredefinedTitle from "./Title";
import SimulationResults from "../common/SimulationResults";

type PredefinedSimulationSelectedResults =
    ModelsObject<{"results": PredefinedSimulationResultRow | null}> | null;

export function PredefinedSimulationsTabContent({
    selectedNeighborhood,
    setSelectedNeighborhood,
    selectedPackageQty,
    setSelectedPackageQty,
    neighborhoods,
    selectedSimulationType,
}: SimulationsTabContentProps) {
    const [predefinedSimulationsResults, setPredefinedSimulationsResults] =
        useState<PredefinedSimulationResultRow[] | null>(null);
    const [
        predefinedSimulationSelectedResults,
        setPredefinedSimulationSelectedResults,
    ] = useState<PredefinedSimulationSelectedResults | null>(null);

    useEffect(() => {
        predefinedSimulationsResultsPromise.then(
            (predefinedSimulationsResults) =>
                setPredefinedSimulationsResults(predefinedSimulationsResults)
        );
    }, []);

    useEffect(() => {
        setSelectedPackageQty(null);
        setPredefinedSimulationSelectedResults(null);
    }, [selectedNeighborhood, selectedSimulationType]);

    useEffect(() => {
        if (
            selectedNeighborhood &&
            selectedPackageQty &&
            predefinedSimulationsResults &&
            predefinedSimulationsResults.length > 0
        ) {
            const filtered = predefinedSimulationsResults.filter(
                (row) =>
                    row.barrio === selectedNeighborhood.barrio &&
                    row.paquetes === selectedPackageQty
            );
            const m1 = filtered.find((row) => row.modelo === "M1") || null;
            const m2 = filtered.find((row) => row.modelo === "M2") || null;

            setPredefinedSimulationSelectedResults({
                m1: {
                    results: m1
                },
                m2: {
                    results: m2
                },
            });
        }
    }, [
        selectedNeighborhood,
        selectedPackageQty,
        predefinedSimulationsResults,
    ]);

    return (
        <TabsContent
            value="predefined"
            className="bg-white rounded-b-md shadow-md overflow-hidden border-l-4 border-primary hover:shadow-lg p-6 mb-8 mt-0"
        >
            <PredefinedTitle />
            <div className="flex flex-col mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
                <label
                    htmlFor="packages"
                    className="flex items-center text-base font-medium text-gray-700 mb-4"
                >
                    <FaMapMarkerAlt className="text-primary mr-2" />
                    Neighborhood
                </label>
                <div className="flex flex-row w-full gap-4 h-96">
                    <NeighborhoodsMap
                        className="w-3/4"
                        neighborhoods={neighborhoods}
                        selectedNeighborhood={selectedNeighborhood}
                        setSelectedNeighborhood={setSelectedNeighborhood}
                        selectedSimulationType="predefined"
                    />
                    <NeighborhoodInfo
                        neighborhood={selectedNeighborhood}
                        selectedSimulationType="predefined"
                        className="w-1/4"
                    />
                </div>
            </div>

            <div className="flex flex-row gap-4 mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
                <label
                    htmlFor="packages"
                    className="flex w-1/5 items-center text-base font-medium text-gray-700"
                >
                    <FaBoxOpen className="text-primary mr-2" />
                    Number of packages
                </label>
                <select
                    id="packages"
                    value={selectedPackageQty || 1}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setSelectedPackageQty(parseInt(e.target.value))
                    }
                    className="interactive-input w-4/5 p-3 bg-white border border-gray-200 rounded-md"
                    disabled={!selectedNeighborhood}
                >
                    <option key="default-package" value="">
                        No packages selected
                    </option>
                    {(selectedNeighborhood?.paquetes
                        ? selectedNeighborhood.paquetes
                        : []
                    ).map((size) => (
                        <option key={size} value={size}>
                            {size} packages
                        </option>
                    ))}
                </select>
            </div>
            {predefinedSimulationSelectedResults ? (
                <SimulationResults
                    simulationResults={predefinedSimulationSelectedResults}
                />
            ) : null}
        </TabsContent>
    );
}
