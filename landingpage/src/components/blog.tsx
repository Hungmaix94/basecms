'use client'

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card" // Assuming card component is available

interface BlogPost {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  date: string;
  author: string;
  href: string;
}

interface BlogProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionTitle: string;
  posts: BlogPost[];
  variant?: "grid" | "list" | "carousel"; // Define 3 variations
  styles?: any;
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

export default function Blog({ sectionTitle, posts, variant = "grid", className, styles, ...props }: BlogProps) {
  return (
    // @ts-ignore
    <motion.section
      className={cn("w-full py-12 md:py-24 lg:py-32", className, styles?.className)}
      id={styles?.elementId}
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
              Stay up-to-date with our latest news and insights.
            </p>
          </div>
        </motion.div>

        {variant === "grid" && (
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
          >
            {posts.map((post, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="flex flex-col h-full">
                  {post.imageUrl && (
                    <Link href={post.href}>
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="rounded-t-lg object-cover w-full aspect-[3/2]"
                      />
                    </Link>
                  )}
                  <CardHeader className="flex-grow">
                    <CardTitle>
                      <Link href={post.href}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription>
                      <p className="text-sm text-muted-foreground">{post.description}</p>
                      <div className="flex items-center gap-2 text-xs mt-2">
                        <span>{post.category}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.author}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {variant === "list" && (
          <motion.div className="flex flex-col gap-8" variants={containerVariants}>
            {posts.map((post, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4">
                  {post.imageUrl && (
                    <Link href={post.href} className="flex-shrink-0">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        width={200}
                        height={130}
                        className="rounded-lg object-cover aspect-[3/2] md:w-[200px]"
                      />
                    </Link>
                  )}
                  <div className="flex flex-col gap-2">
                    <CardTitle>
                      <Link href={post.href}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription>
                      <p className="text-sm text-muted-foreground">{post.description}</p>
                      <div className="flex items-center gap-2 text-xs mt-2">
                        <span>{post.category}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.author}</span>
                      </div>
                    </CardDescription>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {variant === "carousel" && (
          <motion.div className="flex overflow-x-auto gap-4 py-2" variants={containerVariants}>
            {posts.map((post, index) => (
              <motion.div key={index} variants={itemVariants} className="flex-shrink-0 w-80">
                <Card>
                  {post.imageUrl && (
                    <Link href={post.href}>
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        width={320}
                        height={200}
                        className="rounded-t-lg object-cover w-full aspect-[3/2]"
                      />
                    </Link>
                  )}
                  <CardHeader className="flex-grow">
                    <CardTitle>
                      <Link href={post.href}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription>
                      <p className="text-sm text-muted-foreground">{post.description}</p>
                      <div className="flex items-center gap-2 text-xs mt-2">
                        <span>{post.category}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.author}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}
