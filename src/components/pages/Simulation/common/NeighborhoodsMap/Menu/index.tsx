import { Button } from "@/components/ui/button";
import NeighborhoodSelect, {
    NeighborhoodSelectProps,
} from "./NeighborhoodSelect";
import { RxReset } from "react-icons/rx";
import { cn } from "@/lib/utils";

type NeighborhoodsMapMenuProps = NeighborhoodSelectProps & {
    selectedSimulationType: string;
};

export default function NeighborhoodsMapMenu({
    neighborhoods,
    selectedNeighborhood,
    selectedSimulationType,
    setSelectedNeighborhood,
}: NeighborhoodsMapMenuProps) {
    return (
        <div className="absolute top-2 right-2 z-[1000] flex gap-2 h-15">
            {selectedNeighborhood && (
                <Button
                    variant="outline"
                    size="icon"
                    className={cn("h-15 aspect-square hover:bg-white hover:text-gray-800 hover:ring-2",
                        selectedSimulationType === "predefined" && "hover:ring-primary",
                        selectedSimulationType === "interactive" && "hover:ring-secondary",
                    )}
                    onClick={() => setSelectedNeighborhood(null)}
                >
                    <RxReset className="size-4" />
                </Button>
            )}
            <NeighborhoodSelect
                neighborhoods={neighborhoods}
                selectedNeighborhood={selectedNeighborhood}
                setSelectedNeighborhood={setSelectedNeighborhood}
                selectedSimulationType={selectedSimulationType}
                className={cn("w-min h-full hover:ring-2",
                    selectedSimulationType === "predefined" && "hover:ring-primary",
                        selectedSimulationType === "interactive" && "hover:ring-secondary",
                )}
            />
        </div>
    );
}
