import { Neighborhood } from "@/lib/neighborhoods";
import { cn } from "@/lib/utils";
import { FaInfo, FaShoppingCart, FaTruck, FaWarehouse } from "react-icons/fa";

interface NeighborhoodInfoProps {
    neighborhood: Neighborhood | null;
    className?: string;
}

export default function NeighborhoodInfo({
    neighborhood,
    className,
}: NeighborhoodInfoProps) {
    return (
        <div
            className={cn(
                "flex flex-col gap-2 bg-white rounded-lg shadow-sm border border-gray-100 p-4 min-w-min",
                className
            )}
        >
            <h4 className="font-medium text-gray-800 mb-3 flex items-center break-words leading-tight">
                <FaInfo className="mr-4 text-blue-500" /> Neighborhood
                Information
            </h4>
            <div className="flex flex-col justify-between items-center gap-4 h-full">
                <div className="text-center">
                    <FaShoppingCart className="text-primary text-3xl mx-auto" />
                    <p className="text-sm text-gray-500">Stores</p>
                    <p className="text-lg font-semibold text-gray-800">
                        {neighborhood?.comercios_barrio || "-"}
                    </p>
                </div>
                <div className="text-center">
                    <FaTruck className="text-secondary text-3xl mx-auto" />
                    <p className="text-sm text-gray-500">Distribution Points</p>
                    <p className="text-lg font-semibold text-gray-800">
                        {neighborhood?.cids_barrio || "-"}
                    </p>
                </div>
                <div className="text-center">
                    <FaWarehouse className="text-yellow-500 text-3xl mx-auto" />
                    <p className="text-sm text-gray-500">Warehouses</p>
                    <p className="text-lg font-semibold text-gray-800">
                        {neighborhood?.almacenes_barrio || "-"}
                    </p>
                </div>
            </div>
        </div>
    );
}
