import { FaPlayCircle } from "react-icons/fa";

export default function InteractiveTitle() {
    return (
        <>
            <div className="flex items-center mb-4">
                <FaPlayCircle className="text-2xl text-secondary mr-3" />
                <h2 className="text-xl font-semibold">
                    Interactive Simulation
                </h2>
            </div>
            <p className="text-gray-600 mb-6">
                Select a neighborhood and explore different delivery scenarios
                with custom package volumes.
            </p>
        </>
    );
}
