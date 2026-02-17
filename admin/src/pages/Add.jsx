import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [bestSeller, setBestSeller] = useState(false);
  const [discount, setDiscount] = useState('');
  const [reviews, setReviews] = useState('')
  const [rating, setRating] = useState('')

  const [categories, setCategories] = useState([]); // categories will be fetched from the API
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false); // Manage visibility of "Add Category" button
  const [categoryIdToRemove, setCategoryIdToRemove] = useState('');

  // Fetch categories from the API on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(backendUrl + '/api/category/all');
        if (response.data.success) {
          setCategories(response.data.categories);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error('Error fetching categories');
      }
    };
    fetchCategories();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('price', price);
      formData.append('bestSeller', bestSeller);
      formData.append('discount', discount);
      formData.append('rating', rating);
      formData.append('reviews', reviews);
      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const response = await axios.post(
        backendUrl + '/api/product/add',
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('');
        setDiscount('');
        setCategory('');
        setReviews('');
        setRating('');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Function to add a new category
  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      try {
        const response = await axios.post(
          backendUrl + '/api/category/add',
          { categoryName: newCategory.trim() },
          { headers: { token } }
        );

        if (response.data.success) {
          // Use the category object from the response
          setCategories([...categories, response.data.category]);
          setCategory(response.data.category.name); // Now this will work
          setNewCategory('');
          setShowModal(false);
          toast.success('Category added successfully');
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error('Error adding category');
      }
    } else {
      toast.error('Category name cannot be empty');
    }
  };

  // Function to remove a category
  const handleRemoveCategory = async () => {
    if (categoryIdToRemove.trim()) {
      try {
        const response = await axios.delete(
          `${backendUrl}/api/category/remove/${categoryIdToRemove}`,
          { headers: { token } }
        );

        if (response.data.success) {
          setCategories(categories.filter((cat) => cat._id !== categoryIdToRemove));
          setCategoryIdToRemove('');
          toast.success('Category removed successfully');
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error('Error removing category');
      }
    } else {
      toast.error('Please provide a valid category ID');
    }
  };

  return (
    <>
      {/* Modal for adding new category */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={handleAddCategory}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Save Category
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
        <div>
          <p className="mb-2">Upload Image</p>

          <div className="flex gap-2">
            <label htmlFor="image1">
              <img className="w-20" src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
              <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
            </label>
            <label htmlFor="image2">
              <img className="w-20" src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
              <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
            </label>
            <label htmlFor="image3">
              <img className="w-20" src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
              <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
            </label>
            <label htmlFor="image4">
              <img className="w-20" src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
              <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
            </label>
          </div>
        </div>

        <div className="w-full">
          <p className="mb-2">Product Name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full max-w-[500px] px-3 py-2"
            type="text"
            placeholder="Type Here"
            required
          />
        </div>

        <div className="w-full">
          <p className="mb-2">Product Description</p>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="w-full max-w-[500px] px-3 py-2"
            placeholder="Write Content here"
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
          <div>
            <p className="mb-2">Product Category</p>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="w-full px-3 py-2"
            >
              <option value="" disabled>Select a category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <p className="mb-2">Product Price</p>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="w-full px-3 py-2 sm:w-[120px]"
              type="number"
              placeholder="25"
            />
          </div>
          <div>
            <p className="mb-2">Discount (%)</p>
            <input
              onChange={(e) => setDiscount(e.target.value)}
              value={discount}
              className="w-full px-3 py-2 sm:w-[120px]"
              type="number"
              placeholder="0"
              min="0"
              max="100"
              step="0.1"
            />
          </div>
          <div>
            <p className="mb-2">Rating</p>
            <input
              onChange={(e) => {
                const value = Math.min(5, Math.max(0, e.target.value)); // Limit 0-5
                setRating(value || '');
              }}
              value={rating}
              className="w-full px-3 py-2 sm:w-[120px]"
              type="number"
              placeholder="0"
              min="0"
              max="5"
              step="0.1"
            />
            <p className="text-sm text-gray-500">(0-5 stars)</p>
          </div>

          <div>
            <p className="mb-2">Reviews</p>
            <input
              onChange={(e) => {
                const value = Math.max(0, parseInt(e.target.value) || 0); // Force integer
                setReviews(value);
              }}
              value={reviews}
              className="w-full px-3 py-2 sm:w-[120px]"
              type="number"
              placeholder="0"
              min="0"
            />
            <p className="text-sm text-gray-500">(Total reviews count)</p>
          </div>


      </div>

      <div className="flex gap-2 mt-2">
        <input onChange={(e) => setBestSeller((prev) => !prev)} checked={bestSeller} type="checkbox" id="bestSeller" />
        <label className="cursor-pointer" htmlFor="bestSeller">
          Add to bestseller
        </label>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-red-500 text-white rounded-2xl">
        ADD
      </button>
    </form >
      {/* Text link to toggle "Add Category" button */ }
      < div className = "w-full mt-4" >
        <p
          onClick={() => setShowAddCategory(!showAddCategory)}
          className="text-blue-500 cursor-pointer flex items-center gap-2"
        >
          Add Category
          <span>{showAddCategory ? '▲' : '▼'}</span>
        </p>
  {
    showAddCategory && (
      <>
        <button
          onClick={() => setShowModal(true)}
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Add New Category
        </button>

        <div className="mt-4">
          <p className="mb-2">Remove Category</p>
          <select
            onChange={(e) => setCategoryIdToRemove(e.target.value)}
            value={categoryIdToRemove}
            className="w-full px-3 py-2"
          >
            <option value="" disabled>Select a category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat._id}>{cat.name}</option>
            ))}
          </select>
          <button
            onClick={handleRemoveCategory}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Remove Category
          </button>
        </div>
      </>
    )
  }
      </div >
    </>
  );
};

export default Add;