"use client";

import { useStore } from "@/lib/context/store-context";
import { formatPrice } from "@/lib/utils/helpers";
import { generateOrderId } from "@/lib/utils/helpers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CheckoutForm from "@/components/ui/CheckoutForm";
import { ShippingAddress } from "@/lib/types";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, clearCart } = useStore();
  const router = useRouter();

  // Redirect to cart if cart is empty
  useEffect(() => {
    if (cart.items.length === 0) {
      router.push("/cart");
    }
  }, [cart.items.length, router]);

  const handleCheckout = ({
    shippingAddress,
    paymentMethod,
  }: {
    shippingAddress: ShippingAddress;
    paymentMethod: string;
  }) => {
    // In a real application, this would process payment and create an order
    const orderId = generateOrderId();
    
    // Create order object
    const order = {
      id: orderId,
      items: cart.items.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalAmount: cart.totalPrice,
      shippingAddress,
      paymentMethod,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    
    // Save order to localStorage (in a real app, this would be sent to a database)
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem("orders", JSON.stringify([...existingOrders, order]));
    
    // Clear cart and redirect to order confirmation
    clearCart();
    router.push(`/orders/${orderId}`);
  };

  if (cart.items.length === 0) {
    return null; // Will redirect via useEffect
  }
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="flex items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mr-4">Checkout</h1>
        <div className="w-full h-0.5 bg-gradient-to-r from-indigo-500 to-transparent"></div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <CheckoutForm onSubmit={handleCheckout} />
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-xl shadow-lg bg-gradient-to-br from-indigo-600 to-indigo-800 p-6 sticky top-8">
            <h2 className="text-xl font-medium text-white mb-6 pb-2 border-b border-indigo-400">Order Summary</h2>

            <div className="mb-6 space-y-3 max-h-64 overflow-auto pr-2 scrollbar-thin">
              {cart.items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm bg-indigo-700/30 p-3 rounded-lg backdrop-blur-sm">
                  <div className="flex flex-col">
                    <span className="text-white font-medium">{item.product.name}</span>
                    <span className="text-indigo-200 text-xs">Qty: {item.quantity}</span>
                  </div>
                  <span className="text-white font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-white">
              <div className="flex justify-between text-base">
                <p>Subtotal</p>
                <p className="font-medium">{formatPrice(cart.totalPrice)}</p>
              </div>
              <div className="flex justify-between text-base">
                <p>Shipping</p>
                <p className="font-medium">Free</p>
              </div>
              <div className="flex justify-between text-base">
                <p>Tax (10%)</p>
                <p className="font-medium">{formatPrice(cart.totalPrice * 0.1)}</p>
              </div>
              <div className="border-t border-indigo-400 mt-4 pt-4 flex justify-between text-lg font-bold">
                <p>Total</p>
                <p>{formatPrice(cart.totalPrice * 1.1)}</p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <button
                type="button"
                className="w-full bg-white text-indigo-700 px-4 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors flex items-center justify-center"
                onClick={() => document.querySelector('form')?.dispatchEvent(
                  new Event('submit', { bubbles: true, cancelable: true })
                )}
              >
                Complete Order
              </button>
              <Link
                href="/cart"
                className="w-full text-center border border-indigo-400 text-white px-4 py-3 rounded-lg font-medium hover:bg-indigo-700/50 transition-colors flex items-center justify-center"
              >
                Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
