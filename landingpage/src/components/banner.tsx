'use client'

import Image from "next/image"
import Link from "next/link"
import { cva, type VariantProps } from "@/lib/cva"
import { motion } from "framer-motion" // Import motion

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const bannerVariants = cva(
    "w-full flex items-center justify-between rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl",
    {
        variants: {
            default: "bg-gradient-to-r from-vibrant-blue via-vibrant-purple to-vibrant-blue bg-[length:200%_100%] hover:bg-right-bottom text-white p-6 md:p-8",
            compact: "bg-gradient-to-br from-secondary/80 to-secondary text-secondary-foreground dark:from-secondary/60 dark:to-secondary/80 p-4 md:p-6 backdrop-blur-sm",
            "full-width": "relative overflow-hidden min-h-[200px] md:min-h-[300px] p-8 md:p-12 bg-gradient-to-br from-primary/10 to-accent/10",
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

import { getStyles, StyleConfig } from "@/lib/styles";

// ... imports

// ... variants

interface BannerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof bannerVariants> {
    title: string;
    description?: string;
    imageUrl?: string;
    imageAlt?: string;
    cta?: {
        text: string;
        href: string;
    };
    styles?: StyleConfig;
}

export default function Banner({
    title,
    description,
    imageUrl,
    imageAlt = "Banner image",
    cta,
    variant,
    className,
    styles,
    ...props
}: BannerProps) {
    const { style: inlineStyle, className: computedClassName, id } = getStyles(styles, className);

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        // @ts-ignore
        <motion.div
            className={cn(bannerVariants({ variant }), computedClassName)}
            style={inlineStyle}
            id={id}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            {...props}
        >
            {variant === "full-width" && imageUrl && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className={'relative'}>
                    <Image
                        src={imageUrl}
                        alt={imageAlt}
                        layout="fill"
                        objectFit="cover"
                        className="absolute inset-0 z-0 opacity-30"
                    />
                </motion.div>
            )}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full gap-6">
                <motion.div className="flex flex-col gap-3 text-center md:text-left flex-1" variants={containerVariants}>
                    <motion.h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight" variants={itemVariants}>{title}</motion.h2>
                    {description && <motion.p className="text-sm md:text-base lg:text-lg max-w-2xl opacity-90 leading-relaxed"
                        variants={itemVariants}>{description}</motion.p>}
                </motion.div>
                {cta && (
                    <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-shrink-0">
                        <Link href={cta.href} className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "shadow-lg hover:shadow-xl transition-shadow font-semibold")}>
                            {cta.text}
                        </Link>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
