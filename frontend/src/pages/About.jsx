import React from 'react';
import Title from '../components/Title';
import { FiDownloadCloud, FiAward, FiShield, FiHeadphones } from 'react-icons/fi';
import axios from 'axios';
import image from '../assets/about.jpg';
import Newsletterbox from '../components/Newsletterbox';

const About = () => {
  const downloadWithAxios = async (url, filename) => {
    try {
      const response = await axios.get(url, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div className="px-4 md:px-10 lg:px-20 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative text-center py-20 border-t border-b bg-gray-50">
        <div className="absolute left-1/2 -translate-x-1/2 top-8 w-28 h-1 bg-gradient-to-r from-red-600 to-orange-500 rounded-full"></div>
        <h2 className="text-5xl font-extrabold text-gray-900 tracking-wide mb-4">
          About <span className="text-red-600">Us</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Pioneering the future of <span className="text-red-600 font-semibold">robotics education</span> through
          <span className="text-orange-600 font-semibold"> innovation</span> and hands-on learning experiences.
        </p>
      </section>

      {/* Main Content Section */}
      <section className="py-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative group">
          <img
            className="w-full rounded-xl shadow-xl transform group-hover:scale-105 transition-transform duration-300"
            src={image}
            alt="Robotics workshop"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent rounded-xl"></div>
        </div>

        <div className="space-y-8">
          <h3 className="text-2xl font-semibold text-gray-800">Bridging the Gap in Robotics Education</h3>
          <p className="text-gray-600 leading-relaxed">
            With a decade of experience in academic workshops, we've developed cutting-edge programs that address
            the industry's evolving needs. Our hands-on approach equips students with practical skills for
            tomorrow's technological challenges.
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Why Choose Ishyros?</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[{
            icon: <FiShield size={32} className="text-red-600" />,
            title: "Quality Assurance",
            text: "ISO 9001-certified components with 18-month warranty"
          },
          {
            icon: <FiHeadphones size={32} className="text-red-600" />,
            title: "Expert Support",
            text: "24/7 technical support and dedicated account managers"
          },
          {
            icon: <FiAward size={32} className="text-red-600" />,
            title: "Proven Track Record",
            text: "Trusted by 50+ educational institutions across Asia"
          }].map((item, index) => (
            <div key={index} className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 mb-6 bg-red-50 rounded-xl flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-red-600">{item.title}</h3>
              <p className="text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Downloads Section */}
      <section className="py-16">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-red-600">Resources</h3>
          <p className="text-gray-600 max-w-xl mx-auto">
            Access our comprehensive educational materials and technical specifications
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          {[{
            label: "Download Brochure",
            file: "Ishyros_Brochure.pdf",
            icon: <FiDownloadCloud className="mr-2 text-red-600" />
          },
          {
            label: "Download Poster",
            file: "drone_poster.pdf",
            icon: <FiDownloadCloud className="mr-2 text-red-600" />
          }].map((item, index) => (
            <button
              key={index}
              onClick={() => downloadWithAxios(`/Files/${item.file}`, item.file)}
              className="flex items-center px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <Newsletterbox />
      </section>
    </div>
  );
};

export default About;
