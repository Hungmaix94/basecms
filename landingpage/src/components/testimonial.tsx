'use client'

import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface TestimonialItem {
  quote: string;
  author: string;
  role?: string;
  avatarUrl?: string;
  rating?: number; // 1-5
}

interface TestimonialProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionTitle?: string;
  sectionDescription?: string;
  testimonials: TestimonialItem[];
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

export default function Testimonial({ sectionTitle, sectionDescription, testimonials, variant = "grid", className, ...props }: TestimonialProps) {
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

        {variant === "single" && testimonials.length > 0 && (
          <motion.div variants={itemVariants}>
            <Card className="max-w-2xl mx-auto p-8 text-center">
              <CardContent className="flex flex-col items-center gap-4">
                {testimonials[0].avatarUrl && (
                  <Image
                    src={testimonials[0].avatarUrl}
                    alt={testimonials[0].author}
                    width={80}
                    height={80}
                    className="rounded-full object-cover aspect-square"
                  />
                )}
                {testimonials[0].rating && (
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn("w-5 h-5", i < testimonials[0].rating! ? "text-primary fill-primary" : "text-gray-300 dark:text-gray-700")}
                      />
                    ))}
                  </div>
                )}
                <blockquote className="text-xl italic">"{testimonials[0].quote}"</blockquote>
                <p className="font-semibold">{testimonials[0].author}</p>
                {testimonials[0].role && <p className="text-sm text-muted-foreground">{testimonials[0].role}</p>}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {variant === "grid" && (
          <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" variants={containerVariants}>
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-6 text-center h-full">
                  <CardContent className="flex flex-col items-center gap-4">
                    {testimonial.avatarUrl && (
                      <Image
                        src={testimonial.avatarUrl}
                        alt={testimonial.author}
                        width={64}
                        height={64}
                        className="rounded-full object-cover aspect-square"
                      />
                    )}
                    {testimonial.rating && (
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn("w-4 h-4", i < testimonial.rating! ? "text-primary fill-primary" : "text-gray-300 dark:text-gray-700")}
                          />
                        ))}
                      </div>
                    )}
                    <blockquote className="text-lg italic">"{testimonial.quote}"</blockquote>
                    <p className="font-semibold">{testimonial.author}</p>
                    {testimonial.role && <p className="text-sm text-muted-foreground">{testimonial.role}</p>}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {variant === "carousel" && (
          <motion.div className="flex overflow-x-auto gap-4 py-2" variants={containerVariants}>
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants} className="flex-shrink-0 w-80">
                <Card className="p-6 text-center h-full">
                  <CardContent className="flex flex-col items-center gap-4">
                    {testimonial.avatarUrl && (
                      <Image
                        src={testimonial.avatarUrl}
                        alt={testimonial.author}
                        width={64}
                        height={64}
                        className="rounded-full object-cover aspect-square"
                      />
                    )}
                    {testimonial.rating && (
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn("w-4 h-4", i < testimonial.rating! ? "text-primary fill-primary" : "text-gray-300 dark:text-gray-700")}
                          />
                        ))}
                      </div>
                    )}
                    <blockquote className="text-lg italic">"{testimonial.quote}"</blockquote>
                    <p className="font-semibold">{testimonial.author}</p>
                    {testimonial.role && <p className="text-sm text-muted-foreground">{testimonial.role}</p>}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
