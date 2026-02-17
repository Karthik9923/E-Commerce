import React, { useContext, useEffect, useState, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import Point from '../assets/Point.png';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const Categories = () => {
  const { products, backendUrl } = useContext(ShopContext);
  const [categories, setCategories] = useState(["None", "All"]);
  const [selectedCategory, setSelectedCategory] = useState("None");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const productListRef = useRef(null);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/category/all`);
        if (response.data.success) {
          setCategories(["None", "All", ...response.data.categories.map(c => c.name)]);
        }
      } catch (error) {
        toast.error('Error fetching categories');
      }
    };
    fetchCategories();
  }, [backendUrl]);

  // Filter products when category changes
  useEffect(() => {
    const filtered =
      selectedCategory === "All"
        ? products
        : selectedCategory === "None"
          ? [] // Show no products when "None" is selected
          : products.filter(product => product.category === selectedCategory);

    setFilteredProducts(filtered);
  }, [selectedCategory, products]);

  // Handle horizontal scroll
  const handleScroll = (direction) => {
    if (productListRef.current) {
      productListRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="my-10 px-6">
      <hr className="border-gray-300 mb-6" />

      {/* Category Title */}
      <div className="flex items-center gap-2 text-2xl font-bold text-gray-800 mb-4">
        <img src={Point} alt="Point Icon" className="w-6 h-6" />
        <Title text1={'Categories'} />
      </div>

      {/* Category Buttons (Scrollable) */}
      <div className="overflow-x-auto whitespace-nowrap p-2">
        <div className="flex gap-4">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium border rounded-full transition-all duration-300 cursor-pointer
                ${selectedCategory === category
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 hover:bg-red-600 hover:text-white border-gray-300'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Category Description */}
      <div className="mt-6 mb-4">
        <h3 className="text-xl font-semibold text-gray-800">
          {selectedCategory === "None" ? "" : `Best in ${selectedCategory}`}
        </h3>
        <p className="text-gray-500 text-sm mt-1">
          {selectedCategory === "None"
            ? ""
            : `Find premium quality ${selectedCategory} components for your projects.`}
        </p>
      </div>

      {/* Horizontal Carousel Container */}
      <div className="relative">
        {filteredProducts.length > 0 ? (
          <>
            {/* Scroll Left Button */}
            <button
              onClick={() => handleScroll("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 text-gray-700 p-2 rounded-full shadow-md hover:bg-gray-300 z-10"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            {/* Product List (Horizontal Scrollable) */}
            <div
              ref={productListRef}
              className="overflow-x-auto flex gap-2 scrollbar-hide p-2"
              style={{ scrollSnapType: "x mandatory", whiteSpace: "nowrap" }}
            >
              {filteredProducts.map((product) => (
                <div key={product._id} className="inline-block scroll-snap-align-start w-32">
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

            {/* Scroll Right Button */}
            <button
              onClick={() => handleScroll("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 text-gray-700 p-2 rounded-full shadow-md hover:bg-gray-300 z-10"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </>
        ) : (
          <p className="text-gray-500 text-center mt-4">
            No products available in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default Categories;
