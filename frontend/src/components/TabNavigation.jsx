import React from 'react';
import { NavLink } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const TabNavigation = () => {
  return (
    <div className="mb-8 space-y-4">
      {/* Warning Banner */}
      <div className="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 mb-4">
        <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0 text-yellow-600" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
          <span className="font-medium">Important:</span>
          <span className="text-sm">
            For any order-related enquiries, please reference your order number and contact our 
            <a href="mailto:info@ishyros.com" className="ml-1 text-yellow-800 underline hover:text-yellow-900">
              customer care team
            </a>.
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-2">
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md transition-colors duration-200 ${
              isActive 
                ? "bg-red-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`
          }
        >
          Component Orders
        </NavLink>
        <NavLink
          to="/kit-orders"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md transition-colors duration-200 ${
              isActive 
                ? "bg-red-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`
          }
        >
          Kit Orders
        </NavLink>
      </div>
    </div>
  );
};

export default TabNavigation;