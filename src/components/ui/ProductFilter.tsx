"use client";

import { useState } from "react";

interface FilterProps {
  categories: string[];
  onFilter: (category: string | null, minPrice: number | null, maxPrice: number | null) => void;
}

export default function ProductFilter({ categories, onFilter }: FilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<{ min: number | null; max: number | null }>({
    min: null,
    max: null,
  });

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    onFilter(category, priceRange.min, priceRange.max);
  };

  const handlePriceChange = (min: number | null, max: number | null) => {
    setPriceRange({ min, max });
    onFilter(selectedCategory, min, max);
  };

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setPriceRange({ min: null, max: null });
    onFilter(null, null, null);
  };

  return (
    <div className="bg-white p-4 border border-gray-200 rounded-lg">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Filters</h3>

      {/* Category filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Category</h4>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              id="all-categories"
              name="category"
              type="radio"
              checked={selectedCategory === null}
              onChange={() => handleCategoryChange(null)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="all-categories" className="ml-3 text-sm text-gray-700">
              All Categories
            </label>
          </div>

          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <input
                id={`category-${category}`}
                name="category"
                type="radio"
                checked={selectedCategory === category}
                onChange={() => handleCategoryChange(category)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor={`category-${category}`} className="ml-3 text-sm text-gray-700 capitalize">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price range filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Price Range</h4>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min || ""}
            onChange={(e) => handlePriceChange(e.target.value ? Number(e.target.value) : null, priceRange.max)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
          />
          <span className="text-gray-500">-</span>
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max || ""}
            onChange={(e) => handlePriceChange(priceRange.min, e.target.value ? Number(e.target.value) : null)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
          />
        </div>
      </div>

      {/* Clear filters */}
      <button
        type="button"
        onClick={handleClearFilters}
        className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
      >
        Clear Filters
      </button>
    </div>
  );
}
