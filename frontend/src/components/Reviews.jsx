import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Vinay",
    rating: 5,
    comment:
      "I absolutely love this website! The products are top-notch and the service is outstanding.",
  },
  {
    id: 2,
    name: "Aarav",
    rating: 4,
    comment:
      "Good Quality Products and fast delivery. I recommend this site to all my friends!",
  },
  {
    id: 3,
    name: "Ashish Sharma",
    rating: 5,
    comment:
      "Highly satisfied with my purchase. Excellent quality and fantastic support.",
    photo: "https://via.placeholder.com/50",
  },
  // Add more reviews as needed
];

const Reviews = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 500,
    // Show 3 slides on large screens by default
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    responsive: [
      {
        // For screens less than 1280px, show 3 slides
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        // For screens less than 1024px, show 2 slides
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        // For screens less than 768px, show 1 slide
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 relative inline-block">
            <Quote className="absolute -left-10 top-0 w-8 h-8 text-red-500" />
            Customer Voices
            <Quote className="absolute -right-10 top-0 w-8 h-8 text-red-500" />
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Discover what others are saying about us
          </p>
        </div>

        <Slider {...settings}>
          {reviews.map((review) => (
            <div key={review.id} className="px-4">
              <div className="bg-white p-8 transition-shadow duration-300 rounded-lg shadow-lg relative">
                <div className="text-center pt-8">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                    {review.name}
                  </h3>
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={20}
                        fill={index < review.rating ? "#DC143C" : "transparent"}
                        className={`mr-1 ${
                          index < review.rating
                            ? "text-red-500 drop-shadow-sm"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6 relative px-4">
                    <Quote className="absolute -top-4 left-0 w-8 h-8 text-red-500 opacity-75" />
                    {review.comment}
                    <Quote className="absolute -bottom-4 right-0 w-8 h-8 text-red-500 opacity-75 transform rotate-180" />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Reviews;
