import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

// Component for each kit order card
const KitOrderCard = ({ order, currency, statusHandler }) => {
  const [showItems, setShowItems] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-center border-b pb-4 mb-4">
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-gray-900">
            Kit Order #{order._id}
          </p>
          <p className="text-sm text-gray-500">
            Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-sm font-medium text-gray-700">
            Final Price:{' '}
            <span className="text-xl font-bold text-green-600">
              {currency}{order.finalAmount.toFixed(2)}
            </span>
          </p>
          <div>
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
          <button
            onClick={() => setShowItems(!showItems)}
            className="text-gray-600 focus:outline-none"
            title={showItems ? 'Hide Kit Items' : 'Show Kit Items'}
          >
            {showItems ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        {/* Delivery Address */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-800 uppercase">Delivery Address</h3>
          <p className="text-sm text-gray-700">
            {order.address.firstName} {order.address.lastName}
            <br />
            {order.address.street}
            <br />
            {order.address.city}, {order.address.state} {order.address.zipcode}
            <br />
            {order.address.country}
            <br />
            <span className="mt-1 block">Phone: {order.address.phone}</span>
          </p>
        </div>

        {/* Payment Information */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-800 uppercase">Payment Information</h3>
          <p className="text-sm text-gray-700">
            Method: {order.paymentMethod}
            <br />
            Total Value: {currency}{order.totalAmount.toFixed(2)}
            <br />
            Discount: {currency}{order.discount.toFixed(2)}
            <br />
            <span className="font-bold">Final Price: {currency}{order.finalAmount.toFixed(2)}</span>
          </p>
        </div>
      </div>

      {/* Toggleable Kit Items List */}
      {showItems && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-800 uppercase mb-2">
            Kit Items ({order.products.length})
          </h3>
          <div className="space-y-3">
            {order.products.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-4 p-2 border rounded">
                <img
                  src={item.product.image || assets.parcel_icon}
                  alt={item.product.name}
                  className="w-12 h-12 object-cover rounded border border-gray-200"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.product.name}</p>
                  <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                  <p className="text-xs text-gray-500">
                    {currency}{item.product.price.toFixed(2)} each
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const KitOrdersAdmin = ({ token }) => {
  const [kitOrders, setKitOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchKitOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.get(`${backendUrl}/api/kit-orders/kit-all`, {
        headers: { token }
      });
      if (response.data.success) {
        // Reverse orders to show newest first
        setKitOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update the order status
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/kit-orders/status`,
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        fetchKitOrders();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchKitOrders();
  }, [token]);

  // Filter kit orders by status
  const activeKitOrders = kitOrders.filter(
    order => order.status.toLowerCase() !== "delivered"
  );
  const deliveredKitOrders = kitOrders.filter(
    order => order.status.toLowerCase() === "delivered"
  );

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">
        Active Kit Orders
      </h1>
      {activeKitOrders.length > 0 ? (
        activeKitOrders.map(order => (
          <KitOrderCard
            key={order._id}
            order={order}
            currency={currency}
            statusHandler={statusHandler}
          />
        ))
      ) : (
        <p className="text-center text-gray-600">No active kit orders found.</p>
      )}

      {deliveredKitOrders.length > 0 && (
        <>
          <h1 className="text-3xl font-bold text-gray-900 mt-12 mb-8 border-b pb-4">
            Delivered Kit Orders
          </h1>
          {deliveredKitOrders.map(order => (
            <KitOrderCard
              key={order._id}
              order={order}
              currency={currency}
              statusHandler={statusHandler}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default KitOrdersAdmin;
