import { CartItem } from "./types";

/**
 * Format a price to currency string
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

/**
 * Calculate total price of cart items
 */
export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
}

/**
 * Calculate total number of items in cart
 */
export function calculateCartItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => {
    return count + item.quantity;
  }, 0);
}

/**
 * Generate a random order ID
 */
export function generateOrderId(): string {
  return `ORD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
}

/**
 * Format a date to a readable string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
