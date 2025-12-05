import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

export interface StyleConfig {
    className?: string;
    inlineStyles?: any; // JSON from Strapi
    elementId?: string;
}

export function getStyles(styleConfig?: StyleConfig, defaultClassName?: string) {
    const styles: CSSProperties = styleConfig?.inlineStyles || {};
    const className = cn(defaultClassName, styleConfig?.className);
    const id = styleConfig?.elementId;

    return { style: styles, className, id };
}
