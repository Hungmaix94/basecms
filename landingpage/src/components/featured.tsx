'use client'

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface FeaturedItem {
  title: string;
  description: string;
  imageUrl: string;
  cta: {
    text: string;
    href: string;
  };
}

interface FeaturedProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionTitle?: string;
  sectionDescription?: string;
  items: FeaturedItem[];
  variant?: "single" | "grid" | "carousel"; // Define 3 variations
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

export default function Featured({ sectionTitle, sectionDescription, items, variant = "grid", className, ...props }: FeaturedProps) {
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
            {sectionTitle && <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{sectionTitle}</h2>}
            {sectionDescription && <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">{sectionDescription}</p>}
          </div>
        </motion.div>

        {variant === "single" && items.length > 0 && (
          <motion.div variants={itemVariants}>
            <Card className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6 p-6">
              <Image
                src={items[0].imageUrl}
                alt={items[0].title}
                width={600}
                height={400}
                className="rounded-lg object-cover w-full md:w-1/2 aspect-[3/2]"
              />
              <div className="flex flex-col gap-4 justify-center md:w-1/2">
                <CardTitle className="text-3xl font-bold">{items[0].title}</CardTitle>
                <CardDescription className="text-lg">{items[0].description}</CardDescription>
                <Link href={items[0].cta.href}>
                  <Button size="lg">{items[0].cta.text}</Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        )}

        {variant === "grid" && (
          <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" variants={containerVariants}>
            {items.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="flex flex-col h-full">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={400}
                    height={250}
                    className="rounded-t-lg object-cover w-full aspect-[3/2]"
                  />
                  <CardHeader className="flex-grow">
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription className="mt-1">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={item.cta.href}>
                      <Button className="w-full">{item.cta.text}</Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {variant === "carousel" && (
          <motion.div className="flex overflow-x-auto gap-4 py-2" variants={containerVariants}>
            {items.map((item, index) => (
              <motion.div key={index} variants={itemVariants} className="flex-shrink-0 w-80">
                <Card className="h-full">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={320}
                    height={200}
                    className="rounded-t-lg object-cover w-full aspect-[3/2]"
                  />
                  <CardHeader className="flex-grow">
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription className="mt-1">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={item.cta.href}>
                      <Button className="w-full">{item.cta.text}</Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}
