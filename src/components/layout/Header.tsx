"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, User } from "lucide-react";
import { useStore } from "@/lib/context/store-context";

export default function Header() {
  const pathname = usePathname();
  const { cart } = useStore();

  const navigation = [
    { name: "Home", href: "/", current: pathname === "/" },
    { name: "Products", href: "/products", current: pathname === "/products" || pathname.startsWith("/products/") },
    { name: "Orders", href: "/orders", current: pathname === "/orders" },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/" className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                ElectroShop
              </Link>
            </div>
            <nav className="ml-8 hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    item.current
                      ? "text-primary-700 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/50"
                      : "text-gray-600 hover:text-primary-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800"
                  }`}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            <Link
              href="/cart"
              className="group flex items-center p-2 relative rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ShoppingCart className="h-6 w-6 text-gray-500 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-400" />
              {cart.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs font-medium text-white ring-2 ring-white dark:ring-gray-900">
                  {cart.totalItems}
                </span>
              )}
            </Link>
            <Link
              href="/account"
              className="flex items-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <User className="h-6 w-6 text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
