import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  const menuItems = [
    { path: '/add', label: 'Add Items', icon: assets.add_icon },
    { path: '/list', label: 'List Items', icon: assets.list },
    { path: '/orders', label: 'Orders', icon: assets.order_icon },
    { path: '/kit-orders', label: 'Kit Orders', icon: assets.box},
    { path: '/blog', label: 'Create Blog', icon: assets.blog}
  ];

  return (
    <div className="w-[18%] min-h-screen border-r-2 border-gray-300 bg-gray-50">
      <div className="flex flex-col gap-4 pt-6 pl-4">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-l-full transition-all duration-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${
                isActive ? 'bg-gray-200 text-gray-900 font-semibold' : ''
              }`
            }
          >
            <img className="w-5 h-5" src={item.icon} alt={item.label} />
            <p className="hidden md:block">{item.label}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;