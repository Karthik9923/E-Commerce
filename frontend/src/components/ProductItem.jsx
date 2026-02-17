import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const ProductItem = ({
  id,
  image,
  name,
  price = 0,
  discount = 0,
  rating = 0,
  reviews = 0,
  description,
  stock = true,
}) => {
  const { currency } = useContext(ShopContext) || { currency: "$" };

  const originalPrice = Number(price);
  const discountPercentage = Number(discount);
  const discountedPrice =
    discountPercentage > 0
      ? (originalPrice * (1 - discountPercentage / 100)).toFixed(2)
      : originalPrice.toFixed(2);

  return (
    <div
      className={`group relative bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 overflow-hidden ${
        !stock ? "opacity-75" : ""
      }`}
    >
      {/* Image Container */}
      <div className="relative pt-[100%] bg-gray-50">
        <Link
          to={stock ? `/product/${id}` : "#"}
          className="absolute inset-0 flex items-center justify-center p-4"
        >
          <img
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            src={
              Array.isArray(image) && image.length > 0
                ? image[0]
                : "/placeholder.jpg"
            }
            alt={name}
          />

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold py-1.5 px-3 rounded-full shadow-sm">
              Save {discountPercentage}%
            </div>
          )}

          {/* Stock Status Overlay */}
          {!stock && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-4">
              <div className="text-center space-y-2">
                <div className="inline-flex bg-gray-100 rounded-full p-2">
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-gray-700">
                  Out Of Stock
                </p>
                <p className="text-xs text-gray-500">
                  Check availability options
                </p>
              </div>
            </div>
          )}
        </Link>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <Link to={stock ? `/product/${id}` : "#"} className="block">
          <h3 className="text-sm font-semibold text-gray-900 hover:text-red-600 transition-colors line-clamp-2 mb-1 h-12">
            {name}
          </h3>
        </Link>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={14}
                className={`${
                  index < rating ? "text-yellow-400" : "text-gray-300"
                }`}
                fill={index < rating ? "#FBBF24" : "transparent"}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({reviews})</span>
        </div>

        {/* Pricing */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-gray-900">
            {currency}
            {discountedPrice}
          </span>
          {discountPercentage > 0 && (
            <span className="text-sm text-gray-500 line-through">
              {currency}
              {originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Product Features */}
        <p className="text-sm text-gray-500 mt-2 line-clamp-2 h-10">
          {description}
        </p>
      </div>

      {/* Hover Actions */}
      {stock && (
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductItem;
