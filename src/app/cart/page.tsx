"use client";

import { useStore } from "@/lib/context/store-context";
import { formatPrice } from "@/lib/utils/helpers";
import CartItem from "@/components/ui/CartItem";
import Link from "next/link";

export default function CartPage() {
  const { cart, clearCart } = useStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>

      {cart.items.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium text-white mb-4">Your cart is empty</h2>
          <p className="text-white mb-8">Add some products to your cart and come back!</p>
          <Link
            href="/products"
            className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <div className="divide-y divide-gray-200">
                {cart.items.map((item) => (
                  <div key={item.product.id} className="p-6">
                    <CartItem item={item} />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 flex justify-between">
              <button
                onClick={clearCart}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Clear Cart
              </button>
              <Link
                href="/products"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between text-base text-gray-600">
                  <p>Subtotal</p>
                  <p>{formatPrice(cart.totalPrice)}</p>
                </div>
                <div className="flex justify-between text-base text-gray-600">
                  <p>Shipping</p>
                  <p>Calculated at checkout</p>
                </div>
                <div className="flex justify-between text-base text-gray-600">
                  <p>Tax</p>
                  <p>Calculated at checkout</p>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-medium">
                  <p>Total</p>
                  <p>{formatPrice(cart.totalPrice)}</p>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/checkout"
                  className="w-full bg-indigo-600 text-white px-4 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
