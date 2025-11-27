import { cva as originalCva, type VariantProps } from 'class-variance-authority';
import type { ClassValue } from 'clsx';

// Define the expected function signature for the cva function
type CvaFn = <T>(
  base?: ClassValue,
  config?: any
) => (props?: any) => string;

// Re-export VariantProps for convenience
export type { VariantProps };

// Wrap and cast the original cva function to ensure it's callable
export const cva: CvaFn = (base, config) => originalCva(base, config);
