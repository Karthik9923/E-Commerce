// WorkshopsGallery.js
import React from "react";
import { Link } from "react-router-dom";
import { workshops } from "../assets/workshopData";

const WorkshopsGallery = () => {
  return (
    <div className="bg-white text-black p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
        Available Workshops
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {workshops.map((workshop) => (
          <div
            key={workshop.id}
            className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            {/* Image container with fixed height and flex centering */}
            <div className="w-full h-60 sm:h-80 flex justify-center items-center bg-gray-100">
              <img
                src={workshop.image}
                alt={workshop.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
              <h3 className="text-lg sm:text-xl font-bold mb-2">
                {workshop.title}
              </h3>
              <p className="text-xs sm:text-sm line-clamp-2 mb-4">
                {workshop.shortDescription}
              </p>
              <Link
                to={`/workshops/${workshop.id}`}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-3 sm:py-2 sm:px-4 rounded-md transition-colors text-xs sm:text-sm"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkshopsGallery;
