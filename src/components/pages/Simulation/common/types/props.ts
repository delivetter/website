import { Neighborhood } from "@/lib/neighborhoods";

export interface SimulationsTabContentProps {
    selectedNeighborhood: Neighborhood | null;
    setSelectedNeighborhood: React.Dispatch<React.SetStateAction<Neighborhood | null>>;
    selectedPackageQty: number | null;
    setSelectedPackageQty: React.Dispatch<React.SetStateAction<number | null>>;
    neighborhoods: Record<string, Neighborhood>;
}