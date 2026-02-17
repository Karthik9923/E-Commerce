import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { Loader2, Package, Calendar, CreditCard, MapPin, AlertCircle, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const KitOrderDetails = () => {
  const { id } = useParams();
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/kit-orders/${id}`, {
          headers: { token }
        });
        setOrder(response.data.order);
      } catch (error) {
        setError(error.response?.data?.error || 'Failed to load order details');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id, token, backendUrl]);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-lg" />
              ))}
            </div>
            <div className="space-y-6">
              <div className="h-48 bg-gray-200 rounded-lg" />
              <div className="h-48 bg-gray-200 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center p-8 border border-red-200 rounded-lg bg-red-50">
          <AlertCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
          <h3 className="text-lg font-medium text-red-800 mb-2">Unable to load order</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <Link
            to="/kit-orders"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link
          to="/kit-orders"
          className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Orders
        </Link>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Order Details</h1>
          <p className="mt-2 text-sm text-gray-600">Order ID: {order._id}</p>
        </div>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
          {order.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Products List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold flex items-center">
                <Package className="w-5 h-5 mr-2 text-gray-600" />
                {order.products.length} Items in Kit
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {order.products.map((item) => (
                <div key={item.product._id} className="flex items-center p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">Qty: {item.quantity}</p>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="font-medium text-gray-900">
                      {currency}{item.product.price.toFixed(2)}
                    </p>
                    {item.product.discount > 0 && (
                      <p className="text-sm text-gray-500 line-through">
                        {currency}{(item.product.price / (1 - item.product.discount/100)).toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-gray-600" />
              Payment Details
            </h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-600">Subtotal</dt>
                <dd className="text-gray-900">{currency}{order.totalAmount.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between text-green-600">
                <dt>Discount</dt>
                <dd>-{currency}{order.discount.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-200">
                <dt className="font-medium text-gray-900">Total</dt>
                <dd className="font-medium text-gray-900">
                  {currency}{order.finalAmount.toFixed(2)}
                </dd>
              </div>
            </dl>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-gray-600" />
              Shipping Address
            </h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p>{order.address.street}</p>
              <p>{order.address.city}, {order.address.state}</p>
              <p>{order.address.country} - {order.address.zipcode}</p>
              <p className="mt-2">Phone: {order.address.phone}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-gray-600" />
              Order Timeline
            </h2>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                Ordered on {new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitOrderDetails;