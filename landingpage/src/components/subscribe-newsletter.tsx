'use client'

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

interface SubscribeNewsletterProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  variant?: "simple-inline" | "prominent-section" | "minimalist-icon";
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

export default function SubscribeNewsletter({
  title,
  description,
  placeholder = "Enter your email",
  buttonText = "Subscribe",
  variant = "prominent-section",
  className,
  ...props
}: SubscribeNewsletterProps) {
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
        {variant === "simple-inline" && (
          <motion.div className="max-w-md mx-auto flex flex-col items-center justify-center gap-4" variants={containerVariants}>
            <motion.h3 className="text-xl font-semibold" variants={itemVariants}>{title || "Stay Updated"}</motion.h3>
            <motion.form className="flex w-full max-w-sm items-center space-x-2" variants={containerVariants}>
              <motion.div variants={itemVariants}>
                <Input type="email" placeholder={placeholder} className="max-w-lg flex-1" />
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button type="submit">{buttonText}</Button>
              </motion.div>
            </motion.form>
            {description && <motion.p className="text-sm text-muted-foreground text-center" variants={itemVariants}>{description}</motion.p>}
          </motion.div>
        )}

        {variant === "prominent-section" && (
          <motion.div className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-4 bg-gray-50 dark:bg-gray-900 p-8 rounded-lg shadow-md" variants={containerVariants}>
            <motion.h2 className="text-3xl font-bold tracking-tighter sm:text-4xl" variants={itemVariants}>{title || "Join Our Newsletter"}</motion.h2>
            <motion.p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed" variants={itemVariants}>
              {description || "Receive updates, promotions, and exclusive content directly in your inbox."}
            </motion.p>
            <motion.form className="flex w-full max-w-sm items-center space-x-2 mt-4" variants={containerVariants}>
              <motion.div variants={itemVariants}>
                <Input type="email" placeholder={placeholder} className="max-w-lg flex-1" />
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button type="submit">{buttonText}</Button>
              </motion.div>
            </motion.form>
          </motion.div>
        )}

        {variant === "minimalist-icon" && (
          <motion.div className="max-w-md mx-auto flex flex-col items-center justify-center gap-4" variants={containerVariants}>
            <motion.div className="flex items-center gap-2" variants={itemVariants}>
              <Mail className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold">{title || "Get Our Updates"}</h3>
            </motion.div>
            {description && <motion.p className="text-sm text-muted-foreground text-center" variants={itemVariants}>{description}</motion.p>}
            <motion.form className="flex w-full max-w-sm items-center space-x-2" variants={containerVariants}>
              <motion.div variants={itemVariants}>
                <Input type="email" placeholder={placeholder} className="max-w-lg flex-1" />
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button type="submit" variant="ghost" size="sm" className="px-3 py-1 border rounded-md">
                  {buttonText}
                </Button>
              </motion.div>
            </motion.form>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
