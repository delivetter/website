import { TabsContent } from "@/components/ui/tabs";
import { NeighborhoodsMap } from "../common/NeighborhoodsMap";
import {
    FaBoxOpen,
    FaChartLine,
    FaMapMarkerAlt,
    FaPlayCircle,
} from "react-icons/fa";
import { SimulationsTabContentProps } from "../common/types/props";
import React, { useEffect, useState } from "react";
import { StartPoint, Warehouse } from "@/lib/neighborhoods";
import { simulate, SimulateOutput } from "@/lib/api/simulate";
import InteractiveTitle from "./Title";
import NeighborhoodInfo from "../common/NeighborhoodInfo";
import MapLegend from "./MapLegend";
import SimulationResults from "../common/SimulationResults";

export function InteractiveSimulationsTabContent({
    selectedNeighborhood,
    setSelectedNeighborhood,
    selectedPackageQty,
    setSelectedPackageQty,
    neighborhoods,
    selectedSimulationType,
}: SimulationsTabContentProps) {
    const [isLoading, setIsLoading] = useState(false);

    const [startPoint, setStartPoint] = useState<StartPoint | null>(null);
    const [selectedWarehouse, setSelectedWarehouse] =
        useState<Warehouse | null>(null);

    const [simulationResult, setSimulationResult] =
        useState<SimulateOutput | null>(null);

    useEffect(() => {
        setStartPoint(null);
        setSelectedWarehouse(null);
        setSimulationResult(null);
    }, [selectedNeighborhood, selectedSimulationType]);

    return (
        <TabsContent
            value="interactive"
            className="bg-white rounded-b-md shadow-md overflow-hidden border-l-4 border-secondary hover:shadow-lg p-6 mb-8 mt-0"
        >
            <InteractiveTitle />
            <form
                onSubmit={(e) =>
                    simulate(
                        e,
                        setIsLoading,
                        setSimulationResult,
                        selectedNeighborhood,
                        startPoint,
                        selectedWarehouse,
                        selectedPackageQty
                    )
                }
                className="mb-8"
            >
                <div className="flex flex-col mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
                    <div className="flex flex-row gap-4 items-center mb-4 min-h-12">
                        <label
                            htmlFor="packages"
                            className="flex items-center text-base font-medium text-gray-700"
                        >
                            <FaMapMarkerAlt className="text-secondary mr-2" />
                            Neighborhood
                        </label>
                        {selectedNeighborhood && (
                            <div className="p-3 px-5 bg-white rounded-lg border border-gray-100 text-sm w-full flex gap-24 items-center justify-center">
                                <MapLegend />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-row w-full gap-4 h-96">
                        <NeighborhoodsMap
                            className="w-3/4"
                            neighborhoods={neighborhoods}
                            selectedNeighborhood={selectedNeighborhood}
                            setSelectedNeighborhood={setSelectedNeighborhood}
                            startPoint={startPoint}
                            setStartPoint={setStartPoint}
                            selectedWarehouse={selectedWarehouse}
                            setSelectedWarehouse={setSelectedWarehouse}
                            selectedSimulationType="interactive"
                        />
                        <NeighborhoodInfo
                            neighborhood={selectedNeighborhood}
                            selectedSimulationType="interactive"
                            className="w-1/4"
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-4 w-full h-20 justify-between">
                    <div className="flex flex-row w-3/4 h-full items-start mb-6 bg-gray-50 p-4 mr-2 rounded-lg shadow-sm">
                        <label
                            htmlFor="packages"
                            className="flex items-center text-base font-medium text-gray-700 w-1/4"
                        >
                            <FaBoxOpen className="text-secondary mr-2" />
                            Number of packages
                        </label>
                        <div className="flex flex-col gap-2 w-3/4 mt-1">
                            <input
                                type="range"
                                id="packages"
                                min={1}
                                max={Math.max(
                                    ...(selectedNeighborhood?.paquetes || [])
                                )}
                                value={selectedPackageQty || 1}
                                onChange={(e) =>
                                    setSelectedPackageQty(
                                        parseInt(e.target.value)
                                    )
                                }
                                className="accent-secondary"
                            />
                            <div className="text-center text-sm text-gray-700">
                                Selected:{" "}
                                <strong>{selectedPackageQty || 1}</strong>{" "}
                                packages
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center w-1/4 mr-2 h-full">
                        <button
                            type="submit"
                            disabled={
                                !selectedNeighborhood ||
                                !selectedPackageQty ||
                                !selectedWarehouse ||
                                !startPoint
                            }
                            className="submit-button px-6 py-3 bg-secondary text-white rounded-md hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 flex items-center shadow-md disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                        >
                            <FaPlayCircle className="mr-2" />
                            {isLoading ? "Processing..." : "Run Simulation"}
                        </button>
                    </div>
                </div>
            </form>
            {!isLoading && !simulationResult && (
                <div className="text-center bg-green-50 p-8 rounded-lg border border-green-100">
                    <FaChartLine className="text-secondary   text-4xl mx-auto mb-4 opacity-50" />
                    <p className="text-gray-600">
                        Complete the form and click "Run Simulation" to see the
                        results.
                    </p>
                </div>
            )}
            {isLoading && (
                <div className="text-center py-6">
                    <div className="inline-block w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-3 text-gray-600">Calculating results...</p>
                </div>
            )}
            {!isLoading && simulationResult && (
                <SimulationResults
                    simulationResults={simulationResult}
                />
            )}
        </TabsContent>
    );
}
