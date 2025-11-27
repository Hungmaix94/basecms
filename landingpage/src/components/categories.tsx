'use client'

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface CategoryItem {
  name: string;
  description?: string;
  iconUrl?: string; // For simple list
  imageUrl?: string; // For grid and featured
  href: string;
}

interface CategoriesProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionTitle: string;
  categories: CategoryItem[];
  variant?: "list" | "grid" | "featured"; // Define 3 variations
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

export default function Categories({ sectionTitle, categories, variant = "grid", className, ...props }: CategoriesProps) {
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
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{sectionTitle}</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Browse our wide range of categories.
            </p>
          </div>
        </motion.div>

        {variant === "list" && (
          <motion.div className="flex flex-col gap-4 max-w-xl mx-auto" variants={containerVariants}>
            {categories.map((category, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link href={category.href} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  {category.iconUrl && (
                    <Image
                      src={category.iconUrl}
                      alt={category.name}
                      width={32}
                      height={32}
                      className="flex-shrink-0"
                    />
                  )}
                  <div className="flex flex-col text-left">
                    <span className="text-lg font-semibold">{category.name}</span>
                    {category.description && <span className="text-sm text-muted-foreground">{category.description}</span>}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {variant === "grid" && (
          <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" variants={containerVariants}>
            {categories.map((category, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="flex flex-col items-center text-center p-6 h-full">
                  <Link href={category.href} className="flex flex-col items-center gap-4">
                    {category.imageUrl && (
                      <Image
                        src={category.imageUrl}
                        alt={category.name}
                        width={120}
                        height={120}
                        className="rounded-full object-cover aspect-square"
                      />
                    )}
                    <CardHeader>
                      <CardTitle className="text-xl">{category.name}</CardTitle>
                      {category.description && <CardDescription>{category.description}</CardDescription>}
                    </CardHeader>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {variant === "featured" && categories.length > 0 && (
          <motion.div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8" variants={containerVariants}>
            {categories.slice(0, 2).map((category, index) => ( // Displaying 2 featured categories
              <motion.div key={index} variants={itemVariants}>
                <Card className="flex flex-col items-center text-center p-8 h-full">
                  <Link href={category.href} className="flex flex-col items-center gap-4">
                    {category.imageUrl && (
                      <Image
                        src={category.imageUrl}
                        alt={category.name}
                        width={200}
                        height={200}
                        className="rounded-full object-cover aspect-square"
                      />
                    )}
                    <CardHeader>
                      <CardTitle className="text-3xl font-bold">{category.name}</CardTitle>
                      {category.description && <CardDescription className="text-lg">{category.description}</CardDescription>}
                    </CardHeader>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}
