export const getGeoJSONStyle = (colorScheme: "primary" | "secondary") => {
    const colors: Record<string, Record<string, [string, string, number]>> = {
        primary: {
            default: ["#666", "#3B82F6", 0.1],
            hover: ["#3B82F6", "#BFDBFE", 0.6],
            selected: ["#1D4ED8", "#93C5FD", 0.7],
        },
        secondary: {
            default: ["#666", "#15803D", 0.1],
            hover: ["#15803D", "#BBF7D0", 0.6],
            selected: ["#166534", "#86EFAC", 0.7],
        },
    };

    const scheme = colors[colorScheme];

    return {
        default: {
            weight: 1,
            color: scheme.default[0],
            fillColor: scheme.default[1],
            fillOpacity: scheme.default[2],
        },
        hover: {
            weight: 2,
            color: scheme.hover[0],
            fillColor: scheme.hover[1],
            fillOpacity: scheme.hover[2],
        },
        selected: {
            weight: 2,
            color: scheme.selected[0],
            fillColor: scheme.selected[1],
            fillOpacity: scheme.selected[2],
        },
    };
};
