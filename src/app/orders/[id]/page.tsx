"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formatPrice, formatDate } from "@/lib/utils/helpers";
import { Order } from "@/lib/types";
import Link from "next/link";

export default function OrderDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load orders from localStorage
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      try {
        const orders: Order[] = JSON.parse(storedOrders);
        const foundOrder = orders.find((o) => o.id === id);
        if (foundOrder) {
          setOrder(foundOrder);
        }
      } catch (error) {
        console.error("Failed to parse stored orders:", error);
      }
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Not Found</h1>
        <p className="text-gray-600 mb-8">The order you are looking for does not exist.</p>
        <Link
          href="/orders"
          className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/orders"
          className="text-indigo-600 hover:text-indigo-500 flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Back to Orders
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Order Header */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <div className="flex flex-wrap gap-2 items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Order #{order.id}
              </h1>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  order.status === "delivered"
                    ? "bg-green-100 text-green-800"
                    : order.status === "shipped"
                    ? "bg-blue-100 text-blue-800"
                    : order.status === "processing"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            <p className="text-gray-500 mt-1">
              Placed on {formatDate(new Date(order.createdAt))}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-medium text-gray-900">
              Total: {formatPrice(order.totalAmount)}
            </p>
          </div>
        </div>

        {/* Order Details */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Items */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Items</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <ul className="divide-y divide-gray-200">
                {order.items.map((item) => (
                  <li key={item.productId} className="py-4 flex justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {item.productName}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Order Summary */}
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <p>Subtotal</p>
                    <p>{formatPrice(order.totalAmount)}</p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <p>Shipping</p>
                    <p>Free</p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <p>Tax</p>
                    <p>Included</p>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between font-medium">
                    <p>Total</p>
                    <p>{formatPrice(order.totalAmount)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Shipping Information
            </h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-medium">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.streetAddress}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.postalCode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Payment Information
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p>
                  <span className="font-medium">Method: </span>
                  {order.paymentMethod === "credit-card" 
                    ? "Credit Card"
                    : order.paymentMethod === "paypal" 
                    ? "PayPal"
                    : order.paymentMethod}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/products"
                className="w-full bg-indigo-600 text-white px-4 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors block text-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
