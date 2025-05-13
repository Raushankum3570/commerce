"use client";

import { Cart, CartItem, Product } from "@/lib/types";
import { calculateCartItemCount, calculateCartTotal } from "@/lib/utils/helpers";
import { createContext, useContext, useEffect, useState } from "react";

interface StoreContextType {
  cart: Cart;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const initialCart: Cart = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>(initialCart);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error("Failed to parse stored cart:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(
        item => item.product.id === product.id
      );

      let updatedItems: CartItem[];

      if (existingItemIndex >= 0) {
        // If product already in cart, update quantity
        updatedItems = [...prevCart.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
      } else {
        // If product not in cart, add it
        updatedItems = [...prevCart.items, { product, quantity }];
      }

      const totalItems = calculateCartItemCount(updatedItems);
      const totalPrice = calculateCartTotal(updatedItems);

      return {
        items: updatedItems,
        totalItems,
        totalPrice,
      };
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const updatedItems = prevCart.items.filter(
        item => item.product.id !== productId
      );

      const totalItems = calculateCartItemCount(updatedItems);
      const totalPrice = calculateCartTotal(updatedItems);

      return {
        items: updatedItems,
        totalItems,
        totalPrice,
      };
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;

    setCart(prevCart => {
      const updatedItems = prevCart.items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      );

      const totalItems = calculateCartItemCount(updatedItems);
      const totalPrice = calculateCartTotal(updatedItems);

      return {
        items: updatedItems,
        totalItems,
        totalPrice,
      };
    });
  };

  const clearCart = () => {
    setCart(initialCart);
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
