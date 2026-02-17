import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";
import { useNavigate } from "react-router-dom";
import Point from "../assets/Point.png";

const FeaturedProducts = () => {
  const { products, navigate } = useContext(ShopContext);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Filter products that are marked as bestSeller and are in stock
    const bestsellers = products.filter(
      (product) => product.bestSeller && product.stock
    );
    // Fallback: if none are bestsellers, show the first 10 in-stock products
    const inStockProducts = products.filter((product) => product.stock);
    setFeaturedProducts(
      bestsellers.length > 0 ? bestsellers : inStockProducts.slice(0, 10)
    );
  }, [products]);

  if (featuredProducts.length === 0) return null;

  return (
    <div className="my-14 px-6">
      {/* Section Header */}
      <div className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-gray-800 mb-3 animate-fadeIn pb-10">
        <img src={Point} alt="Sale Icon" className="w-6 h-6 md:w-8 md:h-8" />
        <Title text1={"Featured"} text2={"Products"} />
      </div>

      {/* Horizontal Scroll List */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-5">
          {featuredProducts.map((product) => (
            <div
              key={product._id}
              className="flex-shrink-0 w-48 transition-transform duration-300 hover:scale-105"
            >
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

export default FeaturedProducts;
