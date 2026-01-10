"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface MediaRendererProps {
    src?: string;
    alt: string;
    className?: string;
    style?: React.CSSProperties;
    width?: number;
    height?: number;
    fill?: boolean;
    objectFit?: "cover" | "contain" | "fill";
    priority?: boolean;
}

export default function MediaRenderer({
    src,
    alt,
    className,
    style,
    width,
    height,
    fill = false,
    objectFit = "cover",
    priority = false
}: MediaRendererProps) {
    const [error, setError] = useState(false);
    const [videoError, setVideoError] = useState(false);

    // Reset error state if src changes
    useEffect(() => {
        setError(false);
        setVideoError(false);
    }, [src]);

    if (!src || error) {
        // Fallback placeholder
        return (
            <div
                className={className}
                style={{
                    ...style,
                    width: width || "100%",
                    height: height || "100%",
                    background: "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ccc",
                    fontSize: 12
                }}
            >
                {alt || "Media not found"}
            </div>
        );
    }

    const isVideo = src.match(/\.(mp4|webm|ogg)$/i) || src.includes("youtube.com") || src.includes("youtu.be");

    // Handle YouTube Links (Basic Embed)
    if (src.includes("youtube.com") || src.includes("youtu.be")) {
        const videoId = src.split("v=")[1]?.split("&")[0] || src.split("/").pop();
        return (
            <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&rel=0`}
                className={className}
                style={{ ...style, width: "100%", height: "100%", border: "none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        );
    }

    // Handle Native Video
    if (isVideo) {
        if (videoError) return null; // Or fallback
        return (
            <video
                src={src}
                controls
                playsInline
                className={className}
                style={{ ...style, width: "100%", height: "100%", objectFit }}
                onError={() => setVideoError(true)}
            />
        );
    }

    // Handle Next/Image
    // Note: 'fill' prop in Next.js Image requires parent to be relative/absolute and no width/height on Image itself
    const imageProps = fill
        ? { fill: true, style: { objectFit, ...style } }
        : { width: width || 800, height: height || 600, style: { objectFit, ...style } };

    return (
        <Image
            src={src}
            alt={alt}
            className={className}
            onError={() => setError(true)}
            priority={priority}
            {...imageProps}
        // Allow unoptimized if the domain isn't allowed yet (safety net)
        // unoptimized={src.startsWith("http")} 
        />
    );
}
