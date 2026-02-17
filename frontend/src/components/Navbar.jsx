import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import Cart from '../assets/Cart1.png'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
  const [visible, setVisible] = useState(false)
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }

  return (
    <div className='flex items-center justify-between py-10 ps-4 font-medium'>
      <Link to='/'>
        <img src={assets.logo} alt="" width={'150px'} />
      </Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700 font-semibold'>
        <NavLink
          to='/'
          className={({ isActive }) =>
            isActive
              ? 'flex flex-col items-center gap-1 text-red-500' // active styles
              : 'flex flex-col items-center gap-1'
          }
        >
          <p>HOME</p>
          <hr
            className={({ isActive }) =>
              `w-2/4 border-none h-[1.5px] ${isActive ? 'bg-red-500' : 'bg-gray-700'}`
            }
          />
        </NavLink>

        <NavLink
          to='/workshops'
          className={({ isActive }) =>
            isActive
              ? 'flex flex-col items-center gap-1 text-red-500' // active styles
              : 'flex flex-col items-center gap-1'
          }
        >
          <p>WORKSHOPS</p>
          <hr
            className={({ isActive }) =>
              `w-2/4 border-none h-[1.5px] ${isActive ? 'bg-red-500' : 'bg-gray-700'}`
            }
          />
        </NavLink>

        <NavLink
          to='/collections'
          className={({ isActive }) =>
            isActive
              ? 'flex flex-col items-center gap-1 text-red-500' // active styles
              : 'flex flex-col items-center gap-1'
          }
        >
          <p>COMPONENTS</p>
          <hr
            className={({ isActive }) =>
              `w-2/4 border-none h-[1.5px] ${isActive ? 'bg-red-500' : 'bg-gray-700'}`
            }
          />
        </NavLink>

        <NavLink
          to='/about'
          className={({ isActive }) =>
            isActive
              ? 'flex flex-col items-center gap-1 text-red-500' // active styles
              : 'flex flex-col items-center gap-1'
          }
        >
          <p>ABOUT</p>
          <hr
            className={({ isActive }) =>
              `w-2/4 border-none h-[1.5px] ${isActive ? 'bg-red-500' : 'bg-gray-700'}`
            }
          />
        </NavLink>

        <NavLink
          to='/contact'
          className={({ isActive }) =>
            isActive
              ? 'flex flex-col items-center gap-1 text-red-500' // active styles
              : 'flex flex-col items-center gap-1'
          }
        >
          <p>CONTACT</p>
          <hr
            className={({ isActive }) =>
              `w-2/4 border-none h-[1.5px] ${isActive ? 'bg-red-500' : 'bg-gray-700'}`
            }
          />
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        <img onClick={() => { setShowSearch(true); navigate('/collections'); }} src={assets.search_icon} alt="" className='w-5 cursor-pointer' />
        {/*----Drop Down -------  */}

        <div className="group relative z-30">
          <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} className="w-5 cursor-pointer" alt="" />
          {token && <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg z-50">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
              <p onClick={logout} className="cursor-pointer hover:text-black">Log Out</p>
            </div>
          </div>}
        </div>

        <Link to='/cart' className='relative'>
          <img src={Cart} alt="" className='w-6 min-w-5' />
          <p className='absolute right-[-6px] bottom-[-6px] w-4 text-center leading-4 bg-red-500 text-white aspect-square rounded-full text-[8px] hover:bg-red-600'>{getCartCount()}</p>
        </Link>
        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
      </div>

      {/* Side menu for small screens */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${visible ? 'visible' : 'invisible'}`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black transition-opacity ${visible ? 'opacity-50' : 'opacity-0'}`}
          onClick={() => setVisible(false)}
        />

        {/* Navigation Panel */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-full max-w-xs bg-white shadow-2xl transform transition-transform duration-300 ${visible ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-3">
                <img
                  src={assets.logo}
                  className="h-8 w-15"
                  alt="Ishyros Logo"
                />
              </div>
              <button
                onClick={() => setVisible(false)}
                className="text-gray-500 hover:text-red-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 overflow-y-auto p-4">
              <NavLink
                to='/'
                className={({ isActive }) =>
                  `flex items-center gap-3 p-4 rounded-lg mb-2 transition-colors ${isActive
                    ? 'bg-red-100 text-red-600 font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                  }`
                }
                onClick={() => setVisible(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </NavLink>

              <NavLink
                to='/collections'
                className={({ isActive }) =>
                  `flex items-center gap-3 p-4 rounded-lg mb-2 transition-colors ${isActive
                    ? 'bg-red-100 text-red-600 font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                  }`
                }
                onClick={() => setVisible(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Components
              </NavLink>

              <NavLink
                to='/kit'
                className={({ isActive }) =>
                  `flex items-center gap-3 p-4 rounded-lg mb-2 transition-colors ${isActive
                    ? 'bg-red-100 text-red-600 font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                  }`
                }
                onClick={() => setVisible(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Build Your Kit
              </NavLink>

              {/* Additional Navigation Items */}
              <div className="my-6 border-t" />

              <NavLink
                to='/support'
                className={({ isActive }) =>
                  `flex items-center gap-3 p-4 rounded-lg mb-2 transition-colors ${isActive
                    ? 'bg-red-100 text-red-600 font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                  }`
                }
                onClick={() => setVisible(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Support Center
              </NavLink>

              <NavLink
                to='/orders'
                className={({ isActive }) =>
                  `flex items-center gap-3 p-4 rounded-lg mb-2 transition-colors ${isActive
                    ? 'bg-red-100 text-red-600 font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                  }`
                }
                onClick={() => setVisible(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Track Order
              </NavLink>
              <NavLink
                to='/collections'
                className={({ isActive }) =>
                  `flex items-center gap-3 p-4 rounded-lg mb-2 transition-colors ${isActive
                    ? 'bg-red-100 text-red-600 font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                  }`
                }
                onClick={() => setVisible(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                New Arrivals
              </NavLink>

              <NavLink
                to='/blogs'
                className={({ isActive }) =>
                  `flex items-center gap-3 p-4 rounded-lg mb-2 transition-colors ${isActive
                    ? 'bg-red-100 text-red-600 font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                  }`
                }
                onClick={() => setVisible(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                Blogs
              </NavLink>

              <NavLink
                to='/tutorials'
                className={({ isActive }) =>
                  `flex items-center gap-3 p-4 rounded-lg mb-2 transition-colors ${isActive
                    ? 'bg-red-100 text-red-600 font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                  }`
                }
                onClick={() => setVisible(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Tutorials
              </NavLink>

              <NavLink
                to='/workshops'
                className={({ isActive }) =>
                  `flex items-center gap-3 p-4 rounded-lg mb-2 transition-colors ${isActive
                    ? 'bg-red-100 text-red-600 font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                  }`
                }
                onClick={() => setVisible(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Workshops
              </NavLink>

              <div className="my-4 border-t" />

              <NavLink
                to='/about'
                className={({ isActive }) =>
                  `flex items-center gap-3 p-4 rounded-lg mb-2 transition-colors ${isActive
                    ? 'bg-red-100 text-red-600 font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                  }`
                }
                onClick={() => setVisible(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                About Us
              </NavLink>

              <NavLink
                to='/careers'
                className={({ isActive }) =>
                  `flex items-center gap-3 p-4 rounded-lg mb-2 transition-colors ${isActive
                    ? 'bg-red-100 text-red-600 font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                  }`
                }
                onClick={() => setVisible(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Careers
              </NavLink>

              <NavLink
                to='/contact'
                className={({ isActive }) =>
                  `flex items-center gap-3 p-4 rounded-lg mb-2 transition-colors ${isActive
                    ? 'bg-red-100 text-red-600 font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                  }`
                }
                onClick={() => setVisible(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact
              </NavLink>

              <NavLink
                to='/enquiry'
                className={({ isActive }) =>
                  `flex items-center gap-3 p-4 rounded-lg mb-2 transition-colors ${isActive
                    ? 'bg-red-100 text-red-600 font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                  }`
                }
                onClick={() => setVisible(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Enquiry
              </NavLink>
            </nav>
            <div className="my-4 border-t"></div>

            {/* Logout Button */}
            <button
              className="flex items-center gap-3 p-4 rounded-lg mb-2 transition-colors 
             hover:bg-gray-100 text-gray-700 w-full text-left"
              onClick={() => {
                logout();
                setVisible(false);
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Log Out
            </button>

            {/* Footer Section */}
            <div className="p-6 border-t">
              <div className="mb-4 flex gap-4 justify-center">
                <a href="#" className="text-gray-500 hover:text-red-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-red-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-red-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
              <p className="text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Ishyros.com - All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Navbar
