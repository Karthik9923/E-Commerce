import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders.reverse()); // Newest orders first
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const activeOrders = orders.filter(order => order.status !== "Delivered");
  const deliveredOrders = orders.filter(order => order.status === "Delivered");

  const renderOrders = (orderList) => (
    orderList.map((order, index) => (
      <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 pb-4 border-b border-gray-200">
          <div className="space-y-1">
            <p className="text-lg font-semibold text-gray-900">
              Order #{order._id}
            </p>
            <p className="text-sm text-gray-500">
              Placed on {new Date(order.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <div className="mt-3 sm:mt-0">
            <select 
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className={`block w-full sm:w-48 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm ${
                order.status === 'Delivered' 
                  ? 'border-green-500 focus:ring-green-500' 
                  : 'border-orange-500 focus:ring-orange-500'
              }`}
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase">Delivery Address</h3>
            <div className="text-sm text-gray-700">
              <p className="font-medium">{order.address.firstName} {order.address.lastName}</p>
              <p>{order.address.street}</p>
              <p>{order.address.city}, {order.address.state} {order.address.zipcode}</p>
              <p>{order.address.country}</p>
              <p className="mt-2">Phone: {order.address.phone}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase">Payment Information</h3>
            <div className="text-sm text-gray-700">
              <p>Method: {order.paymentMethod}</p>
              <p>Status: <span className={`font-medium ${order.payment ? 'text-green-600' : 'text-red-600'}`}>
                {order.payment ? 'Paid' : 'Pending'}
              </span></p>
              <p className="mt-2">Total Amount: {currency}{order.amount.toFixed(2)}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase">Items ({order.items.length})</h3>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <img 
                    src={item.image || assets.parcel_icon} 
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded border border-gray-200"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                    <p className="text-xs text-gray-500">{currency}{item.price.toFixed(2)} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Active Orders</h1>
      <div className="space-y-6">{renderOrders(activeOrders)}</div>

      {deliveredOrders.length > 0 && (
        <>
          <h1 className="text-3xl font-bold text-gray-900 mt-12 mb-8 border-b pb-4">Delivered Orders</h1>
          <div className="space-y-6">{renderOrders(deliveredOrders)}</div>
        </>
      )}
    </div>
  );
};

export default Orders;
