'use client'

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

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
  ...props
}: ContentProps) {
  const renderBody = () => {
    if (Array.isArray(body)) {
      return body.map((paragraph, index) => (
        <p key={index} className="text-muted-foreground leading-relaxed">
          {paragraph}
        </p>
      ));
    }
    return <p className="text-muted-foreground leading-relaxed">{body}</p>;
  };

  return (
    // @ts-ignore
    <motion.section
      className={cn("w-full py-12 md:py-24 lg:py-32", className)}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      {...props}
    >
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-8"
          variants={itemVariants}
        >
          <div className="space-y-2">
            {title && <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{title}</h2>}
          </div>
        </motion.div>

        {variant === "text-only" && (
          <motion.div className="max-w-3xl mx-auto space-y-4 text-lg" variants={itemVariants}>
            {renderBody()}
            {cta && (
              <div className="mt-6 text-center">
                <Link href={cta.href}>
                  <Button>{cta.text}</Button>
                </Link>
              </div>
            )}
          </motion.div>
        )}

        {variant === "text-with-image" && (
          <motion.div
            className={cn("grid gap-8 items-center", imagePosition === "left" ? "md:grid-cols-[1fr_2fr]" : "md:grid-cols-[2fr_1fr]")}
            variants={containerVariants}
          >
            {imageUrl && imagePosition === "left" && (
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  width={500}
                  height={350}
                  className="rounded-lg object-cover w-full aspect-video"
                />
              </motion.div>
            )}
            <motion.div className="space-y-4" variants={itemVariants}>
              {renderBody()}
              {cta && (
                <Link href={cta.href}>
                  <Button>{cta.text}</Button>
                </Link>
              )}
            </motion.div>
            {imageUrl && imagePosition === "right" && (
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  width={500}
                  height={350}
                  className="rounded-lg object-cover w-full aspect-video"
                />
              </motion.div>
            )}
          </motion.div>
        )}

        {variant === "multi-column" && (
          <motion.div className={cn("grid gap-8", columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3")} variants={containerVariants}>
            {Array.isArray(body) && body.map((colText, index) => (
              <motion.div key={index} variants={itemVariants} className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">{colText}</p>
                {index === body.length - 1 && cta && ( // CTA only on the last column for simplicity
                  <Link href={cta.href}>
                    <Button>{cta.text}</Button>
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
