import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

const EditProductForm = ({ product, onClose, onUpdate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState(0);
  const [reviews, setReviews] = useState('');
  const [rating, setRating] = useState('');
  const [category, setCategory] = useState('');
  const [bestSeller, setBestSeller] = useState(false);
  const [stock, setStock] = useState(true);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setDescription(product.description || '');
      setPrice(product.price || '');
      setDiscount(product.discount || 0);
      setReviews(product.reviews || '');
      setRating(product.rating || '');
      setCategory(product.category || '');
      setBestSeller(product.bestSeller || false);
      setStock(product.stock !== undefined ? product.stock : true);
    }

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/category/all`);
        if (response.data.success) {
          setCategories(response.data.categories);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error('Error fetching categories');
      }
    };
    fetchCategories();
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productId', product._id);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('discount', discount);
    formData.append('category', category);
    formData.append('bestSeller', bestSeller);
    formData.append('stock', stock);
    formData.append('rating', rating ? parseFloat(rating) : 0);
    formData.append('reviews', reviews ? parseInt(reviews, 10) : 0);
    if (image1) formData.append('image1', image1);
    if (image2) formData.append('image2', image2);
    if (image3) formData.append('image3', image3);
    if (image4) formData.append('image4', image4);

    try {
      const response = await axios.post(`${backendUrl}/api/product/update`, formData, {
        headers: { token: 'token' },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        onUpdate(response.data.product);
        onClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error updating product');
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-20 flex justify-center items-center overflow-auto">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-3xl w-full mx-4 sm:mx-0">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Product Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              required
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Product Description</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Price</label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                type="number"
                min="0"
                required
                className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Discount (%)</label>
              <input
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                type="number"
                min="0"
                max="100"
                className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Rating</label>
              <input
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                type="number"
                min="0"
                max="5"
                className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Reviews</label>
              <input
                onChange={(e) => setReviews(e.target.value)}
                value={reviews}
                type="number"
                className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Category</label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select a category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap gap-4">
            <input type="file" onChange={(e) => setImage1(e.target.files[0])} className="border p-2 rounded-lg w-full" />
            <input type="file" onChange={(e) => setImage2(e.target.files[0])} className="border p-2 rounded-lg w-full" />
            <input type="file" onChange={(e) => setImage3(e.target.files[0])} className="border p-2 rounded-lg w-full" />
            <input type="file" onChange={(e) => setImage4(e.target.files[0])} className="border p-2 rounded-lg w-full" />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              onChange={(e) => setBestSeller(e.target.checked)}
              checked={bestSeller}
              className="h-5 w-5 text-blue-600"
            />
            <label className="text-gray-600">Add to Bestseller</label>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-gray-600 font-medium">Stock Available</label>
            <input
              type="checkbox"
              onChange={(e) => setStock(e.target.checked)}
              checked={stock}
              className="h-5 w-5 text-blue-600"
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <button type="submit" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Update Product
            </button>
            <button onClick={onClose} className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;
