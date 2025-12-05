'use client'

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { getStyles, StyleConfig } from "@/lib/styles";

// ... imports

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  body: string | string[]; // Can be a single string or an array of paragraphs
  imageUrl?: string;
  imageAlt?: string;
  cta?: {
    text: string;
    href: string;
  };
  variant?: "text-only" | "text-with-image" | "multi-column";
  imagePosition?: "left" | "right"; // For text-with-image variant
  columns?: 2 | 3; // For multi-column variant
  styles?: StyleConfig;
}

// ... variants

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

export default function Content({
  title,
  body,
  imageUrl,
  imageAlt = "Content image",
  cta,
  variant = "text-only",
  imagePosition = "right",
  columns = 2,
  className,
  styles,
  ...props
}: ContentProps) {
  const { style: inlineStyle, className: computedClassName, id } = getStyles(styles, className);

  const renderBody = () => {
    if (Array.isArray(body)) {
      return body.map((paragraph, index) => (
        <p key={index} className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
          {paragraph}
        </p>
      ));
    }
    return <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{body}</p>;
  };

  return (
    // @ts-ignore
    <motion.section
      className={cn("w-full py-16 md:py-24 lg:py-32 relative overflow-hidden", computedClassName)}
      style={inlineStyle}
      id={id}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      {...props}
    >
      {/* Decorative gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          variants={itemVariants}
        >
          <div className="space-y-3">
            {title && (
              <>
                <div className="inline-block mb-2">
                  <div className="h-1 w-16 bg-gradient-to-r from-vibrant-blue to-vibrant-purple rounded-full" />
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                  {title}
                </h2>
              </>
            )}
          </div>
        </motion.div>

        {variant === "text-only" && (
          <motion.div
            className="max-w-4xl mx-auto space-y-6 bg-card/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-border/50"
            variants={itemVariants}
          >
            <div className="prose prose-lg max-w-none">
              {renderBody()}
            </div>
            {cta && (
              <div className="mt-8 text-center">
                <Link href={cta.href}>
                  <Button size="lg" className="shadow-lg hover:shadow-xl transition-shadow font-semibold">
                    {cta.text}
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        )}

        {variant === "text-with-image" && (
          <motion.div
            className={cn(
              "grid gap-8 md:gap-12 items-center",
              imagePosition === "left" ? "md:grid-cols-[1fr_2fr]" : "md:grid-cols-[2fr_1fr]"
            )}
            variants={containerVariants}
          >
            {imageUrl && imagePosition === "left" && (
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ duration: 0.3 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-vibrant-blue to-vibrant-purple rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  width={500}
                  height={350}
                  className="relative rounded-xl object-cover w-full aspect-video shadow-xl"
                />
              </motion.div>
            )}
            <motion.div className="space-y-6 bg-card/30 backdrop-blur-sm rounded-2xl p-6 md:p-8" variants={itemVariants}>
              <div className="prose prose-lg max-w-none">
                {renderBody()}
              </div>
              {cta && (
                <Link href={cta.href}>
                  <Button size="lg" className="shadow-lg hover:shadow-xl transition-shadow font-semibold">
                    {cta.text}
                  </Button>
                </Link>
              )}
            </motion.div>
            {imageUrl && imagePosition === "right" && (
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02, rotate: -1 }}
                transition={{ duration: 0.3 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-vibrant-purple to-vibrant-blue rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  width={500}
                  height={350}
                  className="relative rounded-xl object-cover w-full aspect-video shadow-xl"
                />
              </motion.div>
            )}
          </motion.div>
        )}

        {variant === "multi-column" && (
          <motion.div
            className={cn(
              "grid gap-6 md:gap-8",
              columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
            )}
            variants={containerVariants}
          >
            {Array.isArray(body) && body.map((colText, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="space-y-4 bg-card/40 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-border/50 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="h-1 w-12 bg-gradient-to-r from-vibrant-blue to-vibrant-purple rounded-full mb-4" />
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{colText}</p>
                {index === body.length - 1 && cta && ( // CTA only on the last column for simplicity
                  <Link href={cta.href}>
                    <Button size="lg" className="shadow-lg hover:shadow-xl transition-shadow font-semibold mt-6">
                      {cta.text}
                    </Button>
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
