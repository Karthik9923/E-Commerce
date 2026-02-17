// QuickSearch.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const QuickSearch = () => {
  const { backendUrl, setSelectedCategory } = useContext(ShopContext);
  const [categories, setCategories] = useState(["Quick Search"]);
  const navigate = useNavigate();

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/category/all`);
        if (response.data.success) {
          setCategories(["Quick Links", ...response.data.categories.map(c => c.name)]);
        }
      } catch (error) {
        toast.error('Error fetching categories');
      }
    };
    fetchCategories();
  }, [backendUrl]);

  const handleCategoryClick = (category) => {
    if (category !== "Quick Links") {
      // Set the selected category in context
      setSelectedCategory(category);
      // Navigate to the category product page route
      navigate(`/category`);
    }
  };

  return (
    <div className="bg-white shadow-sm sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex overflow-x-auto items-center whitespace-nowrap">
          {categories.map((category, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <span className="mx-2 text-gray-400 select-none">•</span>
              )}
              {category === "Quick Links" ? (
                <span className="text-sm font-medium text-red-600">
                  {category}
                </span>
              ) : (
                <a
                  onClick={() => handleCategoryClick(category)}
                  className="cursor-pointer text-sm font-medium text-gray-600 transition-colors hover:text-red-500"
                >
                  {category}
                </a>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickSearch;
