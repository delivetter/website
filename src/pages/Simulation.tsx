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
                <Tabs
                    value={selectedSimulationType}
                    onValueChange={(v) => setSelectedSimulationType(v)}
                >
                    <TabsList className="flex w-fit border-b-0 bg-gray-100 p-0 rounded-t-md rounded-b-none shadow-md">
                        <TabsTrigger
                            value="predefined"
                            className={cn(
                                "h-10 px-6 text-gray-600 hover:text-primary rounded-t-md rounded-b-none text-center font-medium",
                                selectedSimulationType == "predefined" &&
                                    "text-white bg-primary data-[state=active]:shadow-none border-l-4 border-primary",
                                selectedSimulationType == "interactive" &&
                                    "border-l-4 border-secondary"
                            )}
                        >
                            <FaRoute className="mr-2" />
                            Predefined Simulations
                        </TabsTrigger>
                        <TabsTrigger
                            value="interactive"
                            className={cn(
                                "h-10 px-6 text-gray-600 hover:text-secondary rounded-t-md rounded-b-none text-center font-medium",
                                selectedSimulationType == "interactive" &&
                                    "text-white bg-secondary data-[state=active]:shadow-none"
                            )}
                        >
                            <FaPlayCircle className="mr-2" />
                            Interactive Simulation
                        </TabsTrigger>
                    </TabsList>
                    

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
                        neighborhoods={neighborhoods}
                    />
                </Tabs>
            </motion.div>
        </div>
    );
}
