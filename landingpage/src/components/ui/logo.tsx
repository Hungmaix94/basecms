import { StrapiImage } from "./strapi-image"
import type { StrapiMedia } from "./strapi-image"
import React from "react"

/**
 * Props for the reusable Logo component.
 * It forwards all HTML attributes to the underlying image container.
 */
export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Media object coming from Strapi */
    media: StrapiMedia
    /** Shape variant – defaults to "square" */
    variant?: "square" | "circle"
    /** Explicit width (px). If omitted, the component uses fill mode. */
    width?: number
    /** Explicit height (px). If omitted, the component uses fill mode. */
    height?: number
}

/**
 * Logo component that wraps `StrapiImage`.
 * It supports square / circle shapes, optional width & height, and any HTML
 * attributes (className, style, id, etc.) that you might want to apply to the
 * container.
 */
export const Logo: React.FC<LogoProps> = ({
    media,
    variant = "square",
    width,
    height,
    className,
    style,
    ...rest
}) => {
    // Don't render anything if there's no media URL
    if (!media?.url) {
        return null;
    }

    const containerClasses = `relative ${className ?? ""}`.trim()

    // If width/height are provided we render the image with those dimensions.
    // Otherwise we fall back to `fill` mode and rely on the container size.
    if (typeof width === "number" && typeof height === "number") {
        return (
            <div className={containerClasses} style={style} {...rest}>
                <StrapiImage
                    media={media}
                    variant={variant}
                    width={width}
                    height={height}
                    className="object-contain"
                />
            </div>
        )
    }

    // Fill mode – container must be relative for the image to stretch.
    return (
        <div
            className={`relative overflow-hidden ${containerClasses}`.trim()}
            style={style}
            {...rest}
        >
            <StrapiImage media={media} variant={variant} fill className="object-contain" />
        </div>
    )
}
