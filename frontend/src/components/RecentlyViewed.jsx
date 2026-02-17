import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";

const RecentlyViewed = () => {
  const { products } = useContext(ShopContext);
  const [recentProducts, setRecentProducts] = useState([]);

  const loadRecentProducts = () => {
    const recentIds = JSON.parse(localStorage.getItem("recentProducts")) || [];
    // Map each ID to a product object from the context
    const recents = recentIds
      .map(id => products.find(product => product._id === id))
      .filter(product => product); // Filter out any undefined products
    setRecentProducts(recents);
  };

  useEffect(() => {
    loadRecentProducts();
  }, [products]);

  const clearRecentlyViewed = () => {
    localStorage.removeItem("recentProducts");
    setRecentProducts([]);
  };

  if (recentProducts.length === 0) return null; // Do not render if empty

  return (
    <div className="my-10 px-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Recently Viewed</h2>
        <button
          onClick={clearRecentlyViewed}
          className="text-sm text-red-600 hover:underline"
        >
          Clear List
        </button>
      </div>
      {/* Horizontal scroll container */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4">
          {recentProducts.map(product => (
            <div key={product._id} className="flex-shrink-0 w-48">
               <ProductItem
                  id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  description={product.description}
                  discount={product.discount}
                  reviews={product.reviews}
                  rating={product.rating}
                  stock={product.stock}
                />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewed;
