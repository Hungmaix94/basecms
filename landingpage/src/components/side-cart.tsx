'use client'

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, ShoppingCart, Minus, Plus, Trash2 } from "lucide-react"
import * as React from "react"
import {Label} from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";

interface CartItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

interface SideCartProps extends React.HTMLAttributes<HTMLDivElement> {
  cartItems: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  variant?: "simple-list" | "detailed-controls" | "checkout-ready";
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const cartVariants = {
  hidden: { x: "100%" },
  visible: { x: 0 },
  exit: { x: "100%" },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function SideCart({
  cartItems,
  isOpen,
  onClose,
  variant = "detailed-controls",
  className,
  ...props
}: SideCartProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = cartItems.length > 0 ? 5.00 : 0; // Example fixed shipping
  const taxRate = 0.08; // Example tax rate
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;

  const [discountCode, setDiscountCode] = React.useState("");
  const [discountApplied, setDiscountApplied] = React.useState(0);

  const applyDiscount = () => {
    if (discountCode === "SAVE10") { // Simple mock discount
      setDiscountApplied(subtotal * 0.10);
    } else {
      setDiscountApplied(0);
    }
  };

  const currentTotal = total - discountApplied;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
        ></motion.div>
      )}
      {isOpen && (
        // @ts-ignore
        <motion.div
          className={cn(
            "fixed top-0 right-0 h-full w-full md:w-96 bg-background shadow-lg z-50 transform transition-transform duration-300 ease-in-out",
            className
          )}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={cartVariants}
          {...props}
        >
          <div className="flex flex-col h-full">
            <motion.div className="flex items-center justify-between p-4 border-b" variants={itemVariants}>
              <h2 className="text-xl font-semibold">Your Cart</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
                <span className="sr-only">Close cart</span>
              </Button>
            </motion.div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.length === 0 ? (
                <motion.div className="text-center text-muted-foreground py-8" variants={itemVariants}>
                  <ShoppingCart className="h-12 w-12 mx-auto mb-4" />
                  <p>Your cart is empty.</p>
                  <Link href="/products">
                    <Button variant="link" onClick={onClose}>Start Shopping</Button>
                  </Link>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ staggerChildren: 0.1 }}>
                  {cartItems.map((item) => (
                    <motion.div key={item.id} className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0" variants={itemVariants}>
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="rounded-md object-cover aspect-square"
                      />
                      <div className="flex-1 grid gap-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                        {variant === "detailed-controls" && (
                          <div className="flex items-center gap-2 mt-1">
                            <Button variant="outline" size="icon" className="h-6 w-6">
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input type="number" value={item.quantity} className="w-12 h-6 text-center text-xs" readOnly />
                            <Button variant="outline" size="icon" className="h-6 w-6">
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                      <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>

            {cartItems.length > 0 && (
              <motion.div className="p-4 border-t space-y-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ staggerChildren: 0.1 }}>
                {variant === "checkout-ready" && (
                  <motion.div className="grid gap-2" variants={itemVariants}>
                    <Label htmlFor="discount">Discount Code</Label>
                    <div className="flex gap-2">
                      <Input id="discount" placeholder="Enter code" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} />
                      <Button onClick={applyDiscount}>Apply</Button>
                    </div>
                    {discountApplied > 0 && (
                      <p className="text-sm text-green-500">Discount applied: -${discountApplied.toFixed(2)}</p>
                    )}
                  </motion.div>
                )}

                <motion.div className="space-y-1 text-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ staggerChildren: 0.1 }}>
                  <motion.div className="flex items-center justify-between" variants={itemVariants}>
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </motion.div>
                  <motion.div className="flex items-center justify-between" variants={itemVariants}>
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </motion.div>
                  <motion.div className="flex items-center justify-between" variants={itemVariants}>
                    <span>Tax ({taxRate * 100}%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </motion.div>
                  {discountApplied > 0 && (
                    <motion.div className="flex items-center justify-between text-green-500" variants={itemVariants}>
                      <span>Discount</span>
                      <span>-${discountApplied.toFixed(2)}</span>
                    </motion.div>
                  )}
                  <motion.div className="flex items-center justify-between font-bold text-lg border-t pt-2 mt-2" variants={itemVariants}>
                    <span>Total</span>
                    <span>${currentTotal.toFixed(2)}</span>
                  </motion.div>
                </motion.div>

                <motion.div className="flex flex-col gap-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ staggerChildren: 0.1 }}>
                  <motion.div variants={itemVariants}>
                    <Button size="lg" className="w-full">Proceed to Checkout</Button>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Button variant="outline" className="w-full" onClick={onClose}>Continue Shopping</Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
