export default function MapLegend() {
    return (
        <div className="p-3.5 rounded-lg text-sm leading-6">
            <div className="mb-1.5">
                <span className="inline-block w-3 h-3 bg-green-400 rounded-full mr-1.5 border border-green-600"></span>
                Punto de entrada disponible
            </div>
            <div className="mb-1.5">
                <span className="inline-block w-3 h-3 bg-red-400 rounded-full mr-1.5 border border-red-600"></span>
                Punto de entrada seleccionado
            </div>
            <div className="mb-1.5">
                <span className="inline-block w-3 h-3 bg-gray-400 rounded-full mr-1.5 border border-gray-700"></span>
                Almacén disponible
            </div>
            <div>
                <span className="inline-block w-3 h-3 bg-purple-300 rounded-full mr-1.5 border border-purple-700"></span>
                Almacén seleccionado
            </div>
        </div>
    );
}
