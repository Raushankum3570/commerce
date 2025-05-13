"use client";

import { CartItem as CartItemType } from "@/lib/types";
import { formatPrice } from "@/lib/utils/helpers";
import Image from "next/image";
import { useStore } from "@/lib/context/store-context";
import { useNotification } from "@/lib/context/notification-context";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useStore();
  const { showNotification } = useNotification();
  const { product, quantity } = item;

  return (
    <div className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">        <Image
          src={product.imageUrl}
          alt={product.name}
          width={100}
          height={100}
          className="h-full w-full object-cover object-center"
          unoptimized
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{product.name}</h3>
            <p className="ml-4">{formatPrice(product.price)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center">
            <label htmlFor={`quantity-${product.id}`} className="mr-2">
              Qty
            </label>
            <select
              id={`quantity-${product.id}`}
              name="quantity"
              value={quantity}
              onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))}
              className="rounded border border-gray-300 py-1 text-base"
            >
              {[...Array(10).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="flex">            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => {
                removeFromCart(product.id);
                showNotification(`Removed ${product.name} from cart`, "info");
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
