import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
    FaInfo,
    FaRoute,
    FaPlayCircle,
    FaChartLine,
    FaExclamationTriangle,
} from "react-icons/fa";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import "leaflet/dist/leaflet.css";
import { PredefinedSimulationsTabContent } from "@/components/pages/Simulation/Predefined";
import {
    getNeighborhoods,
    Neighborhood,
    StartPoint,
    Warehouse,
} from "@/lib/neighborhoods";
import { InteractiveSimulationsTabContent } from "@/components/pages/Simulation/Interactive";
import { NeighborhoodsMap } from "@/components/pages/Simulation/common/NeighborhoodsMap";
import { cn } from "@/lib/utils";
import MiniBarrioMap from "@/components/pages/Simulation/Interactive/MiniBarrioMap";
import Title from "@/components/layout/Title";
import NeighborhoodInfo from "@/components/pages/Simulation/common/NeighborhoodInfo";

export default function Simulation() {
    const [neighborhoods, setNeighborhoods] = useState<
        Record<string, Neighborhood>
    >({});

    const [selectedSimulationType, setSelectedSimulationType] =
        useState("predefined");
    const [selectedNeighborhood, setSelectedNeighborhood] =
        useState<Neighborhood | null>(null);
    const [selectedPackageQty, setSelectedPackageQty] = useState<number | null>(
        null
    );
    const [startPoint, setStartPoint] = useState<StartPoint | null>(null);
    const [selectedWarehouse, setSelectedWarehouse] =
        useState<Warehouse | null>(null);

    useEffect(() => {
        getNeighborhoods().then((data) => {
            setNeighborhoods(data);
        });
    }, []);

    // Animation variants
    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    return (
        <div className="page-transition page-active" id="top">
            <Title
                title="Delivery Simulation"
                subtitle="Explore different delivery scenarios using our simulation tools."
            />
            <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={{ duration: 0.6 }}
            >
                <div
                    className={`flex flex-col gap-4 bg-white rounded-lg shadow-md transition-all duration-300 overflow-hidden hover:shadow-lg hover:transform hover:-translate-y-1 p-6 mb-8 pb-10`}
                >
                    <h2 className="text-xl font-medium w-full">
                        First, select a neighborhood:
                    </h2>
                    <div className="flex flex-row w-full gap-4 h-96">
                        <NeighborhoodsMap
                            className="w-3/4"
                            neighborhoods={neighborhoods}
                            selectedNeighborhood={selectedNeighborhood}
                            setSelectedNeighborhood={setSelectedNeighborhood}
                            selectedSimulationType={selectedSimulationType}
                        />
                        <NeighborhoodInfo
                            neighborhood={selectedNeighborhood}
                            className="w-1/4"
                        />
                    </div>
                    {selectedSimulationType === "interactive" && (
                        <div className="flex flex-col gap-y-4 w-2/5 min-h-full pb-10">
                            <h2 className="text-l font-medium">
                                Choose a starting point and a warehouse:
                            </h2>
                            <div
                                className={cn(
                                    "min-h-full rounded-lg overflow-hidden shadow-md mb-8",
                                    selectedNeighborhood
                                        ? "bg-transparent shadow-none"
                                        : "bg-white flex items-center justify-center"
                                )}
                            >
                                {selectedNeighborhood ? (
                                    <MiniBarrioMap
                                        className="min-h-full bg-white rounded-lg shadow-md transition-all duration-300 overflow-hidden hover:shadow-lg hover:transform hover:-translate-y-1 p-6 mb-8"
                                        selectedBarrio={selectedNeighborhood}
                                        startPoint={startPoint}
                                        setStartPoint={setStartPoint}
                                        selectedWarehouse={selectedWarehouse}
                                        setSelectedWarehouse={
                                            setSelectedWarehouse
                                        }
                                    />
                                ) : (
                                    <div className="flex gap-4 items-center bg-yellow-200 p-4 rounded-lg w-fit ">
                                        <FaExclamationTriangle className="text-lg" />
                                        <div>No neighborhood selected yet!</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <Tabs
                    value={selectedSimulationType}
                    onValueChange={(v) => setSelectedSimulationType(v)}
                >
                    <div className="flex justify-center">
                        <TabsList className="flex w-fit border-b-0 bg-gray-100 p-1 rounded-lg gap-2;">
                            <TabsTrigger
                                value="predefined"
                                className={cn(
                                    "px-6 py-3 text-gray-600 hover:text-primary rounded-md transition-all duration-200 text-center font-medium",
                                    selectedSimulationType == "predefined"
                                        ? "text-white bg-primary shadow-md transform scale-105"
                                        : ""
                                )}
                            >
                                <FaRoute className="mr-2" />
                                Predefined Simulations
                            </TabsTrigger>
                            <TabsTrigger
                                value="interactive"
                                className={cn(
                                    "px-6 py-3 text-gray-600 hover:text-secondary rounded-md transition-all duration-200 text-center font-medium",
                                    selectedSimulationType == "interactive"
                                        ? "text-white bg-secondary shadow-md transform scale-105"
                                        : ""
                                )}
                            >
                                <FaPlayCircle className="mr-2" />
                                Interactive Simulation
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <PredefinedSimulationsTabContent
                        selectedNeighborhood={selectedNeighborhood}
                        setSelectedNeighborhood={setSelectedNeighborhood}
                        selectedPackageQty={selectedPackageQty}
                        setSelectedPackageQty={setSelectedPackageQty}
                        neighborhoods={neighborhoods}
                    />
                    <InteractiveSimulationsTabContent
                        selectedNeighborhood={selectedNeighborhood}
                        setSelectedNeighborhood={setSelectedNeighborhood}
                        selectedPackageQty={selectedPackageQty}
                        setSelectedPackageQty={setSelectedPackageQty}
                        startPoint={startPoint}
                        selectedWarehouse={selectedWarehouse}
                        neighborhoods={neighborhoods}
                    />
                </Tabs>
            </motion.div>
        </div>
    );
}
