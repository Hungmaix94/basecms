import { UIImage } from "./image";
import { cn } from "@/lib/utils";

/**
 * Strapi media object shape (simplified). Adjust fields as needed to match your Strapi schema.
 */
export interface StrapiMedia {
    /** Full URL or relative path to the image */
    url: string;
    /** Alt text – Strapi calls this `alternativeText` */
    alternativeText?: string;
    /** Width in pixels (optional) */
    width?: number;
    /** Height in pixels (optional) */
    height?: number;
    /** Optional formats object from Strapi (thumb, small, medium, large) */
    formats?: Record<string, { url: string; width: number; height: number }>;
}

/**
 * Component that renders a Strapi image using the reusable `UIImage` component.
 *
 * It automatically prefixes the image URL with the Strapi host when the URL is
 * relative (starts with `/`). The host is taken from the environment variable
 * `NEXT_PUBLIC_STRAPI_URL`.
 */
export const StrapiImage = ({
    media,
    variant = "square",
    className,
    ...rest
}: {
    media: StrapiMedia;
    /** Shape variant – defaults to square */
    variant?: "square" | "circle";
    /** Additional Tailwind / CSS classes */
    className?: string;
} & Omit<React.ComponentPropsWithoutRef<typeof UIImage>, "src" | "alt" | "variant" | "className">) => {
    // Handle missing or invalid media gracefully
    if (!media?.url) {
        return null;
    }

    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/+$/, "");
    const src = media.url.startsWith("http") ? media.url : `${baseUrl}${media.url}`;
    const alt = media.alternativeText ?? "";

    const sizeProps = {
        ...(media.width && { width: media.width }),
        ...(media.height && { height: media.height }),
    };

    return (
        <UIImage
            src={src}
            alt={alt}
            variant={variant}
            className={cn(className)}
            {...sizeProps}
            {...rest}
        />
    );
};
