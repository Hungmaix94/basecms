'use client'

import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Star, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useState, HTMLAttributes } from "react";

interface ProductVariant {
  id: string;
  name: string;
  price: number;
}

interface ProductReview {
  id: string;
  author: string;
  rating: number; // 1-5
  comment: string;
  date: string;
}

interface ProductDetailProps extends HTMLAttributes<HTMLDivElement> {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    longDescription?: string;
    images: string[];
    rating?: number; // Average rating
    reviewCount?: number;
    variants?: ProductVariant[];
    features?: string[];
    specifications?: { label: string; value: string }[];
    reviews?: ProductReview[]; // For reviews variant
  };
  variant?: "standard" | "gallery-focused" | "with-reviews";
}

export default function ProductDetail({ product, variant = "standard", className, ...props }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product.variants ? product.variants[0].id : "");

  return (
    <section className={cn("w-full py-12 md:py-24 lg:py-32", className)} {...props}>
      <div className="container px-4 md:px-6">
        {variant === "standard" && (
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="grid gap-4">
              <Image
                src={selectedImage}
                alt={product.name}
                width={600}
                height={600}
                className="rounded-lg object-cover w-full aspect-square"
              />
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((img, index) => (
                    <Image
                      key={index}
                      src={img}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      width={100}
                      height={100}
                      className={cn(
                        "rounded-md object-cover cursor-pointer border-2",
                        selectedImage === img ? "border-primary" : "border-transparent"
                      )}
                      onClick={() => setSelectedImage(img)}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="grid gap-6">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-2">
                {product.rating && (
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn("w-5 h-5", i < product.rating! ? "text-primary fill-primary" : "text-gray-300 dark:text-gray-700")}
                      />
                    ))}
                  </div>
                )}
                {product.reviewCount && <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>}
              </div>
              <p className="text-4xl font-bold">${product.price.toFixed(2)}</p>
              <p className="text-muted-foreground">{product.description}</p>
              <div className="grid gap-4">
                {product.variants && product.variants.length > 0 && (
                  <div className="grid gap-2">
                    <Label htmlFor="variant">Variant</Label>
                    <select
                      id="variant"
                      value={selectedVariant}
                      onChange={(e) => setSelectedVariant(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {product.variants.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.name} - ${v.price.toFixed(2)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-20"
                  />
                </div>
                <Button size="lg" className="w-full">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </div>
              {product.features && product.features.length > 0 && (
                <div className="grid gap-2">
                  <h3 className="font-semibold">Features</h3>
                  <ul className="grid gap-1 text-sm text-muted-foreground">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              {product.specifications && product.specifications.length > 0 && (
                <div className="grid gap-2">
                  <h3 className="font-semibold">Specifications</h3>
                  <div className="grid text-sm text-muted-foreground">
                    {product.specifications.map((spec, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span>{spec.label}</span>
                        <span>{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {variant === "gallery-focused" && (
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 grid gap-4">
              <Image
                src={selectedImage}
                alt={product.name}
                width={900}
                height={600}
                className="rounded-lg object-cover w-full aspect-video"
              />
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((img, index) => (
                    <Image
                      key={index}
                      src={img}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      width={150}
                      height={100}
                      className={cn(
                        "rounded-md object-cover cursor-pointer border-2",
                        selectedImage === img ? "border-primary" : "border-transparent"
                      )}
                      onClick={() => setSelectedImage(img)}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="grid gap-6 lg:col-span-1">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-4xl font-bold">${product.price.toFixed(2)}</p>
              <p className="text-muted-foreground">{product.description}</p>
              <div className="grid gap-4">
                {product.variants && product.variants.length > 0 && (
                  <div className="grid gap-2">
                    <Label htmlFor="variant">Variant</Label>
                    <select
                      id="variant"
                      value={selectedVariant}
                      onChange={(e) => setSelectedVariant(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {product.variants.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.name} - ${v.price.toFixed(2)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-20"
                  />
                </div>
                <Button size="lg" className="w-full">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </div>
            </div>
          </div>
        )}

        {variant === "with-reviews" && (
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 items-start">
            <div className="md:col-span-2 grid gap-4">
              <Image
                src={selectedImage}
                alt={product.name}
                width={700}
                height={700}
                className="rounded-lg object-cover w-full aspect-square"
              />
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((img, index) => (
                    <Image
                      key={index}
                      src={img}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      width={100}
                      height={100}
                      className={cn(
                        "rounded-md object-cover cursor-pointer border-2",
                        selectedImage === img ? "border-primary" : "border-transparent"
                      )}
                      onClick={() => setSelectedImage(img)}
                    />
                  ))}
                </div>
              )}
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
                {product.reviews && product.reviews.length > 0 ? (
                  <div className="space-y-6">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-center gap-0.5 mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={cn("w-4 h-4", i < review.rating ? "text-primary fill-primary" : "text-gray-300 dark:text-gray-700")}
                            />
                          ))}
                          <span className="ml-2 text-sm font-semibold">{review.author}</span>
                          <span className="text-xs text-muted-foreground ml-2">{review.date}</span>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
                )}
              </div>
            </div>
            <div className="grid gap-6 md:col-span-1">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-2">
                {product.rating && (
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn("w-5 h-5", i < product.rating! ? "text-primary fill-primary" : "text-gray-300 dark:text-gray-700")}
                      />
                    ))}
                  </div>
                )}
                {product.reviewCount && <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>}
              </div>
              <p className="text-4xl font-bold">${product.price.toFixed(2)}</p>
              <p className="text-muted-foreground">{product.description}</p>
              <div className="grid gap-4">
                {product.variants && product.variants.length > 0 && (
                  <div className="grid gap-2">
                    <Label htmlFor="variant">Variant</Label>
                    <select
                      id="variant"
                      value={selectedVariant}
                      onChange={(e) => setSelectedVariant(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {product.variants.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.name} - ${v.price.toFixed(2)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-20"
                  />
                </div>
                <Button size="lg" className="w-full">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </div>
              {product.features && product.features.length > 0 && (
                <div className="grid gap-2">
                  <h3 className="font-semibold">Features</h3>
                  <ul className="grid gap-1 text-sm text-muted-foreground">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              {product.specifications && product.specifications.length > 0 && (
                <div className="grid gap-2">
                  <h3 className="font-semibold">Specifications</h3>
                  <div className="grid text-sm text-muted-foreground">
                    {product.specifications.map((spec, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span>{spec.label}</span>
                        <span>{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
