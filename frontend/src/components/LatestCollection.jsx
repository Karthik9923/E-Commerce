import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import Point from "../assets/Point.png";

const LatestCollection = () => {
  const navigate = useNavigate();
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [timeLeft, setTimeLeft] = useState({});

  // Filter products to only include those with discount > 0
  useEffect(() => {
    // If you want to show all discounted products, remove the slice.
    const discountedProducts = products.filter(product => Number(product.discount) > 0);
    setLatestProducts(discountedProducts.slice(0, 20));
  }, [products]);

  useEffect(() => {
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 2);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = deadline - now;
      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="my-10 px-4">
      {/* Heading */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-gray-800 mb-3 animate-fadeIn">
          <img src={Point} alt="Sale Icon" className="w-6 h-6 md:w-8 md:h-8" />
          <Title text1={'🔥 Hot'} text2={'Sale'} />
        </div>

        {/* Countdown Timer - Centered */}
        <div className="flex flex-wrap justify-center items-center gap-2 pt-5 sm:gap-4 text-lg md:text-xl font-semibold text-red-500 px-4 py-4 rounded-lg">
          ⏳ Sale Ends In: 
          <span className="bg-white px-3 py-1 rounded-md shadow">{timeLeft.days}d</span>
          <span className="bg-white px-3 py-1 rounded-md shadow">{timeLeft.hours}h</span>
          <span className="bg-white px-3 py-1 rounded-md shadow">{timeLeft.minutes}m</span>
          <span className="bg-white px-3 py-1 rounded-md shadow">{timeLeft.seconds}s</span>
        </div>
      </div>

      {/* Product Carousel */}
      <div className="relative mt-6">
        {latestProducts.length > 0 ? (
          <div id="product-container" className="flex overflow-x-auto gap-2 scroll-smooth scrollbar-hide py-3">
            {latestProducts.map((item, index) => (
              <div key={index} className="flex-shrink-0 w-48">
                <ProductItem
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  discount={item.discount}
                  description={item.description}
                  reviews={item.reviews}
                  rating={item.rating}
                  stock={item.stock}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-4">No products available in this sale.</p>
        )}
      </div>

      {/* View All Products Button */}
      <div className="flex justify-center mt-8">
        <button
          className="bg-red-600 text-white px-6 py-3 rounded-xl text-lg font-medium shadow-lg transition-transform transform hover:scale-105 hover:bg-red-700"
          onClick={() => navigate('/collections')}
        >
          View All Products
        </button>
      </div>
    </div>
  );
};

export default LatestCollection;
