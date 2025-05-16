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
import { BarrioMap } from "@/components/pages/Simulation/common/BarrioMap";
import { cn } from "@/lib/utils";
import MiniBarrioMap from "@/components/pages/Simulation/Interactive/MiniBarrioMap";

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
            <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={{ duration: 0.6 }}
            >
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-row items-center justify-between bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg mb-8">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">
                                Delivery Simulation
                            </h1>
                            <p className="text-gray-600">
                                Explore different delivery scenarios using our
                                simulation tools.
                            </p>
                        </div>
                        <Link
                            to="/comparison"
                            className="flex items-center bg-white px-4 py-2  h-fit rounded-full text-primary hover:text-white hover:bg-primary transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            <FaChartLine className="mr-2" />
                            <span>View detailed comparison</span>
                        </Link>
                    </div>

                    <div
                        className={`flex flex-row gap-6 bg-white rounded-lg shadow-md transition-all duration-300 overflow-hidden hover:shadow-lg hover:transform hover:-translate-y-1 p-6 mb-8 pb-10`}
                    >
                        <div className="flex flex-col w-3/5">
                            <h2 className="text-xl font-medium mb-4">
                                First, select a neighborhood:
                            </h2>

                            <BarrioMap
                                className="min-h-full"
                                onSelectBarrio={(name) =>
                                    setSelectedNeighborhood(neighborhoods[name])
                                }
                                selectedBarrio={selectedNeighborhood?.barrio}
                                colorScheme={
                                    selectedSimulationType === "predefined"
                                        ? "primary"
                                        : "secondary"
                                }
                            />
                        </div>
                        <div className="flex flex-col gap-y-4 w-2/5 min-h-full pb-10">
                            <h2 className="text-l font-medium">
                                {selectedSimulationType === "predefined"
                                    ? "Selected neighborhood:"
                                    : "Choose a starting point and a warehouse:"}
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
                                        <FaExclamationTriangle className="text-lg"/>
                                        <div>No neighborhood selected yet!</div>
                                    </div>
                                )}
                            </div>
                        </div>
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
                </div>
            </motion.div>
        </div>
    );
}
