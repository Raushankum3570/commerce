"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Order } from "@/lib/types";
import { formatPrice, formatDate } from "@/lib/utils/helpers";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Load orders from localStorage
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders));
      } catch (error) {
        console.error("Failed to parse stored orders:", error);
      }
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">No orders found</h2>
          <p className="text-gray-600 mb-8">You haven't placed any orders yet.</p>
          <Link
            href="/products"
            className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <h3 className="text-lg font-medium text-gray-900">
                      Order #{order.id}
                    </h3>
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
                  <p className="text-sm text-gray-500 mt-1">
                    Placed on {formatDate(new Date(order.createdAt))}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium text-gray-900">
                    {formatPrice(order.totalAmount)}
                  </p>
                  <Link
                    href={`/orders/${order.id}`}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500 mt-1 inline-block"
                  >
                    View Details
                  </Link>
                </div>
              </div>

              <div className="mt-6 border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  {order.items.length} {order.items.length === 1 ? "item" : "items"}
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  {order.items.slice(0, 3).map((item) => (
                    <li key={item.productId} className="flex justify-between">
                      <span>
                        {item.quantity}x {item.productName}
                      </span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </li>
                  ))}
                  {order.items.length > 3 && (
                    <li className="text-gray-500">
                      And {order.items.length - 3} more items...
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
