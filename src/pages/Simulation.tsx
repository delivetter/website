import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { FaInfo, FaRoute, FaPlayCircle, FaChartLine } from "react-icons/fa";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import "leaflet/dist/leaflet.css";
import { PredefinedSimulationsTabContent } from "@/components/pages/Simulation/Predefined";
import { getNeighborhoods, Neighborhood } from "@/lib/neighborhoods";
import { InteractiveSimulationsTabContent } from "@/components/pages/Simulation/Interactive";

// TypeScript interface for CSV rows

export default function Simulation() {
    const [neighborhoods, setNeighborhoods] = useState<
        Record<string, Neighborhood>
    >({});
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
            <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={{ duration: 0.6 }}
            >
                <div className="max-w-5xl mx-auto">
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">
                            Delivery Simulation
                        </h1>
                        <p className="text-gray-600 mb-6">
                            Explore different delivery scenarios using our
                            simulation tools.
                        </p>

                        <div className="flex justify-between items-center">
                            <div className="flex items-center bg-white/80 px-3 py-2 rounded-full text-sm text-gray-600">
                                <FaInfo className="text-primary mr-2" />
                                <span>
                                    Comparing delivery methods for urban
                                    environments
                                </span>
                            </div>
                            <Link
                                to="/comparison"
                                className="flex items-center bg-white px-4 py-2 rounded-full text-primary hover:text-white hover:bg-primary transition-all duration-300 shadow-sm hover:shadow-md"
                            >
                                <FaChartLine className="mr-2" />
                                <span>View detailed comparison</span>
                            </Link>
                        </div>
                    </div>

                    <Tabs defaultValue="predefined" className="mb-10">
                        <TabsList className="tabs-list">
                            <TabsTrigger
                                value="predefined"
                                className="tab-trigger"
                            >
                                <FaRoute className="mr-2" />
                                Predefined Simulations
                            </TabsTrigger>
                            <TabsTrigger
                                value="interactive"
                                className="tab-trigger"
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
                </div>
            </motion.div>
        </div>
    );
}
