import { TabsContent } from "@/components/ui/tabs";
import { BarrioMap } from "../common/BarrioMap";
import {
    FaBoxOpen,
    FaClock,
    FaInfo,
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaRobot,
    FaRoute,
    FaShoppingCart,
    FaTruck,
    FaWarehouse,
} from "react-icons/fa";
import { LoadingData } from "../../common/LoadingData";
import React, { useEffect, useState } from "react";
import {
    PredefinedSimulationResultRow,
    predefinedSimulationsResultsPromise,
} from "@/lib/data/predefinedSimulationsResults";
import { ModelsObject } from "../common/types/models";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { SimulationsTabContentProps } from "../common/types/props";

type PredefinedSimulationSelectedResults =
    ModelsObject<PredefinedSimulationResultRow | null>;

export function PredefinedSimulationsTabContent({
    selectedNeighborhood,
    setSelectedNeighborhood,
    selectedPackageQty,
    setSelectedPackageQty,
    neighborhoods,
}: SimulationsTabContentProps) {
    const [isLoading, setIsLoading] = useState(false);

    const [predefinedSimulationsResults, setPredefinedSimulationsResults] =
        useState<PredefinedSimulationResultRow[] | null>(null);
    const [
        predefinedSimulationSelectedResults,
        setPredefinedSimulationSelectedResults,
    ] = useState<PredefinedSimulationSelectedResults | null>(null);

    useEffect(() => {
        setIsLoading(true);
        predefinedSimulationsResultsPromise
            .then((predefinedSimulationsResults) =>
                setPredefinedSimulationsResults(predefinedSimulationsResults)
            )
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        setSelectedPackageQty(null);
    }, [selectedNeighborhood]);

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
                M1: m1,
                M2: m2,
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
            className="focus:outline-none py-4 transition-all duration-500 ease-in-out"
        >
            <div
                className={`bg-white rounded-lg shadow-md transition-all duration-300 border-l-4 overflow-hidden border-primary hover:shadow-lg hover:transform hover:-translate-y-1 p-6 mb-8`}
            >
                <div className="flex items-center mb-4">
                    {true ? (
                        <FaTruck className="text-2xl text-primary mr-3" />
                    ) : (
                        <FaRobot className="text-2xl text-secondary mr-3" />
                    )}
                    <h2 className="text-xl font-semibold">
                        Predefined Route Simulations
                    </h2>
                </div>
                <p className="text-gray-600 mb-6">
                    Compare traditional delivery vans (M1) with autonomous
                    robots (M2) across different neighborhoods and package
                    volumes.
                </p>

                {isLoading ? (
                    <LoadingData />
                ) : (
                    <>
                        <div className="flex flex-row gap-6 mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
                            <div className="flex flex-col gap-6 w-1/2">
                                <div>
                                    <label
                                        htmlFor="neighborhood"
                                        className="flex items-center text-sm font-medium text-gray-700 mb-2"
                                    >
                                        <FaMapMarkerAlt className="text-primary mr-2" />
                                        Neighborhood
                                    </label>
                                    <select
                                        id="neighborhood"
                                        value={selectedNeighborhood?.barrio}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLSelectElement>
                                        ) =>
                                            setSelectedNeighborhood(
                                                neighborhoods[e.target.value]
                                            )
                                        }
                                        className="interactive-input w-full p-3 bg-white border border-gray-200 rounded-md"
                                    >
                                        <option
                                            key="default-neighborhood"
                                            value=""
                                        >
                                            Select neighborhood
                                        </option>
                                        {Object.keys(neighborhoods).map(
                                            (barrio) => (
                                                <option
                                                    key={barrio}
                                                    value={barrio}
                                                >
                                                    {barrio}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                                <div>
                                    <label
                                        htmlFor="packages"
                                        className="flex items-center text-sm font-medium text-gray-700 mb-2"
                                    >
                                        <FaBoxOpen className="text-primary mr-2" />
                                        Package Volume
                                    </label>
                                    <select
                                        id="packages"
                                        value={selectedPackageQty || 1}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLSelectElement>
                                        ) =>
                                            setSelectedPackageQty(
                                                parseInt(e.target.value)
                                            )
                                        }
                                        className="interactive-input w-full p-3 bg-white border border-gray-200 rounded-md"
                                    >
                                        <option key="default-package" value="">
                                            Select package size
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
                            </div>

                            <div className="bg-white rounded-lg shadow-sm border border-gray-100 w-1/2 p-4">
                                <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                                    <FaInfo className="mr-2 text-blue-500" />{" "}
                                    Neighborhood Information
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="text-center">
                                        <FaShoppingCart className="text-primary text-3xl mx-auto mb-2" />
                                        <p className="text-sm text-gray-500">
                                            Stores
                                        </p>
                                        <p className="text-lg font-semibold text-gray-800">
                                            {selectedNeighborhood?.comercios_barrio ||
                                                "-"}
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <FaTruck className="text-secondary text-3xl mx-auto mb-2" />
                                        <p className="text-sm text-gray-500">
                                            Distribution Points
                                        </p>
                                        <p className="text-lg font-semibold text-gray-800">
                                            {selectedNeighborhood?.cids_barrio ||
                                                "-"}
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <FaWarehouse className="text-yellow-500 text-3xl mx-auto mb-2" />
                                        <p className="text-sm text-gray-500">
                                            Warehouses
                                        </p>
                                        <p className="text-lg font-semibold text-gray-800">
                                            {selectedNeighborhood?.almacenes_barrio ||
                                                "-"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {(predefinedSimulationSelectedResults?.M1 ||
                            predefinedSimulationSelectedResults?.M2) && (
                            <div>
                                <h3 className="text-lg font-semibold mb-4 border-b pb-2">
                                    Simulation Results
                                </h3>
                                <div className="flex flex-row gap-6">
                                    <div className="absolute inset-0 overflow-hidden">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-gray-400 rounded-full blur-3xl opacity-30 -mr-20 -mt-20"></div>
                                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-300 rounded-full blur-3xl opacity-20 -ml-10 -mb-10"></div>
                                    </div>
                                    <div className="relative z-10 h-full flex flex-col gap-4  p-4 rounded-lg shadow-sm border border-gray-100 w-1/2 items-center">
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
                                        <div className="flex flex-col gap-4 mb-6 w-full">
                                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                                <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                                                    <FaRoute className="mr-2 text-blue-500" />{" "}
                                                    Distance Metrics
                                                </h4>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-600">
                                                            Walking (km):
                                                        </span>
                                                        <span className="font-medium">
                                                            {predefinedSimulationSelectedResults.M1?.total_kms_walk.toFixed(
                                                                2
                                                            ) || "-"}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-600">
                                                            Driving (km):
                                                        </span>
                                                        <span className="font-medium">
                                                            {predefinedSimulationSelectedResults.M1?.total_kms_drive.toFixed(
                                                                2
                                                            ) || "-"}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center pt-2 border-t border-dashed border-gray-200">
                                                        <span className="text-sm text-gray-600">
                                                            Total:
                                                        </span>
                                                        <span className="font-medium">
                                                            {predefinedSimulationSelectedResults.M1
                                                                ? (
                                                                      predefinedSimulationSelectedResults
                                                                          .M1
                                                                          .total_kms_walk +
                                                                      predefinedSimulationSelectedResults
                                                                          .M1
                                                                          .total_kms_drive
                                                                  ).toFixed(2)
                                                                : "-"}{" "}
                                                            km
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                                <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                                                    <FaClock className="mr-2 text-purple-500" />{" "}
                                                    Time Metrics
                                                </h4>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-600">
                                                            Walking (hours):
                                                        </span>
                                                        <span className="font-medium">
                                                            {predefinedSimulationSelectedResults.M1?.total_hours_walk.toFixed(
                                                                2
                                                            ) || "-"}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-600">
                                                            Driving (hours):
                                                        </span>
                                                        <span className="font-medium">
                                                            {predefinedSimulationSelectedResults.M1?.total_hours_drive.toFixed(
                                                                2
                                                            ) || "-"}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center pt-2 border-t border-dashed border-gray-200">
                                                        <span className="text-sm text-gray-600">
                                                            Total:
                                                        </span>
                                                        <span className="font-medium">
                                                            {predefinedSimulationSelectedResults.M1
                                                                ? (
                                                                      predefinedSimulationSelectedResults
                                                                          .M1
                                                                          .total_hours_walk +
                                                                      predefinedSimulationSelectedResults
                                                                          .M1
                                                                          .total_hours_drive
                                                                  ).toFixed(2)
                                                                : "-"}{" "}
                                                            hours
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                                <div className="flex justify-between items-center mb-3">
                                                    <h4 className="font-medium text-gray-800 flex items-center">
                                                        <FaMoneyBillWave className="mr-2 text-green-500" />{" "}
                                                        Cost Metrics
                                                    </h4>
                                                    <Link
                                                        to="/comparison"
                                                        className="flex items-center text-sm text-primary hover:text-blue-700 transition-colors"
                                                        title="View detailed cost breakdown"
                                                    >
                                                        <FaInfo className="mr-1" />{" "}
                                                        Details of costs
                                                    </Link>
                                                </div>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-600">
                                                            Distance cost:
                                                        </span>
                                                        <span className="font-medium">
                                                            {predefinedSimulationSelectedResults.M1?.distance_cost_van.toFixed(
                                                                2
                                                            ) || "-"}{" "}
                                                            €
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-600">
                                                            Time cost:
                                                        </span>
                                                        <span className="font-medium">
                                                            {predefinedSimulationSelectedResults.M1?.time_cost_van.toFixed(
                                                                2
                                                            ) || "-"}{" "}
                                                            €
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center pt-2 border-t border-dashed border-gray-200">
                                                        <span className="text-sm text-gray-600">
                                                            Total cost:
                                                        </span>
                                                        <span className="font-bold text-lg">
                                                            {predefinedSimulationSelectedResults.M1?.total_cost.toFixed(
                                                                2
                                                            ) || "-"}{" "}
                                                            €
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
                                        <div className="flex flex-col gap-4 mb-6 w-full">
                                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                                <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                                                    <FaRoute className="mr-2 text-blue-500" />{" "}
                                                    Distance Metrics
                                                </h4>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-600">
                                                            Walking (km):
                                                        </span>
                                                        <span className="font-medium">
                                                            {predefinedSimulationSelectedResults.M2?.total_kms_walk.toFixed(
                                                                2
                                                            ) || "-"}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-600">
                                                            Driving (km):
                                                        </span>
                                                        <span className="font-medium">
                                                            {predefinedSimulationSelectedResults.M2?.total_kms_drive.toFixed(
                                                                2
                                                            ) || "-"}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center pt-2 border-t border-dashed border-gray-200">
                                                        <span className="text-sm text-gray-600">
                                                            Total:
                                                        </span>
                                                        <span className="font-medium">
                                                            {predefinedSimulationSelectedResults.M2
                                                                ? (
                                                                      predefinedSimulationSelectedResults
                                                                          .M2
                                                                          .total_kms_walk +
                                                                      predefinedSimulationSelectedResults
                                                                          .M2
                                                                          .total_kms_drive
                                                                  ).toFixed(2)
                                                                : "-"}{" "}
                                                            km
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                                <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                                                    <FaClock className="mr-2 text-purple-500" />{" "}
                                                    Time Metrics
                                                </h4>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-600">
                                                            Walking (hours):
                                                        </span>
                                                        <span className="font-medium">
                                                            {predefinedSimulationSelectedResults.M2?.total_hours_walk.toFixed(
                                                                2
                                                            ) || "-"}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-600">
                                                            Driving (hours):
                                                        </span>
                                                        <span className="font-medium">
                                                            {predefinedSimulationSelectedResults.M2?.total_hours_drive.toFixed(
                                                                2
                                                            ) || "-"}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center pt-2 border-t border-dashed border-gray-200">
                                                        <span className="text-sm text-gray-600">
                                                            Total:
                                                        </span>
                                                        <span className="font-medium">
                                                            {predefinedSimulationSelectedResults.M2
                                                                ? (
                                                                      predefinedSimulationSelectedResults
                                                                          .M2
                                                                          .total_hours_walk +
                                                                      predefinedSimulationSelectedResults
                                                                          .M2
                                                                          .total_hours_drive
                                                                  ).toFixed(2)
                                                                : "-"}{" "}
                                                            hours
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                                <div className="flex justify-between items-center mb-3">
                                                    <h4 className="font-medium text-gray-800 flex items-center">
                                                        <FaMoneyBillWave className="mr-2 text-green-500" />{" "}
                                                        Cost Metrics
                                                    </h4>
                                                    <Link
                                                        to="/comparison"
                                                        className="flex items-center text-sm text-primary hover:text-blue-700 transition-colors"
                                                        title="View detailed cost breakdown"
                                                    >
                                                        <FaInfo className="mr-1" />{" "}
                                                        Details of costs
                                                    </Link>
                                                </div>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-600">
                                                            Distance cost:
                                                        </span>
                                                        <span className="font-medium">
                                                            {predefinedSimulationSelectedResults.M2?.distance_cost_ona.toFixed(
                                                                2
                                                            ) || "-"}{" "}
                                                            €
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-600">
                                                            Time cost:
                                                        </span>
                                                        <span className="font-medium">
                                                            {predefinedSimulationSelectedResults.M2?.time_cost_ona.toFixed(
                                                                2
                                                            ) || "-"}{" "}
                                                            €
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center pt-2 border-t border-dashed border-gray-200">
                                                        <span className="text-sm text-gray-600">
                                                            Total cost:
                                                        </span>
                                                        <span className="font-bold text-lg">
                                                            {predefinedSimulationSelectedResults.M2?.total_cost.toFixed(
                                                                2
                                                            ) || "-"}{" "}
                                                            €
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </TabsContent>
    );
}
