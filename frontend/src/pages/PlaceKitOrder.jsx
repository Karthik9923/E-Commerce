import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import Point from '../assets/Point.png';
import Title from '../components/Title';
import upi from '../assets/upi.jpg';

const PlaceKitOrder = () => {
  const { state } = useLocation();
  const { kit, kitTotal, kitDiscount, kitFinalPrice } = state;
  const { currency, navigate, backendUrl, token } = useContext(ShopContext);
  
  const [method, setMethod] = useState('cod');
  const [addressOption, setAddressOption] = useState('new');
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [saveAddress, setSaveAddress] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  // Fetch saved addresses
  useEffect(() => {
    axios.get(`${backendUrl}/api/user/addresses`, { headers: { token } })
      .then(response => {
        if (response.data.success) {
          setSavedAddresses(response.data.addresses);
        }
      })
      .catch(err => console.error(err));
  }, [backendUrl, token]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onAddressSelect = (event) => {
    const addressId = event.target.value;
    setSelectedAddressId(addressId);
    const address = savedAddresses.find(addr => addr._id === addressId);
    if (address) {
      setFormData({
        firstName: address.firstName,
        lastName: address.lastName,
        email: address.email,
        street: address.street,
        city: address.city,
        state: address.state,
        zipcode: address.zipcode,
        country: address.country,
        phone: address.phone,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save new address if requested
      if (addressOption === 'new' && saveAddress) {
        try {
          await axios.post(
            `${backendUrl}/api/user/address`,
            formData,
            { headers: { token } }
          );
        } catch (err) {
          console.error("Error saving address:", err);
        }
      }

      // Prepare order data
      const orderData = {
        address: formData,
        products: kit.map(product => ({
          _id: product._id,
          quantity: 1 // Default quantity for kit items
        })),
        totalAmount: kitTotal,
        discount: kitDiscount,
        finalAmount: kitFinalPrice,
        paymentMethod: method
      };

      // Submit kit order
      const response = await axios.post(
        `${backendUrl}/api/kit-orders`,
        orderData,
        {
          headers: { 
            token: token // Header name must match middleware expectation
          }
        }
      );

      if (response.data.success) {
        navigate(`/kit-orders`);
      }
    } catch (error) {
      console.error('Error placing kit order:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row justify-between gap-10 py-10 min-h-[80vh]"
    >
      {/* Delivery Information */}
      <div className="flex flex-col gap-6 w-full sm:max-w-[500px] bg-white shadow-xl rounded-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <img src={Point} alt="Icon" className="w-6 h-6" />
          <Title text1="Delivery" text2="Information" />
        </div>

        {/* Address Selection */}
        <div className="mb-6 flex space-x-4">
          <button
            type="button"
            onClick={() => setAddressOption('new')}
            className={`px-4 py-2 rounded-md transition duration-200 ${
              addressOption === 'new'
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            New Address
          </button>
          {savedAddresses.length > 0 && (
            <button
              type="button"
              onClick={() => setAddressOption('saved')}
              className={`px-4 py-2 rounded-md transition duration-200 ${
                addressOption === 'saved'
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Saved Addresses
            </button>
          )}
        </div>

        {/* Saved Addresses Dropdown */}
        {addressOption === 'saved' && (
          <div className="mb-6">
            <select
              value={selectedAddressId}
              onChange={onAddressSelect}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
              required
            >
              <option value="">Select an address</option>
              {savedAddresses.map((addr) => (
                <option key={addr._id} value={addr._id}>
                  {addr.street}, {addr.city}, {addr.state} - {addr.zipcode}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* New Address Form */}
        {addressOption === 'new' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                required
                onChange={onChangeHandler}
                name="firstName"
                value={formData.firstName}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
                type="text"
                placeholder="First Name"
              />
              <input
                required
                onChange={onChangeHandler}
                name="lastName"
                value={formData.lastName}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
                type="text"
                placeholder="Last Name"
              />
            </div>
            <input
              required
              onChange={onChangeHandler}
              name="email"
              value={formData.email}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
              type="email"
              placeholder="Email Address"
            />
            <input
              required
              onChange={onChangeHandler}
              name="street"
              value={formData.street}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
              type="text"
              placeholder="Street"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                required
                onChange={onChangeHandler}
                name="city"
                value={formData.city}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
                type="text"
                placeholder="City"
              />
              <input
                required
                onChange={onChangeHandler}
                name="state"
                value={formData.state}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
                type="text"
                placeholder="State"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                required
                onChange={onChangeHandler}
                name="zipcode"
                value={formData.zipcode}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
                type="text"
                placeholder="PIN"
              />
              <input
                required
                onChange={onChangeHandler}
                name="country"
                value={formData.country}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
                type="text"
                placeholder="Country"
              />
            </div>
            <input
              required
              onChange={onChangeHandler}
              name="phone"
              value={formData.phone}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
              type="text"
              placeholder="Phone"
            />
            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                checked={saveAddress}
                onChange={(e) => setSaveAddress(e.target.checked)}
                className="mr-2 h-5 w-5 text-red-500"
              />
              <span className="text-gray-700">Save this address</span>
            </div>
          </div>
        )}
      </div>

      {/* Kit Summary and Payment */}
      <div className="flex flex-col gap-8 w-full sm:max-w-[500px]">
        {/* Kit Summary */}
        <div className="bg-white shadow-xl rounded-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <img src={Point} alt="Icon" className="w-6 h-6" />
            <Title text1="Kit" text2="Summary" />
          </div>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Total Value</p>
              <p className="font-medium text-gray-800">
                {currency}{kitTotal.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between items-center text-green-600">
              <p className="text-gray-600">Kit Discount</p>
              <p className="font-medium">
                -{currency}{kitDiscount.toFixed(2)}
              </p>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between items-center mt-4">
              <b className="text-lg text-gray-700">Final Price</b>
              <b className="text-lg text-red-500">
                {currency}{kitFinalPrice.toFixed(2)}
              </b>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white shadow-xl rounded-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <img src={Point} alt="Icon" className="w-6 h-6" />
            <Title text1="Payment" text2="Methods" />
          </div>
          <div className="flex flex-col gap-4">
            {['cod'].map((option) => (
              <div
                key={option}
                onClick={() => setMethod(option)}
                className={`flex items-center gap-4 border rounded-full py-3 px-4 cursor-pointer transition duration-200 ${
                  method === option ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              >
                <div className={`w-4 h-4 rounded-full transition duration-200 ${
                  method === option ? 'bg-red-500' : 'border border-gray-400'
                }`}></div>
                <p className="text-sm text-gray-700">Cash on Delivery</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="w-full py-3 rounded-full text-white font-semibold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition"
            >
              PLACE KIT ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceKitOrder;