import { motion } from "framer-motion";
import { ModelsSimulationResults } from "../types/models";
import {
    FaClock,
    FaInfo,
    FaMoneyBillWave,
    FaRobot,
    FaRoute,
    FaTruck,
} from "react-icons/fa";
import { Link } from "wouter";
import { ResultMapPreview } from "./ResultMapPreview";

export type SimulationResultsProps = {
    simulationResults: ModelsSimulationResults;
};

export default function SimulationResults({
    simulationResults,
}: SimulationResultsProps) {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4 border-b pb-2">
                Simulation Results
            </h3>
            <div className="flex flex-row gap-6">
                <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ pointerEvents: "none" }}
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gray-400 rounded-full blur-3xl opacity-30 -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-300 rounded-full blur-3xl opacity-20 -ml-10 -mb-10"></div>
                </div>
                <div className="flex flex-col gap-4 px-4 py-5 rounded-lg shadow-sm border border-gray-100 w-1/2 items-center h-min">
                    <motion.div
                        className="flex gap-5 justify-start w-full mb-2 ml-1"
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
                        <div className="bg-gray-700 p-4 rounded-full shadow-lg">
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
                    <div className="flex flex-col gap-4 w-full h-full">
                        {simulationResults.m1?.map_html && (
                            <ResultMapPreview
                                html={simulationResults.m1.map_html}
                                className="h-[400px] w-full rounded-lg shadow-sm"
                            />
                        )}
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 h-1/3">
                            <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                                <FaRoute className="mr-2 text-blue-500" />{" "}
                                Distance Metrics
                            </h4>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">
                                        Walking:
                                    </span>
                                    <span className="font-medium">
                                        {simulationResults.m1?.results.total_kms_walk.toFixed(
                                            2
                                        ) || "-"}{" "}
                                        km
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">
                                        Driving:
                                    </span>
                                    <span className="font-medium">
                                        {simulationResults.m1?.results.total_kms_drive.toFixed(
                                            2
                                        ) || "-"}{" "}
                                        km
                                    </span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-dashed border-gray-200">
                                    <span className="text-sm text-gray-600">
                                        Total:
                                    </span>
                                    <span className="font-medium">
                                        {simulationResults.m1
                                            ? (
                                                  simulationResults.m1.results
                                                      .total_kms_walk +
                                                  simulationResults.m1.results
                                                      .total_kms_drive
                                              ).toFixed(2)
                                            : "-"}{" "}
                                        km
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 h-1/3">
                            <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                                <FaClock className="mr-2 text-purple-500" />{" "}
                                Time Metrics
                            </h4>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">
                                        Walking:
                                    </span>
                                    <span className="font-medium">
                                        {simulationResults.m1?.results.total_hours_walk.toFixed(
                                            2
                                        ) || "-"}{" "}
                                        hours
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">
                                        Driving:
                                    </span>
                                    <span className="font-medium">
                                        {simulationResults.m1?.results.total_hours_drive.toFixed(
                                            2
                                        ) || "-"}{" "}
                                        hours
                                    </span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-dashed border-gray-200">
                                    <span className="text-sm text-gray-600">
                                        Total:
                                    </span>
                                    <span className="font-medium">
                                        {simulationResults.m1
                                            ? (
                                                  simulationResults.m1.results
                                                      .total_hours_walk +
                                                  simulationResults.m1.results
                                                      .total_hours_drive
                                              ).toFixed(2)
                                            : "-"}{" "}
                                        hours
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 h-1/3">
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
                                    <FaInfo className="mr-1" /> Details of costs
                                </Link>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">
                                        Distance cost:
                                    </span>
                                    <span className="font-medium">
                                        {simulationResults.m1?.results.distance_cost_van.toFixed(
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
                                        {simulationResults.m1?.results.time_cost_van.toFixed(
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
                                        {simulationResults.m1?.results.total_cost.toFixed(
                                            2
                                        ) || "-"}{" "}
                                        €
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-5 rounded-lg shadow-sm border border-gray-100 w-1/2 items-center h-min">
                    <motion.div
                        className="flex gap-5 justify-start w-full mb-2 ml-1"
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
                        <div className="bg-white p-4 rounded-full shadow-lg">
                            <FaRobot className="text-3xl text-purple-600" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-white">
                                Autonomous Delivery
                            </h2>
                            <p className="text-purple-100">AI-powered robots</p>
                        </div>
                    </motion.div>
                    <div className="flex flex-col gap-4 w-full h-full">
                        {simulationResults.m2?.map_html && (
                            <ResultMapPreview
                                html={simulationResults.m2.map_html}
                                className="h-[400px] w-full rounded-lg shadow-sm"
                            />
                        )}
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 h-1/3">
                            <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                                <FaRoute className="mr-2 text-blue-500" />{" "}
                                Distance Metrics
                            </h4>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">
                                        Walking:
                                    </span>
                                    <span className="font-medium">
                                        {simulationResults.m2?.results.total_kms_walk.toFixed(
                                            2
                                        ) || "-"}{" "}
                                        km
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">
                                        Driving:
                                    </span>
                                    <span className="font-medium">
                                        {simulationResults.m2?.results.total_kms_drive.toFixed(
                                            2
                                        ) || "-"}{" "}
                                        km
                                    </span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-dashed border-gray-200">
                                    <span className="text-sm text-gray-600">
                                        Total:
                                    </span>
                                    <span className="font-medium">
                                        {simulationResults.m2
                                            ? (
                                                  simulationResults.m2.results
                                                      .total_kms_walk +
                                                  simulationResults.m2.results
                                                      .total_kms_drive
                                              ).toFixed(2)
                                            : "-"}{" "}
                                        km
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 h-1/3">
                            <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                                <FaClock className="mr-2 text-purple-500" />{" "}
                                Time Metrics
                            </h4>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">
                                        Walking:
                                    </span>
                                    <span className="font-medium">
                                        {simulationResults.m2?.results.total_hours_walk.toFixed(
                                            2
                                        ) || "-"}{" "}
                                        hours
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">
                                        Driving:
                                    </span>
                                    <span className="font-medium">
                                        {simulationResults.m2?.results.total_hours_drive.toFixed(
                                            2
                                        ) || "-"}{" "}
                                        hours
                                    </span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-dashed border-gray-200">
                                    <span className="text-sm text-gray-600">
                                        Total:
                                    </span>
                                    <span className="font-medium">
                                        {simulationResults.m2
                                            ? (
                                                  simulationResults.m2.results
                                                      .total_hours_walk +
                                                  simulationResults.m2.results
                                                      .total_hours_drive
                                              ).toFixed(2)
                                            : "-"}{" "}
                                        hours
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 h-1/3">
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
                                    <FaInfo className="mr-1" /> Details of costs
                                </Link>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">
                                        Distance cost:
                                    </span>
                                    <span className="font-medium">
                                        {simulationResults.m2?.results.distance_cost_ona.toFixed(
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
                                        {simulationResults.m2?.results.time_cost_ona.toFixed(
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
                                        {simulationResults.m2?.results.total_cost.toFixed(
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
    );
}
