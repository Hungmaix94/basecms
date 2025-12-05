import React from "react";
import { cn } from "@/lib/utils";

export type ContainerLayout = "stack" | "grid" | "flex";
export type ContainerAlign = "start" | "center" | "end" | "stretch";
export type ContainerJustify = "start" | "center" | "end" | "between" | "around" | "evenly";

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    layout?: ContainerLayout;
    columns?: number;
    gap?: string;
    align?: ContainerAlign;
    justify?: ContainerJustify;
    styles?: {
        backgroundColor?: string;
        padding?: string;
        margin?: string;
        maxWidth?: string;
        elementId?: string;
        className?: string;
    };
}

const Container = ({
    children,
    className,
    layout = "stack",
    columns = 2,
    gap = "1rem",
    align = "stretch",
    justify = "start",
    styles
}: ContainerProps) => {
    // Map align values to CSS
    const alignMap: Record<ContainerAlign, string> = {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch"
    };

    // Map justify values to CSS
    const justifyMap: Record<ContainerJustify, string> = {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
        around: "justify-around",
        evenly: "justify-evenly"
    };

    // Build layout classes
    const layoutClasses = {
        stack: "flex flex-col",
        grid: `grid grid-cols-1 md:grid-cols-${columns}`,
        flex: "flex flex-wrap"
    };

    return (
        <div
            id={styles?.elementId}
            className={cn(
                "w-full",
                layoutClasses[layout],
                alignMap[align],
                justifyMap[justify],
                className,
                styles?.className
            )}
            style={{
                backgroundColor: styles?.backgroundColor,
                padding: styles?.padding,
                margin: styles?.margin,
                maxWidth: styles?.maxWidth || "100%",
                marginLeft: styles?.maxWidth ? "auto" : undefined,
                marginRight: styles?.maxWidth ? "auto" : undefined,
                gap: gap,
            }}
        >
            {children}
        </div>
    );
};

export default Container;
