import { TabsContent } from "@/components/ui/tabs";
import { BarrioMap } from "../common/BarrioMap";
import {
    FaBoxOpen,
    FaChartLine,
    FaClock,
    FaLeaf,
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaPlayCircle,
} from "react-icons/fa";
import MiniBarrioMap from "./MiniBarrioMap";
import { SimulationsTabContentProps } from "../common/types/props";
import React, { useState } from "react";
import { Coordinates } from "@/lib/types/coordinates";
import { Neighborhood } from "@/lib/neighborhoods";
import { ModelsObject } from "../common/types/models";

type ModelSimulationResult = {
    time: number;
    emissions: number;
    cost: number;
};

type SimulationResult = ModelsObject<ModelSimulationResult>;

const handleRunSimulation = async (
    e: React.FormEvent,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setSimulationResult: React.Dispatch<
        React.SetStateAction<SimulationResult | null>
    >,
    selectedNeighborhood: Neighborhood | null,
    startPoint: Coordinates | null,
    selectedWarehouse: Coordinates | null,
    selectedPackageQty: number | null
) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        const response = await fetch("/simulate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                barrio: selectedNeighborhood!.barrio,
                nodo_entrada: [startPoint!.lat, startPoint!.lon],
                almacen: [selectedWarehouse!.lat, selectedWarehouse!.lon],
                paquetes: selectedPackageQty,
            }),
        });

        if (!response.ok) throw new Error("Error en la simulación");

        const data = await response.json();
        setSimulationResult(data); // puedes dividirlo en dos si quieres M1 y M2 separados
    } catch (err) {
        console.error("❌ Error en la simulación:", err);
    } finally {
        setIsLoading(false);
    }
};

