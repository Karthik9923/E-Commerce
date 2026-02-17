import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for internal navigation
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div className="text-center sm:text-left">
          <img src={assets.logo} className="mb-5 w-32 mx-auto sm:mx-0" alt="Ishyros Logo" />
          <p className="w-full md:w-2/3 text-gray-400 mx-auto sm:mx-0">
            We are dedicated to advancing robotics education and technology, offering cutting-edge tools and resources to foster learning and innovation.
          </p>
        </div>
        <div className="text-center sm:text-left">
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-400">
            <li>
              <Link to="/" className="hover:cursor-pointer hover:text-gray-500">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:cursor-pointer hover:text-gray-500">About Us</Link>
            </li>
            <li>
              <Link to="/orders" className="hover:cursor-pointer hover:text-gray-500">Delivery</Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:cursor-pointer hover:text-gray-500">Privacy Policy</Link>
            </li>
          </ul>
        </div>
        <div className="text-center sm:text-left">
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-400">
            <li>+91 9313 903 870</li>
            <li>
              <a href="mailto:info@ishyros.com" className="hover:cursor-pointer hover:text-gray-500">
                info@ishyros.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">Copyright 2025@ishyros.com - All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
