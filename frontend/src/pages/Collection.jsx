import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import Point from "../assets/Point.png";
import ProductItem from "../components/ProductItem";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const Collection = () => {
  const { products, search } = useContext(ShopContext); // Accessing products and search from context
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [sortOption, setSortOption] = useState("relevance");
  const [showPromo, setShowPromo] = useState(true); // State to control promo visibility

  // Extract unique categories from the products data
  const categories = ["All", ...new Set(products.map((product) => product.category))];

  useEffect(() => {
    // Filter products by category and search query
    let filtered = category === "All" ? [...products] : products.filter((product) => product.category === category);

    if (search) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort products based on the selected option
    if (sortOption === "low-high") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    setFilterProducts(filtered);
  }, [category, sortOption, search, products]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Sidebar Filters */}
      <div className="min-w-60">
        <div className="flex">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="my-2 ms-4 text-red-500 text-xl flex items-center cursor-pointer gap-2"
          >
            FILTERS
            <img
              src={assets.dropdown_icon}
              alt="Dropdown Icon"
              className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            />
          </p>
        </div>

        {/* Category Filter */}
        <div className={`pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <ul className="space-y-2 text-sm sm:text-base text-[#414141]">
            {categories.map((cat, index) => (
              <li key={index}>
                <button
                  onClick={() => setCategory(cat)}
                  className={`hover:underline ${category === cat ? "font-bold text-red-500" : ""}`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Promo Box */}
        {showPromo && (
          <div className="relative bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-6 mb-8 mx-4 sm:mx-0 shadow-md">
            {/* Close Icon */}
            <button
              onClick={() => setShowPromo(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="text-center sm:text-left mb-4 sm:mb-0">
                <h2 className="text-2xl font-bold text-red-600 mb-2">
                  Create Your Custom Kit
                </h2>
                <p className="text-gray-600 mb-7 max-w-xl">
                  Prefer crafting a personalized kit instead of purchasing each component individually? Explore our kit builder and unlock exclusive bundle discounts.
                </p>
                <Link
                  to="/kit"
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg"
                >
                  Start Building Now →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Page Header */}
        <div className="mb-10 border-b pb-6">
          <div className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-gray-900 mb-3 animate-fadeIn">
            <img src={Point} alt="Components Icon" className="w-6 h-6 md:w-8 md:h-8" />
            <Title text1="All" text2=" Components" />
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Browse through our extensive range of available components.
          </p>
        </div>

        {/* Product Sort */}
        <div className="flex justify-start mb-6">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded-md text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="relevance">Sort by: Relevance</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 mt-10">
          {filterProducts.length > 0 ? (
            filterProducts.map((item) => (
              <ProductItem
                key={item._id}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
                description={item.description}
                discount={item.discount}
                rating={item.rating}
                reviews={item.reviews}
                stock={item.stock}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
