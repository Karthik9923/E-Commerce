import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";
import { toast } from "react-toastify";

const CategoryProductPage = () => {
  const { selectedCategory, products, search } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("relevance");

  useEffect(() => {
    if (!selectedCategory) return; // Ensure a category is selected

    // Filter products by the selected category (case-insensitive)
    let filtered = products.filter(
      (product) =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
    );

    // Apply search filter if there's a search query
    if (search) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort the filtered products based on the selected sort option
    if (sortOption === "low-high") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);

    if (filtered.length === 0) {
      toast.info("No products available in this category.");
    }
  }, [selectedCategory, products, search, sortOption]);

  // Fallback if no category is selected
  if (!selectedCategory) {
    return (
      <div className="my-10 px-6">
        <p className="text-center text-lg text-gray-700">
          Please select a category from Quick Search above.
        </p>
      </div>
    );
  }

  return (
    <div className="py-10 px-6">
      {/* Sorting Option */}
      <div className="flex justify-end mb-6">
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

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
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
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryProductPage;