export function InteractiveSimulationsTabContent({
    selectedNeighborhood,
    setSelectedNeighborhood,
    selectedPackageQty,
    setSelectedPackageQty,
    neighborhoods,
}: SimulationsTabContentProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [startPoint, setStartPoint] = useState<Coordinates | null>(null);
    const [selectedWarehouse, setSelectedWarehouse] =
        useState<Coordinates | null>(null);
    const [simulationResult, setSimulationResult] =
        useState<SimulationResult | null>(null);

    return (
        <TabsContent value="interactive" className="tab-content">
            <div className="simulation-card p-6 mb-8 bg-gradient-to-br from-gray-50 to-white">
                <BarrioMap
                    onSelectBarrio={(name) =>
                        setSelectedNeighborhood(neighborhoods[name])
                    }
                    selectedBarrio={selectedNeighborhood?.barrio}
                    colorScheme="green"
                />

                <div className="flex items-center mb-4">
                    <FaPlayCircle className="text-2xl text-secondary mr-3" />
                    <h2 className="text-xl font-semibold">
                        Interactive Simulation
                    </h2>
                </div>
                <p className="text-gray-600 mb-6">
                    Select a neighborhood and explore different delivery
                    scenarios with custom package volumes.
                </p>
                {selectedNeighborhood && (
                    <div className="mb-6">
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Select Start Point
                        </label>
                        <MiniBarrioMap
                            selectedBarrio={selectedNeighborhood}
                            startPoint={startPoint}
                            setStartPoint={setStartPoint}
                            selectedWarehouse={selectedWarehouse}
                            setSelectedWarehouse={setSelectedWarehouse}
                        />
                    </div>
                )}
                <form
                    onSubmit={(e) =>
                        handleRunSimulation(
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
                    {selectedNeighborhood &&
                        startPoint &&
                        selectedWarehouse &&
                        selectedPackageQty && (
                            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900 shadow-sm">
                                <p className="font-semibold mb-2">
                                    📌 Tus parámetros seleccionados:
                                </p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>
                                        <strong>Barrio:</strong>{" "}
                                        {selectedNeighborhood.barrio}
                                    </li>
                                    <li>
                                        <strong>Punto de entrada:</strong> (
                                        {startPoint.lat.toFixed(4)},{" "}
                                        {startPoint.lon.toFixed(4)})
                                    </li>
                                    <li>
                                        <strong>Almacén:</strong> (
                                        {selectedWarehouse.lat.toFixed(4)},{" "}
                                        {selectedWarehouse.lon.toFixed(4)})
                                    </li>
                                    <li>
                                        <strong>Nº de paquetes:</strong>{" "}
                                        {selectedPackageQty}
                                    </li>
                                </ul>
                            </div>
                        )}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                            <label
                                htmlFor="interactive-neighborhood"
                                className="flex items-center text-sm font-medium text-gray-700 mb-2"
                            >
                                <FaMapMarkerAlt className="text-secondary mr-2" />
                                Neighborhood
                            </label>
                            <select
                                id="interactive-neighborhood"
                                value={selectedNeighborhood?.barrio}
                                onChange={(e) =>
                                    setSelectedNeighborhood(
                                        neighborhoods[e.target.value]
                                    )
                                }
                                className="interactive-input w-full p-3 bg-white"
                            >
                                <option value="">Select neighborhood</option>
                                {Object.keys(neighborhoods).map((n) => (
                                    <option key={n} value={n}>
                                        {n}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                            <label
                                htmlFor="interactive-packages"
                                className="flex items-center text-sm font-medium text-gray-700 mb-2"
                            >
                                <FaBoxOpen className="text-secondary mr-2" />
                                Number of Packages
                            </label>
                            <input
                                type="range"
                                id="interactive-packages"
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
                                className="w-full accent-secondary"
                            />
                            <div className="text-center text-sm text-gray-700 mt-2">
                                Selected: <strong>{selectedPackageQty || 1}</strong>{" "}
                                packages
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="submit-button px-6 py-3 bg-secondary text-white rounded-md hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 flex items-center shadow-md"
                        >
                            <FaPlayCircle className="mr-2" />
                            {isLoading ? "Processing..." : "Run Simulation"}
                        </button>
                    </div>
                </form>
                {simulationResult && (
                    <div className="mt-6 bg-white p-4 rounded-md shadow">
                        <h3 className="font-bold text-lg mb-3">
                            Resultados modelo M1
                        </h3>
                        <pre className="text-sm text-gray-700">
                            {JSON.stringify(simulationResult.M1, null, 2)}
                        </pre>

                        <h3 className="font-bold text-lg mt-6 mb-3">
                            Resultados modelo M2
                        </h3>
                        <pre className="text-sm text-gray-700">
                            {JSON.stringify(simulationResult.M2, null, 2)}
                        </pre>
                    </div>
                )}

                {isLoading && (
                    <div className="text-center py-6">
                        <div className="inline-block w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-3 text-gray-600">
                            Calculating results...
                        </p>
                    </div>
                )}

                {!isLoading && !simulationResult && (
                    <div className="text-center bg-blue-50 p-8 rounded-lg border border-blue-100">
                        <FaChartLine className="text-primary text-4xl mx-auto mb-4 opacity-50" />
                        <p className="text-gray-600">
                            Complete the form and click "Run Simulation" to see
                            the results.
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                            (This is a demonstration - actual API connection
                            will be implemented in the final version)
                        </p>
                    </div>
                )}

                {!isLoading && simulationResult && (
                    <div className="mt-8 border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-semibold mb-4 text-center">
                            Simulation Results
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 text-center shadow-sm">
                                <FaClock className="text-primary text-2xl mx-auto mb-2" />
                                <div className="text-sm text-gray-500 mb-1">
                                    Delivery Time
                                </div>
                                <div className="text-2xl font-bold text-primary">
                                    {simulationResult.M1.time} min
                                </div>
                            </div>
                            <div className="bg-green-50 p-5 rounded-lg border border-green-100 text-center shadow-sm">
                                <FaLeaf className="text-green-500 text-2xl mx-auto mb-2" />
                                <div className="text-sm text-gray-500 mb-1">
                                    CO2 Emissions
                                </div>
                                <div className="text-2xl font-bold text-green-500">
                                    {simulationResult.M1.emissions} g
                                </div>
                            </div>
                            <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-100 text-center shadow-sm">
                                <FaMoneyBillWave className="text-yellow-500 text-2xl mx-auto mb-2" />
                                <div className="text-sm text-gray-500 mb-1">
                                    Operational Cost
                                </div>
                                <div className="text-2xl font-bold text-yellow-500">
                                    {simulationResult.M1.cost} €
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </TabsContent>
    );
}
