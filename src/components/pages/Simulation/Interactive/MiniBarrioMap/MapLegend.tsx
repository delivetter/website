export default function MapLegend() {
    return (
        <div
            style={{
                height: "auto",
                padding: "10px 14px",
                borderRadius: "8px",
                fontSize: "0.8rem",
                lineHeight: "1.5",
            }}
        >
            <div style={{ marginBottom: 6 }}>
                <span
                    style={{
                        display: "inline-block",
                        width: 12,
                        height: 12,
                        backgroundColor: "#4ADE80", // verde
                        borderRadius: "50%",
                        marginRight: 6,
                        border: "1px solid #16A34A",
                    }}
                ></span>
                Punto de entrada disponible
            </div>
            <div style={{ marginBottom: 6 }}>
                <span
                    style={{
                        display: "inline-block",
                        width: 12,
                        height: 12,
                        backgroundColor: "#F87171", // rojo
                        borderRadius: "50%",
                        marginRight: 6,
                        border: "1px solid #DC2626",
                    }}
                ></span>
                Punto de entrada seleccionado
            </div>
            <div style={{ marginBottom: 6 }}>
                <span
                    style={{
                        display: "inline-block",
                        width: 12,
                        height: 12,
                        backgroundColor: "#9CA3AF", // gris
                        borderRadius: "50%",
                        marginRight: 6,
                        border: "1px solid #4B5563",
                    }}
                ></span>
                Almacén disponible
            </div>
            <div>
                <span
                    style={{
                        display: "inline-block",
                        width: 12,
                        height: 12,
                        backgroundColor: "#C4B5FD", // violeta
                        borderRadius: "50%",
                        marginRight: 6,
                        border: "1px solid #7C3AED",
                    }}
                ></span>
                Almacén seleccionado
            </div>
        </div>
    );
}
