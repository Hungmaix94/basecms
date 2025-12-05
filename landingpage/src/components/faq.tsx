'use client'

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface FaqItem {
  question: string;
  answer: string;
  category?: string; // For categorized variant
}

interface FaqProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionTitle?: string;
  sectionDescription?: string;
  faqItems: FaqItem[];
  variant?: "list" | "accordion" | "categorized";
  /** Edit mode flag from Page Builder */
  editMode?: boolean;
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

export default function Faq({ sectionTitle, sectionDescription, faqItems = [], variant = "accordion", className, editMode, ...props }: FaqProps) {
  const categories = Array.from(new Set(faqItems.map(item => item.category))).filter(Boolean) as string[];

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

        {variant === "list" && (
          <motion.div className="max-w-3xl mx-auto space-y-8" variants={containerVariants}>
            {faqItems.map((item, index) => (
              <motion.div key={index} variants={itemVariants} className="space-y-2">
                <h3 className="text-xl font-semibold">{item.question}</h3>
                <p className="text-muted-foreground">{item.answer}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {variant === "accordion" && (
          <motion.div className="max-w-3xl mx-auto" variants={itemVariants}>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        )}

        {variant === "categorized" && (
          <motion.div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3" variants={containerVariants}>
            {categories.map((category, catIndex) => (
              <motion.div key={catIndex} variants={itemVariants}>
                <Card className="p-4 h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl">{category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {faqItems
                        .filter(item => item.category === category)
                        .map((item, index) => (
                          <AccordionItem key={index} value={`item-${catIndex}-${index}`}>
                            <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                            <AccordionContent>{item.answer}</AccordionContent>
                          </AccordionItem>
                        ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            {/* FAQs without a category */}
            {faqItems.filter(item => !item.category).length > 0 && (
              <motion.div variants={itemVariants}>
                <Card className="p-4 h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl">General</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {faqItems
                        .filter(item => !item.category)
                        .map((item, index) => (
                          <AccordionItem key={index} value={`item-general-${index}`}>
                            <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                            <AccordionContent>{item.answer}</AccordionContent>
                          </AccordionItem>
                        ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
