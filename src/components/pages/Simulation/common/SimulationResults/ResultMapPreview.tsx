interface ResultMapPreviewProps {
    className?: string;
    html: string;
}

export function ResultMapPreview({ html, className }: ResultMapPreviewProps) {
    return (
        <iframe
            className={className}
            srcDoc={html}
            sandbox="allow-scripts"
        />
    );
}
