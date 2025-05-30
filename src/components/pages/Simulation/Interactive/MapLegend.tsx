export default function MapLegend() {
    return (
        <>
            <div>
                <span className="inline-block w-3 h-3 bg-green-400 rounded-full mr-1.5 border border-green-600"></span>
                Available start point
            </div>
            <div>
                <span className="inline-block w-3 h-3 bg-red-400 rounded-full mr-1.5 border border-red-600"></span>
                Selected start point
            </div>
            <div>
                <span className="inline-block w-3 h-3 bg-gray-400 rounded-full mr-1.5 border border-gray-700"></span>
                Available warehouse
            </div>
            <div>
                <span className="inline-block w-3 h-3 bg-purple-300 rounded-full mr-1.5 border border-purple-700"></span>
                Selected warehouse
            </div>
        </>
    );
}
