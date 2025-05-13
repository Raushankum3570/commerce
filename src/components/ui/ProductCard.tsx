"use client";

import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/lib/context/store-context";
import { useNotification } from "@/lib/context/notification-context";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useStore();
  const { showNotification } = useNotification();
  
  const handleAddToCart = () => {
    addToCart(product);
    showNotification(`Added ${product.name} to cart!`, "success");
  };

  return (
    <div className="group relative rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-100 dark:bg-gray-800 group-hover:opacity-90 transition-opacity">
        <div className="relative h-64 w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            className="object-cover object-center transition-transform group-hover:scale-105"
            fill
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
      <div className="p-5">
        <div className="mb-2">
          <span className="inline-flex items-center rounded-full bg-primary-50 dark:bg-primary-900/30 px-2.5 py-0.5 text-xs font-medium text-primary-700 dark:text-primary-300">
            {product.category}
          </span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 line-clamp-1">
          <Link href={`/products/${product.id}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{product.description || `High-quality ${product.category} with impressive features.`}</p>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">{formatPrice(product.price)}</p>
          <button
            onClick={handleAddToCart}
            className="rounded-md bg-primary-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
