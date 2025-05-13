export function LoadingData() {
    return (
        <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <span className="ml-3 text-gray-600">Loading data...</span>
        </div>
    );
}
