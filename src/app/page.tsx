import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";
import ProductCard from "@/components/ui/ProductCard";

export default function Home() {
  // Show featured products (first 4 products)
  const featuredProducts = products.slice(0, 4);
  
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="py-12 md:py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center rounded-full bg-primary-50 dark:bg-primary-900/30 px-3 py-1 mb-4 text-sm font-medium text-primary-700 dark:text-primary-300 ring-1 ring-inset ring-primary-700/10 dark:ring-primary-300/20">
                New Arrivals 2025
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Your One-Stop <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-white">Electronics</span> Shop
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg">
              Discover the latest gadgets and tech essentials at competitive prices.
              Quality products delivered right to your doorstep.
            </p>
            <div className="flex flex-wrap gap-4">
              
              <Link
                href="/products"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 shadow-sm hover:shadow transition-all"
              >
                Shop Now
              </Link>
              <Link
                href="/products"
                className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
          
          <div className="relative h-72 sm:h-80 md:h-96 lg:h-[32rem] rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/30 to-accent-500/20 mix-blend-multiply z-10"></div>
            <Image
              src='/he.jpeg'
              alt="Featured Electronics"
              className="object-cover transition-transform hover:scale-105 duration-700"
              fill
              priority
              unoptimized
            />
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <span className="inline-block mb-2 text-sm font-medium text-primary-600 dark:text-primary-400">
            HANDPICKED FOR YOU
          </span>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Products</h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Check out our top picks for you, selected based on quality and innovation
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            href="/products" 
            className="inline-block bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-8 py-3 rounded-lg font-medium border border-gray-200 dark:border-gray-700 hover:border-primary-600 dark:hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 shadow-sm transition-all"
          >
            Explore All Products
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900/90 rounded-3xl my-12">
        <div className="text-center mb-12">
          <span className="inline-block mb-2 text-sm font-medium text-primary-600 dark:text-primary-400">
            OUR PROMISE TO YOU
          </span>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why Shop With Us</h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
          <div className="relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg rotate-12 hover:rotate-0 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Premium Quality</h3>
              <p className="text-gray-600 dark:text-gray-300">We curate only the highest quality electronic devices from trusted brands, ensuring durability and performance.</p>
            </div>
          </div>
          
          <div className="relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-12 bg-accent-500 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg rotate-12 hover:rotate-0 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Express Delivery</h3>
              <p className="text-gray-600 dark:text-gray-300">Get your orders delivered quickly and efficiently to your doorstep with our reliable shipping partners.</p>
            </div>
          </div>
          
          <div className="relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-12 bg-primary-700 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg rotate-12 hover:rotate-0 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Secure Checkout</h3>
              <p className="text-gray-600 dark:text-gray-300">Your transactions are protected with state-of-the-art security measures and encryption technology.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
