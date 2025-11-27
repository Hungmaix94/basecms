'use client'

import Image from "next/image"
import Link from "next/link"
import { cva, type VariantProps } from "@/lib/cva"
import { motion } from "framer-motion" // Import motion

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const bannerVariants = cva(
    "w-full flex items-center justify-between p-4 rounded-lg",
    {
        variants: {
            default: "bg-gradient-to-r from-blue-500 to-purple-600 text-white",
            compact: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
            "full-width": "relative overflow-hidden",
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

interface BannerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof bannerVariants> {
    title: string;
    description?: string;
    imageUrl?: string;
    imageAlt?: string;
    cta?: {
        text: string;
        href: string;
    };
}

export default function Banner({
    title,
    description,
    imageUrl,
    imageAlt = "Banner image",
    cta,
    variant,
    className,
    ...props
}: BannerProps) {
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
            className={cn(bannerVariants({ variant }), className)}
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
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full">
                <motion.div className="flex flex-col gap-2 text-center md:text-left" variants={containerVariants}>
                    <motion.h2 className="text-2xl font-bold" variants={itemVariants}>{title}</motion.h2>
                    {description && <motion.p className="text-sm md:text-base max-w-prose"
                        variants={itemVariants}>{description}</motion.p>}
                </motion.div>
                {cta && (
                    <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link href={cta.href} className={cn(buttonVariants({ variant: "secondary" }))}>
                            {cta.text}
                        </Link>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
