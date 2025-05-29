import { TabsContent } from "@/components/ui/tabs";
import { NeighborhoodsMap } from "../common/NeighborhoodsMap";
import {
    FaBoxOpen,
    FaChartLine,
    FaClock,
    FaLeaf,
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaPlayCircle,
    FaRobot,
    FaTruck,
} from "react-icons/fa";
import MiniBarrioMap from "./MiniBarrioMap";
import { SimulationsTabContentProps } from "../common/types/props";
import React, { useState } from "react";
import { Coordinates } from "@/lib/types/coordinates";
import { Neighborhood, StartPoint, Warehouse } from "@/lib/neighborhoods";
import { ModelsObject } from "../common/types/models";
import { simulate, SimulateOutput } from "@/lib/api/simulate";
import { cn } from "@/lib/utils";
import { ResultMapPreview } from "./ResultMapPreview";
import { motion } from "framer-motion";

interface InteractiveSimulationsTabContentProps
    extends SimulationsTabContentProps {
    startPoint: StartPoint | null;
    selectedWarehouse: Warehouse | null;
}

export function InteractiveSimulationsTabContent({
    selectedNeighborhood,
    setSelectedNeighborhood,
    selectedPackageQty,
    setSelectedPackageQty,
    startPoint,
    selectedWarehouse,
    neighborhoods,
}: InteractiveSimulationsTabContentProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [simulationResult, setSimulationResult] =
        useState<SimulateOutput | null>(null);

    return (
        <TabsContent
            value="interactive"
            className="focus:outline-none py-4 transition-all duration-500 ease-in-out"
        >
            <div
                className={`bg-white rounded-lg shadow-md transition-all duration-300 border-l-4 overflow-hidden border-secondary hover:shadow-lg hover:transform hover:-translate-y-1 p-6 mb-8`}
            >
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
                                {Object.keys(neighborhoods).sort().map((n) => (
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
                                Selected:{" "}
                                <strong>{selectedPackageQty || 1}</strong>{" "}
                                packages
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
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
                </form>
                {simulationResult && (
                    <div>
                        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
                            Simulation Results
                        </h3>

                        <div className="flex flex-row gap-x-6 mt-6 bg-white p-4 rounded-md shadow">
                            
                            <div className="h-full flex flex-col gap-4  p-4 rounded-lg shadow-sm border border-gray-100 w-1/2 items-center">
                                <motion.div
                                    className="flex items-center"
                                    initial={{
                                        x: -30,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        x: 0,
                                        opacity: 1,
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.2,
                                    }}
                                >
                                    <div className="bg-gray-700 p-4 rounded-full mr-5 shadow-lg">
                                        <FaTruck className="text-3xl text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-bold text-gray-700">
                                            Traditional Delivery
                                        </h2>
                                        <p className="text-gray-700">
                                            Human-driven vehicles
                                        </p>
                                    </div>
                                </motion.div>
                                <ResultMapPreview
                                    html={simulationResult.m1.map_html}
                                    className="w-full h-[500px]"
                                />
                            </div>

                            <div className="flex flex-col gap-4 bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-lg shadow-sm border border-gray-100 w-1/2 items-center">
                                <motion.div
                                    className="flex items-center"
                                    initial={{
                                        x: 30,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        x: 0,
                                        opacity: 1,
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.2,
                                    }}
                                >
                                    <div className="bg-white p-4 rounded-full mr-5 shadow-lg">
                                        <FaRobot className="text-3xl text-purple-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-bold text-white">
                                            Autonomous Delivery
                                        </h2>
                                        <p className="text-purple-100">
                                            AI-powered robots
                                        </p>
                                    </div>
                                </motion.div>
                                <ResultMapPreview
                                    html={simulationResult.m2.map_html}
                                    className="w-full h-[500px]"
                                />
                            </div>
                        </div>
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
                    </div>
                )}
            </div>
        </TabsContent>
    );
}
