"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/utils/helpers";
import Image from "next/image";
import { useStore } from "@/lib/context/store-context";
import { useNotification } from "@/lib/context/notification-context";
import Link from "next/link";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useStore();
  const { showNotification } = useNotification();
  const [quantity, setQuantity] = useState(1);
  
  // Find the product by ID
  const product = products.find(p => p.id === id);
    // If product not found
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Product Not Found</h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">The product you are looking for does not exist.</p>
        <Link 
          href="/products" 
          className="mt-6 inline-block bg-primary-600 text-white px-6 py-3 rounded-md font-medium hover:bg-primary-700 transition-colors"
        >
          Back to Products
        </Link>
      </div>
    );
  }
  
  // Handle add to cart
  const handleAddToCart = () => {
    addToCart(product, quantity);
    showNotification(`Added ${quantity} ${product.name}${quantity > 1 ? 's' : ''} to cart!`, "success");
  };
    return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 shadow-lg">
          <Image
            src={product.imageUrl}
            alt={product.name}
            className="object-cover transition-transform hover:scale-105 duration-700"
            fill
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
        {/* Product Details */}
        <div className="space-y-8">
          <div>
            <div className="inline-flex items-center rounded-full bg-primary-50 dark:bg-primary-900/30 px-3 py-1 mb-4 text-sm font-medium text-primary-700 dark:text-primary-300 ring-1 ring-inset ring-primary-700/10 dark:ring-primary-300/20">
              {product.category}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-2">{formatPrice(product.price)}</div>
          </div>
          
          <div className="border-t border-b border-gray-200 dark:border-gray-700 py-6">
            <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
          </div>
          
          <div>
            <div className="flex items-center flex-wrap gap-6">
              <div className="flex items-center">
                <label htmlFor="quantity" className="mr-3 text-gray-700 dark:text-gray-300 font-medium">
                  Quantity
                </label>
                <select
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-3 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:text-gray-300"
                >
                  {[...Array(10).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="text-gray-700 dark:text-gray-300">
                {product.stock > 0 ? (
                  <span className="text-green-600 dark:text-green-400 font-medium flex items-center">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="text-red-600 dark:text-red-400 font-medium flex items-center">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                    </svg>
                    Out of Stock
                  </span>
                )}
              </div>
            </div>
              <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="mt-8 w-full bg-primary-600 text-white px-6 py-4 rounded-lg font-medium hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 transition-colors disabled:bg-gray-400 disabled:dark:bg-gray-600 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              Add to Cart
            </button>
            
            <Link
              href="/products"
              className="mt-4 w-full block text-center border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
          
          <div className="pt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Product Details</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <li className="flex items-center">
                <span className="font-medium mr-2">Category:</span> 
                <span className="capitalize">{product.category}</span>
              </li>
              <li className="flex items-center">
                <span className="font-medium mr-2">ID:</span> {product.id}
              </li>
              <li className="flex items-center">
                <span className="font-medium mr-2">Availability:</span> 
                {product.stock > 3 
                  ? <span className="text-green-600 dark:text-green-400">In Stock</span> 
                  : product.stock > 0 
                    ? <span className="text-yellow-600 dark:text-yellow-400">Low Stock</span>
                    : <span className="text-red-600 dark:text-red-400">Out of Stock</span>}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
