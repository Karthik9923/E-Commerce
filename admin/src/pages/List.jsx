import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import EditProductForm from './EditProductForm';  // Importing the EditProductForm component

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [editProduct, setEditProduct] = useState(null);  // State to hold the product to be edited

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`, {
        headers: { token },
      });

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold mb-4 text-gray-700">All Products List</h1>

      {editProduct && (
        <EditProductForm
          product={editProduct}
          onClose={() => setEditProduct(null)}  // Close the edit form when done
          onUpdate={(updatedProduct) => {
            setList((prevList) =>
              prevList.map((item) => (item._id === updatedProduct._id ? updatedProduct : item))
            );
            setEditProduct(null);  // Close the form after updating
          }}
        />
      )}

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-4 bg-gray-100 text-gray-600 font-semibold text-sm border-b">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {list.length > 0 ? (
          list.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-all"
            >
              <img
                className="w-16 h-16 object-cover rounded-lg border"
                src={item.image[0]}
                alt={item.name}
              />
              <p className="font-medium text-gray-700 truncate">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.category}</p>
              <p className="font-semibold text-gray-800">
                {currency}
                {item.price}
              </p>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setEditProduct(item)}  // Set the selected product for editing
                  className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => removeProduct(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600 transition-all"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-6 text-center text-gray-500">
            No products available.
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
