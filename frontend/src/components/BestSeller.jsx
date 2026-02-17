import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import Point from '../assets/Point.png';

const BestSeller = () => {
  const { products, navigate } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    // Filter out products that are out of stock and show only the first 10 in-stock products
    const inStockProducts = products.filter(product => product.stock);
    setLatestProducts(inStockProducts.slice(0, 10));
  }, [products]);

  return (
    <div className="my-14 px-6">
      {/* Section Header */}
      <div className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-gray-800 mb-3 animate-fadeIn pb-10">
        <img src={Point} alt="Sale Icon" className="w-6 h-6 md:w-8 md:h-8" />
        <Title text1={"Best"} text2={"Seller"} />
      </div>

      {/* Title & View All Button */}
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-red-600">
          Explore Our Most Sold Components
        </h3>
        <button 
          className="bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-md transition-all duration-300 hover:bg-red-700 hidden sm:block"
          onClick={() => navigate('/collections')}
        >
          View All
        </button>
      </div>

      {/* Product List as Horizontal Scroll */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-5">
          {latestProducts.length > 0 ? (
            latestProducts.map((item, index) => (
              <div key={index} className="flex-shrink-0 w-48 transition-transform duration-300 hover:scale-105">
                <ProductItem
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  description={item.description}
                  discount={item.discount}
                  reviews={item.reviews}
                  rating={item.rating}
                  stock={item.stock}
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No products available.</p>
          )}
        </div>
      </div>

      {/* View All Button for Mobile */}
      <div className="flex justify-center mt-8 sm:hidden">
        <button 
          className="bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-md transition-all duration-300 hover:bg-red-700"
          onClick={() => navigate('/collections')}
        >
          View All
        </button>
      </div>
    </div>
  );
};

export default BestSeller;
