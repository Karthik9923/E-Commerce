import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import frame1 from "../assets/Carousel/1.png";
import frame2 from "../assets/Carousel/2.png";
import frame3 from "../assets/Carousel/3.jpg";
import frame4 from "../assets/Carousel/4.png";
import frame5 from "../assets/Carousel/5.png";

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open
  const carouselImages = [frame2, frame3, frame4, frame5, frame1];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index); // Toggle dropdown
  };

  return (
    <div className="flex flex-col items-center sm:flex-row px-4 sm:px-10 border-t-2 pt-5 relative">

      {/* Hero Left Side - Mobile Menu */}
      <div
        className={`w-full sm:w-1/3 flex-col items-start justify-center py-6 sm:py-0 px-4 sm:px-6 bg-white sm:bg-transparent fixed sm:static top-10 left-0 h-full sm:h-auto z-40 transition-transform transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
      >
        <div className="flex items-start">
          <div className="w-[2px] lg:w-[3px] bg-[#414141] h-auto mr-4"></div>
          <ul className="space-y-2 text-sm sm:text-base text-[#414141]">
            {/* Categories with dropdown */}
            <li className="relative group">
              <Link
                to="/blogs"
                className="hover:underline hover:text-red-500 hover:font-semibold"
              >
                Blogs
              </Link>
            </li>

            {/* Repeat for other dropdown items */}
            <li className="relative group">
              <Link
                to="/collections"
                className="hover:underline hover:text-red-500 hover:font-semibold"
              >
                New Arrivals
              </Link>
            </li>

            <li className="relative group">
              <Link
                to="/enquiry"
                className="hover:underline hover:text-red-500 hover:font-semibold"
              >
                Enquiry
              </Link>
            </li>

            <li className="relative group">
              <Link
                to="/career"
                className="hover:underline hover:text-red-500 hover:font-semibold"
              >
                Careers
              </Link>
            </li>

            <li className="relative group">
              <Link
                to="/categories/gaming"
                className="hover:underline hover:text-red-500 hover:font-semibold"
              >
                Iot Kits
              </Link>
            </li>

            <li className="relative group">
              <Link
                to="/kit"
                className="hover:underline hover:text-red-500 hover:font-semibold"
              >
                Build Your Own Kit
              </Link>
            </li>

            <li className="relative group">
              <div
                className="flex items-center cursor-pointer hover:underline hover:text-red-500 hover:font-semibold"
              >
                Tutorials
                <span className="ml-1 text-xl">›</span>
              </div>
              {/* Dropdown Menu */}
              <div
                className={`absolute left-0 sm:left-full top-8 sm:top-0 mt-1 ${
                  openDropdown === 6 ? "block" : "hidden"
                } sm:group-hover:block w-40 bg-white border border-gray-300 rounded-lg shadow-md z-50`} // Increased z-index
              >
                <ul className="space-y-1 p-2">
                  <li>
                    <Link
                      to="/tutorials/react"
                      className="block px-4 py-2 text-sm hover:bg-gray-200"
                    >
                      Quick Fixes
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/tutorials/node"
                      className="block px-4 py-2 text-sm hover:bg-gray-200"
                    >
                      Optimization
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Hero Right Side */}
      <div className="w-full sm:w-2/3">
        <Slider {...settings}>
          {carouselImages.map((image, index) => (
            <div key={index} className="flex justify-center">
              <img
                className="w-full sm:w-[90%] max-h-[400px] sm:max-h-[500px] object-contain sm:object-cover rounded-2xl"
                src={image}
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;