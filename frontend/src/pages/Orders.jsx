import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { Clock, Package, CheckCircle, Truck, CreditCard, Calendar, MapPin, Info } from 'lucide-react';
import Point from '../assets/Point.png';
import TabNavigation from '../components/TabNavigation';


const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrderData = async () => {
    try {
      if (!token) return;
      setLoading(true);
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });

      if (response.data.success) {
        const processedOrders = response.data.orders
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map(order => {
            const deliveryDateObj = new Date(order.date);
            deliveryDateObj.setDate(deliveryDateObj.getDate() + 4);
            
            return {
              ...order,
              formattedDate: new Date(order.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric"
              }),
              deliveryDate: deliveryDateObj.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric"
              })
            };
          });
        setOrderData(processedOrders);
      }
      
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const statusConfig = {
    pending: { color: 'bg-yellow-100 text-yellow-800', icon: <Clock size={16} /> },
    packing: { color: 'bg-blue-100 text-blue-800', icon: <Package size={16} /> },
    shipped: { color: 'bg-purple-100 text-purple-800', icon: <Truck size={16} /> },
    delivered: { color: 'bg-green-100 text-green-800', icon: <CheckCircle size={16} /> },
    cancelled: { color: 'bg-red-100 text-red-800', icon: <Info size={16} /> }
  };

  const OrderSkeleton = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 animate-pulse">
      <div className="p-6 border-b border-gray-200">
        <div className="h-4 bg-gray-200 rounded w-48 mb-4"></div>
        <div className="h-3 bg-gray-200 rounded w-64"></div>
      </div>
      <div className="p-6">
        <div className="flex gap-6">
          <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
          <div className="flex-1 space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            <div className="h-3 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <div className="h-8 bg-gray-200 rounded w-48 mb-12"></div>
          {[1, 2, 3].map((i) => <OrderSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  if (!orderData.length) {
    return (
      <div className="bg-gray-50 min-h-screen p-8">
        <TabNavigation />
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-gray-800 mb-3 animate-fadeIn pb-10">
            <img src={Point} alt="Sale Icon" className="w-6 h-6 md:w-8 md:h-8" />
            <Title text1={"My"} text2={"Orders"} />
          </div>
          <p className="mt-2 text-sm text-gray-600">
            View your custom kit order history and details
          </p>  
          <div className="bg-white rounded-lg shadow-sm p-12 max-w-md mx-auto">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500 mb-6">Your order history will appear here once you make purchases.</p>
            <a
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" min-h-screen p-8">
      <TabNavigation />
      <div className="mb-10 border-b pb-6">
        <div className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-gray-900 mb-3 animate-fadeIn">
          <img src={Point} alt="Kit Icon" className="w-6 h-6 md:w-8 md:h-8" />
          <Title text1="My" text2=" Orders" />
        </div>
        <p className="mt-2 text-sm text-gray-600">
          View your orders' history and details
        </p>
      </div>
      

        <div className="space-y-6">
          {orderData.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Order Header */}
              <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold">Order Placed</span>
                    <span className="text-sm text-gray-500">{order.formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold">Total</span>
                    <span className="text-sm text-gray-900 font-medium">
                      {currency}
                      {order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold">Ship to</span>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin size={16} className="text-gray-400" />
                      {order.address.firstName} {order.address.lastName}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold">Order #</span>
                    <span className="px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-200">{order._id}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold">Payment Method</span>
                    <div className="flex items-center gap-1">
                      <CreditCard size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {order.paymentMethod === 'COD' ? 'Cash on Delivery' : order.paymentMethod}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                {order.items.map((item) => (
                  <div key={item._id} className="flex gap-6 mb-6 last:mb-0">
                    <img
                      className="w-32 h-32 object-contain rounded-lg border border-gray-200 bg-gray-50"
                      src={item.image[0]}
                      alt={item.name}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">{item.name}</h3>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <span className="text-lg font-semibold text-gray-900">
                          {currency}
                          {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      {/* Status Indicator */}
                      <div className="mt-4 flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-sm ${statusConfig[order.status.toLowerCase()]?.color || 'bg-gray-100 text-gray-800'
                            }`}>
                            {order.status}
                          </span>
                          {order.status === 'shipped' && (
                            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-2">
                              <Truck size={16} />
                              Track Package
                            </button>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.status === 'delivered' ? 'Delivered' : 'Expected'} by {order.deliveryDate}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Actions */}
              <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                <div className="flex gap-4 justify-end">
                  <button className="text-sm font-medium text-gray-700 hover:text-gray-900 px-4 py-2 border border-gray-300 rounded-md">
                    View Invoice
                  </button>
                  <button className="text-sm font-medium text-gray-700 hover:text-gray-900 px-4 py-2 border border-gray-300 rounded-md">
                    Buy Again
                  </button>
                  {order.status === 'Delivered' && (
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700 px-4 py-2 border border-blue-200 rounded-md">
                      Return Item
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default Orders;