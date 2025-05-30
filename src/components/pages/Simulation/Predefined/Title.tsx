import { Info } from "lucide-react";
import { FaTruck } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";

export default function PredefinedTitle() {
    return (
        <>
            <div className="flex items-center mb-4">
                <FaTruck className="text-2xl text-primary mr-3" />
                <h2 className="text-xl font-semibold">
                    Predefined Route Simulations
                </h2>
            </div>
            <p className="text-gray-600 mb-4">
                Compare traditional delivery vans (M1) with autonomous robots
                (M2) across different neighborhoods and numbers of packages.
            </p>
            <Badge
                variant="outline"
                className="bg-blue-100 text-sm gap-2 px-3 py-1 flex items-center w-fit mb-6"
            >
                <Info className="w-4 h-4" />
                In these simulations, the van's starting point and warehouse are
                averaged across many combinations, unlike in interactive
                simulations where you manually choose them.
            </Badge>
        </>
    );
}
