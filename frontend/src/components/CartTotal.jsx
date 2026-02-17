import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import Point from '../assets/Point.png';

const CartTotal = () => {
  const { currency, delivery_fee, getTotalPrice, navigate } = useContext(ShopContext);

  return (
    <div className="w-full bg-white p-8 rounded-xl ">
      {/* Title Section */}
      <div className="py-6 text-center">
        <div className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-6">
          <img src={Point} alt="Cart Point Icon" className="w-6 h-6" />
          <Title text1="Cart" text2="Total"  />
        </div>
      </div>

      {/* Cart Details */}
      <div className="flex flex-col gap-6 mt-4 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between items-center text-gray-700">
          <p className='font-semibold'>Subtotal</p>
          <p className="font-semibold">{currency}{getTotalPrice().toFixed(2)}</p>
        </div>
        <hr className="border-gray-300" />

        {/* Shipping Fee */}
        <div className="flex justify-between items-center text-gray-700">
          <p className="font-semibold">Utility Charges</p>
          <p className="font-semibold">{currency}{delivery_fee.toFixed(2)}</p>
        </div>
        <hr className="border-gray-300" />

        {/* Total */}
        <div className="flex justify-between items-center text-lg font-semibold text-gray-800 mt-4">
          <b>Total</b>
          <b className="text-red-600">
            {currency}
            {getTotalPrice() === 0 ? '0.00' : (getTotalPrice() + delivery_fee).toFixed(2)}
          </b>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="mt-6">
        <button
          className="w-full bg-red-500 text-white py-3 rounded-lg shadow-md text-sm font-medium hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1"
          onClick={() => navigate('/place-order')}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartTotal;
