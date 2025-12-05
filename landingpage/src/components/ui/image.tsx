import Image from "next/image";
import { cn } from "@/lib/utils";
import * as React from "react";

type Variant = "square" | "circle";

export interface UIImageProps extends React.ComponentPropsWithoutRef<typeof Image> {
    /** Image source, can be a URL string or StaticImageData */
    src: string | React.ComponentPropsWithoutRef<typeof Image>['src'];
    /** Alt text for accessibility */
    alt: string;
    /** Shape variant – defaults to "square" */
    variant?: Variant;
    /** Optional explicit width (px). If omitted, component uses fill mode */
    width?: number;
    /** Optional explicit height (px). If omitted, component uses fill mode */
    height?: number;
    /** Additional Tailwind / CSS classes */
    className?: string;
}

/**
 * Reusable Image component that supports square or circular shapes and optional
 * width/height. When width & height are omitted it falls back to `fill` mode
 * (positioned absolute inside a relative container).
 */
export const UIImage: React.FC<UIImageProps> = ({
    src,
    alt,
    variant = "square",
    width,
    height,
    className,
    ...rest
}) => {
    const shapeClass = variant === "circle" ? "rounded-full" : "rounded";
    const baseClass = cn("object-contain", shapeClass, className);

    // If explicit dimensions are provided, use normal Image props
    if (typeof width === "number" && typeof height === "number") {
        return (
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={baseClass}
                {...rest}
            />
        );
    }

    // Otherwise use fill mode – container must be relative
    return (
        <div className="relative overflow-hidden">
            <Image src={src} alt={alt} fill className={baseClass} {...rest} />
        </div>
    );
};
