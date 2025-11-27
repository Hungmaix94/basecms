'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, Search, User, ShoppingCart, X } from "lucide-react"
import * as React from "react" // For useState

interface NavLink {
  label: string;
  href: string;
}

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  logoText: string;
  logoHref: string;
  navLinks?: NavLink[];
  ctaButton?: {
    label: string;
    href: string;
  };
  variant?: "simple" | "auth-search" | "centered-nav";
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
};

export default function Header({
  logoText,
  logoHref,
  navLinks,
  ctaButton,
  variant = "simple",
  className,
  ...props
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    // @ts-ignore
    <motion.header
      className={cn("w-full py-4 px-4 md:px-6 border-b", className)}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      {...props}
    >
      <div className="container flex items-center justify-between h-14">
        <motion.div variants={itemVariants}>
          <Link href={logoHref} className="text-xl font-bold">
            {logoText}
          </Link>
        </motion.div>

        {variant === "simple" && (
          <>
            <motion.nav className="hidden md:flex gap-4 lg:gap-6" variants={containerVariants}>
              {navLinks?.map((link, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Link href={link.href} className="text-sm font-medium hover:underline underline-offset-4">
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
            <motion.div className="hidden md:block" variants={itemVariants}>
              {ctaButton && (
                <Link href={ctaButton.href}>
                  <Button size="sm">{ctaButton.label}</Button>
                </Link>
              )}
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Toggle mobile menu</span>
              </Button>
            </motion.div>
          </>
        )}

        {variant === "auth-search" && (
          <>
            <motion.nav className="hidden md:flex flex-1 justify-center gap-4 lg:gap-6" variants={containerVariants}>
              {navLinks?.map((link, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Link href={link.href} className="text-sm font-medium hover:underline underline-offset-4">
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
            <motion.div className="hidden md:flex items-center gap-4" variants={containerVariants}>
              <motion.div variants={itemVariants}>
                <Input type="search" placeholder="Search..." className="w-full max-w-xs" />
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Shopping Cart</span>
                </Button>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User Profile</span>
                </Button>
              </motion.div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Toggle mobile menu</span>
              </Button>
            </motion.div>
          </>
        )}

        {variant === "centered-nav" && (
          <>
            <motion.div className="hidden md:flex flex-1 justify-end items-center gap-4 lg:gap-6" variants={containerVariants}>
              {navLinks?.slice(0, Math.ceil((navLinks?.length || 0) / 2)).map((link, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Link href={link.href} className="text-sm font-medium hover:underline underline-offset-4">
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            <motion.div className="hidden md:flex flex-1 justify-start items-center gap-4 lg:gap-6" variants={containerVariants}>
              {navLinks?.slice(Math.ceil((navLinks?.length || 0) / 2)).map((link, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Link href={link.href} className="text-sm font-medium hover:underline underline-offset-4">
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Toggle mobile menu</span>
              </Button>
            </motion.div>
          </>
        )}
      </div>

      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden absolute top-14 left-0 w-full bg-background border-b z-20"
          initial="hidden"
          animate="visible"
          exit="exit" // Use exit prop for AnimatePresence
          variants={mobileMenuVariants}
        >
          <nav className="flex flex-col gap-2 p-4">
            {navLinks?.map((link, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link href={link.href} className="block px-3 py-2 text-base font-medium hover:bg-muted" onClick={() => setIsMobileMenuOpen(false)}>
                  {link.label}
                </Link>
              </motion.div>
            ))}
            {ctaButton && (
                <motion.div variants={itemVariants}>
                    <Link href={ctaButton.href} className="block px-3 py-2">
                        <Button className="w-full" onClick={() => setIsMobileMenuOpen(false)}>{ctaButton.label}</Button>
                    </Link>
                </motion.div>
            )}
            {variant === "auth-search" && (
                <>
                    <motion.div className="px-3 py-2" variants={itemVariants}>
                        <Input type="search" placeholder="Search..." className="w-full" />
                    </motion.div>
                    <motion.div className="flex justify-around py-2" variants={containerVariants}>
                        <motion.div variants={itemVariants}>
                            <Button variant="ghost" size="icon" className="w-full">
                                <ShoppingCart className="h-5 w-5" />
                                <span className="sr-only">Shopping Cart</span>
                            </Button>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <Button variant="ghost" size="icon" className="w-full">
                                <User className="h-5 w-5" />
                                <span className="sr-only">User Profile</span>
                            </Button>
                        </motion.div>
                    </motion.div>
                </>
            )}
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
