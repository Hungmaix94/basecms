'use client'

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  backgroundUrl?: string;
  ctaPrimary?: {
    text: string;
    href: string;
  };
  ctaSecondary?: {
    text: string;
    href: string;
  };
  variant?: "default" | "centered-image" | "hero-banner";
  imagePosition?: "left" | "right"; // For default variant
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function HeroSection({
  title,
  description,
  imageUrl,
  imageAlt = "Hero image",
  backgroundUrl,
  ctaPrimary,
  ctaSecondary,
  variant = "default",
  imagePosition = "right",
  className,
  ...props
}: HeroSectionProps) {
  const withBackground = (variant === 'default' || variant === 'centered-image') && backgroundUrl;
  return (
    // @ts-ignore
    <motion.section
      className={cn("relative w-full py-12 md:py-24 lg:py-32", withBackground && "isolate", className)}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      {...props}
    >
      {withBackground && (
        <Image
          alt={imageAlt || "Background"}
          src={backgroundUrl!}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
      )}
      <div className="container px-4 md:px-6">
        {variant === "default" && (
          <motion.div
            className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]"
            variants={containerVariants}
          >
            <motion.div className="flex flex-col justify-center space-y-4" variants={itemVariants}>
              <div className="space-y-2">
                <motion.h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  {title}
                </motion.h1>
                <motion.p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                  {description}
                </motion.p>
              </div>
              <motion.div className="flex flex-col gap-2 min-[400px]:flex-row" variants={containerVariants}>
                {ctaPrimary && (
                  <motion.div variants={itemVariants}>
                    <Link href={ctaPrimary.href} className={cn(buttonVariants({ size: "lg" }))}>
                      {ctaPrimary.text}
                    </Link>
                  </motion.div>
                )}
                {ctaSecondary && (
                  <motion.div variants={itemVariants}>
                    <Link href={ctaSecondary.href} className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                      {ctaSecondary.text}
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
            {imageUrl && (
              <motion.div variants={itemVariants}>
                <Image
                  alt={imageAlt}
                  className={cn("mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full", imagePosition === "left" ? "lg:order-first" : "lg:order-last")}
                  height="550"
                  src={imageUrl}
                  width="550"
                />
              </motion.div>
            )}
          </motion.div>
        )}

        {variant === "centered-image" && (
          <motion.div className="flex flex-col items-center text-center space-y-6" variants={containerVariants}>
            <motion.h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl" variants={itemVariants}>
              {title}
            </motion.h1>
            <motion.p className="max-w-2xl text-muted-foreground md:text-xl/relaxed lg:text-lg/relaxed xl:text-xl/relaxed" variants={itemVariants}>
              {description}
            </motion.p>
            <motion.div className="flex flex-col gap-2 min-[400px]:flex-row" variants={containerVariants}>
                {ctaPrimary && (
                    <motion.div variants={itemVariants}>
                        <Link href={ctaPrimary.href} className={cn(buttonVariants({ size: "lg" }))}>
                        {ctaPrimary.text}
                        </Link>
                    </motion.div>
                )}
                {ctaSecondary && (
                    <motion.div variants={itemVariants}>
                        <Link href={ctaSecondary.href} className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                        {ctaSecondary.text}
                        </Link>
                    </motion.div>
                )}
            </motion.div>
            {imageUrl && (
              <motion.div variants={itemVariants}>
                <Image
                  alt={imageAlt}
                  className="mx-auto overflow-hidden rounded-xl object-cover w-full max-w-4xl aspect-[2/1]"
                  height="400"
                  src={imageUrl}
                  width="800"
                />
              </motion.div>
            )}
          </motion.div>
        )}

        {variant === "hero-banner" && (
          <motion.div className="relative isolate overflow-hidden py-24 sm:py-32 lg:py-40" variants={containerVariants}>
            {imageUrl && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                    <Image
                        src={imageUrl}
                        alt={imageAlt}
                        layout="fill"
                        objectFit="cover"
                        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
                    />
                </motion.div>
            )}
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <motion.h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl" variants={itemVariants}>
                  {title}
                </motion.h2>
                <motion.p className="mt-6 text-lg leading-8 text-gray-300" variants={itemVariants}>
                  {description}
                </motion.p>
                <motion.div className="mt-10 flex items-center gap-x-6" variants={containerVariants}>
                  {ctaPrimary && (
                    <motion.div variants={itemVariants}>
                      <Link href={ctaPrimary.href} className={cn(buttonVariants({ size: "lg", variant: "default" }))}>
                        {ctaPrimary.text}
                      </Link>
                    </motion.div>
                  )}
                  {ctaSecondary && (
                    <motion.div variants={itemVariants}>
                      <Link href={ctaSecondary.href} className={cn(buttonVariants({ variant: "link", size: "lg" }))}>
                        {ctaSecondary.text} <span aria-hidden="true">→</span>
                      </Link>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}
