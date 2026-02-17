import React, { useContext } from 'react';
import Title from '../components/Title';
import Point from '../assets/Point.png';
import { assets } from '../assets/assets';
import contact from '../assets/contact.jpg'
import { ShopContext } from '../context/ShopContext';
import Newsletterbox from '../components/Newsletterbox';

const Contact = () => {
  
  const {navigate } = useContext(ShopContext)
  
  return (
    <div className="px-4 md:px-10 lg:px-20">
      {/* Section: Contact Us Header */}
      <div className="text-center pt-8 border-t">
        <div className="flex items-center justify-center gap-2 text-3xl text-gray-700 mb-6">
          <img src={Point} alt="Icon" className="w-5 h-5" />
          <Title text1="CONTACT" text2="US" />
        </div>
      </div>

      {/* Section: Contact Details */}
      <div className="my-16 flex flex-col md:flex-row gap-16 items-center mb-20">
        <img
          className="w-full md:max-w-[450px] rounded-md shadow-lg"
          src={contact}
          alt="Contact Us"
        />
        <div className="flex flex-col gap-8 text-gray-600 md:w-2/4">
          <div>
            <p className="font-semibold text-xl text-gray-800 mb-3">Our Store</p>
            <p className="leading-relaxed">
              Plot 35 Harpatiwas, Sarthana Gamtar
              <br />
              Surat 395013, Gujarat, India
            </p>
          </div>
          <div>
            <p className="leading-relaxed">
              <span className="font-semibold">Phone:</span> +91 9313 903 870
              <br />
              <span className="font-semibold">Email:</span> info@ishyros.com
            </p>
          </div>
          <div>
            <p className="font-semibold text-xl text-gray-800 mb-3">Career At Ishyros</p>
            <p className="leading-relaxed">
              Explore opportunities to grow with us and learn more about how you can contribute to our mission.
            </p>
          </div>
          <button onClick={() => navigate('/career')} className="self-start px-6 py-3 bg-red-500 text-white text-sm font-medium rounded-md shadow hover:bg-red-600 transition duration-300">
            Explore Jobs
          </button>
        </div>
      </div>
      <Newsletterbox />
    </div>
  );
};

export default Contact;
