'use client'

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, ShoppingCart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {HTMLAttributes, useMemo, useState} from "react"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" // Assuming select component is available

interface ProductItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  rating?: number;
  reviewCount?: number;
  href: string;
}

interface ProductListProps extends HTMLAttributes<HTMLDivElement> {
  sectionTitle?: string;
  products: ProductItem[];
  variant?: "grid-simple" | "filterable-list" | "featured-grid"; // Define 3 variations
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

export default function ProductList({ sectionTitle, products, variant = "grid-simple", className, ...props }: ProductListProps) {
  const [filters, setFilters] = useState({ category: "", priceRange: "" }); // For filterable-list
  const [sortBy, setSortBy] = useState(""); // For filterable-list

  // Simplified filtering and sorting for demonstration
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;
    // Apply filters if needed
    // Apply sorting if needed
    return filtered;
  }, [products, filters, sortBy]);

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
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover our latest products.
            </p>
          </div>
        </motion.div>

        {variant === "grid-simple" && (
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" variants={containerVariants}>
            {products.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <Card>
                  <Link href={product.href}>
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full aspect-square object-cover rounded-t-lg"
                    />
                  </Link>
                  <CardHeader>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                    {product.rating && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="w-4 h-4 mr-1 text-primary fill-primary" />
                        {product.rating} ({product.reviewCount || 0})
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {variant === "filterable-list" && (
          <motion.div className="grid lg:grid-cols-[280px_1fr] gap-8" variants={containerVariants}>
            <motion.div className="space-y-6" variants={itemVariants}>
              <h3 className="text-lg font-semibold">Filters</h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category-filter">Category</Label>
                  <select
                    id="category-filter"
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">All</option>
                    <option value="electronics">Electronics</option>
                    <option value="apparel">Apparel</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price-filter">Price Range</Label>
                  <Input id="price-filter" type="text" placeholder="e.g., $50-100" />
                </div>
              </div>
              <h3 className="text-lg font-semibold">Sort By</h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="sort-by">Sort By</Label>
                  <select
                    id="sort-by"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="default">Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating-desc">Rating</option>
                  </select>
                </div>
              </div>
            </motion.div>
            <motion.div className="grid gap-6" variants={containerVariants}>
              {filteredAndSortedProducts.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <Card className="flex flex-col md:flex-row gap-4 p-4">
                    <Link href={product.href}>
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={150}
                        height={150}
                        className="object-cover rounded-md aspect-square flex-shrink-0"
                      />
                    </Link>
                    <div className="flex-1 grid gap-2">
                      <CardTitle>
                        <Link href={product.href}>{product.name}</Link>
                      </CardTitle>
                      <CardContent className="p-0 flex items-center justify-between">
                          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                          {product.rating && (
                              <div className="flex items-center text-sm text-muted-foreground">
                              <Star className="w-4 h-4 mr-1 text-primary fill-primary" />
                              {product.rating} ({product.reviewCount || 0})
                              </div>
                          )}
                      </CardContent>
                      <CardFooter className="p-0 mt-2">
                        <Button size="sm">
                          <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                        </Button>
                      </CardFooter>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {variant === "featured-grid" && (
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants}>
            {products.slice(0, 3).map((product) => ( // Displaying first 3 as featured
              <motion.div key={product.id} variants={itemVariants}>
                <Card className="flex flex-col h-full">
                  <Link href={product.href}>
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={400}
                      height={300}
                      className="w-full aspect-video object-cover rounded-t-lg"
                    />
                  </Link>
                  <CardHeader>
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                    {product.rating && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="w-5 h-5 mr-1 text-primary fill-primary" />
                        {product.rating} ({product.reviewCount || 0})
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" size="lg">
                      <ShoppingCart className="w-5 h-5 mr-2" /> View Product
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}
