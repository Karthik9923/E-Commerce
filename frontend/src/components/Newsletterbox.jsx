import React from 'react';

const Newsletterbox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    // Add functionality for subscription here
  };

  return (
    <div className="text-center py-10 px-4 rounded-lg">
      <p className="text-2xl font-semibold text-gray-800">
        Subscribe Now And Get <span className="text-red-500">Exclusive</span> Deals
      </p>
      <p className="text-gray-500 mt-2">
        Stay updated with the latest products and special offers.
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-2/3 lg:w-1/2 flex items-center gap-3 mx-auto my-6 border border-gray-300 rounded-lg shadow-sm px-3 py-2 bg-white"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full flex-1 outline-none text-sm px-3 py-2 bg-transparent"
          required
        />
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-6 py-2 rounded-lg transition-all duration-200"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default Newsletterbox;
