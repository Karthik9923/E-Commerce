import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { Package, AlertCircle, ArrowRight } from 'lucide-react';
import TabNavigation from '../components/TabNavigation';
import Point from '../assets/Point.png';
import Title from '../components/Title';

const KitOrders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch kit orders on mount when token is available
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/kit-orders`, {
          headers: { token }
        });
        if (response.data.success) {
          // Reverse to show newest first
          setOrders(response.data.orders.reverse());
        } else {
          setError('Failed to load orders. Please try again later.');
        }
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || 'Network error. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchOrders();
  }, [backendUrl, token]);

  // Colors for status badges
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  // Skeleton for loading state
  const OrderSkeleton = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <div className="h-5 bg-gray-200 rounded w-48" />
        <div className="h-5 bg-gray-200 rounded w-24" />
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-56" />
        <div className="h-4 bg-gray-200 rounded w-40" />
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-10">
          <TabNavigation />
        </div>
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <OrderSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center p-8 border border-red-200 rounded-lg bg-red-50">
          <AlertCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
          <h3 className="text-lg font-medium text-red-800 mb-2">Unable to load orders</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Tab Navigation */}
      <TabNavigation />

      {/* Page Header */}
      <div className="mb-10 border-b pb-6">
        <div className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-gray-900 mb-3 animate-fadeIn">
          <img src={Point} alt="Kit Icon" className="w-6 h-6 md:w-8 md:h-8" />
          <Title text1="My" text2="Kit Orders" />
        </div>
        <p className="mt-2 text-sm text-gray-600">
          View your kit orders' history and details
        </p>
      </div>

      {/* No Orders Found */}
      {orders.length === 0 ? (
        <div className="text-center py-20">
          <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No kit orders found</h3>
          <p className="text-gray-600 mb-6">
            You haven't placed any custom kit orders yet.
          </p>
          <Link
            to="/create-kit"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            Create New Kit
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      ) : (
        // Orders List
        <div className="space-y-6">
          {orders.map(order => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Order Header */}
              <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold">Order Placed</span>
                    <span className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold">Total :</span>
                    <span className="text-sm text-green-600 font-mono font-bold">
                      {currency}{order.finalAmount.toFixed(2)}
                    </span>
                  </div>
                  {/* You can add more fields here if needed */}
                </div>
                <div className="space-y-2 mt-4 md:mt-0 text-right">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold">Order #</span>
                    <span className="px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-200">
                      {order._id}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold">Status</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status.toLowerCase()]}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Body */}
              <div className="p-6">
                <div className="text-sm text-gray-600">
                  <p className="mb-2 font-semibold">Kit Summary:</p>
                  {order.products && order.products.length > 0 ? (
                    <div>
                      {order.products.map((productItem, idx) => (
                        <p key={idx}>
                          {productItem.product.name} x {productItem.quantity}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p>No items found in kit.</p>
                  )}
                </div>
                <div className="text-sm text-gray-600 mt-4">
                  <p>
                    {/* Example: "Your custom kit includes X components." */}
                    Total Components: {order.products?.length || 0}
                  </p>
                </div>
              </div>

              {/* Order Actions */}
              <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end">
                <Link
                  to={`/kit-orders/${order._id}`}
                  className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-800"
                >
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KitOrders;
