import React from "react";
import { cn } from "@/lib/utils";
import { getStyles, StyleConfig } from "@/lib/styles";

interface TextProps {
    text: string;
    variant?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
    align?: "left" | "center" | "right" | "justify";
    styles?: StyleConfig;
    className?: string;
}

const Text = ({
    text,
    variant = "p",
    align = "left",
    styles,
    className
}: TextProps) => {
    const { style: inlineStyle, className: computedClassName, id } = getStyles(styles, className);

    const Tag = variant;

    const alignClass = {
        left: "text-left",
        center: "text-center",
        right: "text-right",
        justify: "text-justify"
    }[align];

    const variantClass = {
        p: "text-base text-muted-foreground leading-relaxed",
        h1: "text-4xl font-extrabold tracking-tight lg:text-5xl mb-4",
        h2: "text-3xl font-semibold tracking-tight mb-3",
        h3: "text-2xl font-semibold tracking-tight mb-2",
        h4: "text-xl font-semibold tracking-tight mb-2",
        h5: "text-lg font-semibold tracking-tight mb-1",
        h6: "text-base font-semibold tracking-tight mb-1",
        blockquote: "mt-6 border-l-2 pl-6 italic"
    }[variant];

    return (
        <Tag
            id={id}
            className={cn(
                variantClass,
                alignClass,
                computedClassName
            )}
            style={inlineStyle}
            dangerouslySetInnerHTML={{ __html: text }}
        />
    );
};

export default Text;
