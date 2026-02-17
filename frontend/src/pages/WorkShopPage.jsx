// WorkshopPage.js
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from 'react-toastify'
import { workshops } from "../assets/workshopData";

const WorkshopPage = () => {
  const { id } = useParams();
  const [numStudents, setNumStudents] = useState(0);
  const [kits, setKits] = useState(0);
  const [cost, setCost] = useState(0);

  // Find the workshop using the id from the URL params
  const workshop = workshops.find((w) => w.id === parseInt(id, 10));

  if (!workshop)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-700">Workshop not found</p>
      </div>
    );

  // Update the booking calculation based on number of students
  const handleStudentChange = (e) => {
    const students = parseInt(e.target.value, 10) || 0;
    const requiredKits = Math.ceil(students / 4);
    const totalCost = requiredKits * 2000;

    setNumStudents(students);
    setKits(requiredKits);
    setCost(totalCost);
  };

  // Handle form submission (you can add real logic here)
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('This Feature Not Enabled Yet!')
  };

  return (
    <div className="bg-gray-50 text-black p-8 max-w-4xl mx-auto">
      {/* Back link */}
      <div className="mb-4">
        <Link
          to="/workshops"
          className="text-red-600 hover:underline flex items-center"
        >
          &larr; Back to Workshops
        </Link>
      </div>

      {/* Workshop Header */}
      <div className="mb-8">
        <img
          src={workshop.image}
          alt={workshop.title}
          className="w-full h-90 object-cover rounded-md shadow-md"
        />
        <h1 className="text-3xl font-bold mt-4">{workshop.title}</h1>
        <p className="text-gray-600 mt-2">
          <span className="font-medium">Duration:</span> {workshop.duration}
        </p>
      </div>

      {/* Workshop Description */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">About the Workshop</h2>
        <p className="text-gray-700 font-semibold leading-relaxed">
          {workshop.shortDescription ||
            "No detailed description available for this workshop."}
        </p>
        <p className="text-gray-700 leading-relaxed">
          {workshop.fullDescription ||
            "No detailed description available for this workshop."}
        </p>
      </div>

      {/* Optional Video Section */}
      {workshop.videoUrl && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Workshop Preview</h2>
          <div className="relative" style={{ paddingTop: "56.25%" }}>
            <iframe
              title="Workshop Video"
              src={workshop.videoUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-md shadow-md"
            />
          </div>
        </div>
      )}

      {/* Booking Form */}
      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-xl border border-gray-200">
        {/* Kit Information */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6 shadow-md">
          <h3 className="text-lg font-semibold text-red-700 flex items-center gap-2">
            <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zM9 5a1 1 0 112 0v4a1 1 0 11-2 0V5zm1 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
            </svg>
            Important Kit Information
          </h3>
          <p className="text-gray-700 mt-1">
            🔹 <span className="font-bold">One kit is required for up to 4 students.</span> <br />
            🔹 The kit includes <span className="font-bold">all necessary components</span>, such as sensors, microcontrollers, motors, and tools. <br />
            🔹 Kits are reusable for multiple sessions.
          </p>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Book Your Workshop
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Number of Students Input */}
          <div>
            <label
              htmlFor="students"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Number of Students
            </label>
            <input
              type="number"
              id="students"
              value={numStudents}
              onChange={handleStudentChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-lg focus:outline-none focus:ring-4 focus:ring-red-500/50 transition-all"
              placeholder="Enter number of students"
              min="0"
            />
          </div>
          {/* Book Now Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold text-lg py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Book Now
          </button>
        </form>
      </div>


    </div>
  );
};

export default WorkshopPage;
