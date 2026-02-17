import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import Point from '../assets/Point.png';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { products, currency, cartItems, removeItemFromCart, increaseQuantity, decreaseQuantity, updateQuantity  } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        tempData.push({
          _id: itemId,
          quantity: cartItems[itemId],
        });
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="pt-14 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6 pt-4">
          <img src={Point} alt="Cart Icon" className="w-6 h-6 sm:w-7 sm:h-7" />
          <Title text1={'Shopping'} text2={'Cart'} className="text-2xl sm:text-3xl" />
        </div>

        {cartData.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <h3 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-3">Your cart is empty</h3>
            <Link to="/collections" className="text-red-600 hover:text-red-700 font-medium">
              Continue Shopping →
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8 space-y-4">
              {cartData.map((item, index) => {
                const productData = products.find((product) => product._id === item._id);
                const discountPercent = productData?.discount || 0;
                const unitPrice = productData?.price || 0;
                const discountedUnitPrice = unitPrice * (1 - discountPercent / 100);
                const totalPrice = discountedUnitPrice * item.quantity;

                return (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col sm:flex-row sm:items-center sm:gap-4"
                  >
                    {/* Product Image & Info */}
                    <div className="flex items-center gap-4 w-full sm:w-1/2">
                      <img
                        src={productData?.image[0]}
                        alt={productData?.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg border border-gray-100"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">{productData?.name}</h3>
                        <p className="text-xs text-gray-500">SKU: {productData?._id.slice(-6)}</p>
                      </div>
                    </div>

                    {/* Price & Quantity (Stacked on Mobile) */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full sm:w-1/2 mt-3 sm:mt-0">
                      <p className="text-gray-700 font-medium text-sm sm:text-base mb-2 sm:mb-0">
                        {currency}{totalPrice.toFixed(2)}
                        <span className="text-gray-500 text-xs sm:text-sm ml-1">
                          {currency}{discountedUnitPrice.toFixed(2)} each
                        </span>
                      </p>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decreaseQuantity(item._id)}
                          className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 rounded-md flex items-center justify-center hover:bg-gray-200 transition"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => {
                            const value = e.target.value;
                            const newQuantity = parseInt(value, 10);

                            if (!isNaN(newQuantity)) {
                              const validatedQuantity = Math.max(newQuantity, 1);
                              updateQuantity(item._id, validatedQuantity);
                            }
                          }}
                          min="1"
                          className="w-10 sm:w-12 text-center border border-gray-200 rounded-md py-1"
                        />
                        <button
                          onClick={() => increaseQuantity(item._id)}
                          className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 rounded-md flex items-center justify-center hover:bg-gray-200 transition"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItemFromCart(item._id)}
                        className="text-gray-400 hover:text-red-600 transition mt-2 sm:mt-0 sm:ml-4"
                        aria-label="Remove item"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cart Total - Sticky on Desktop */}
            <div className="lg:col-span-4 mt-6 lg:mt-0">
              <div className="sticky top-24 bg-white p-5 sm:p-6 rounded-xl shadow-sm border border-gray-100">
                <CartTotal />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
