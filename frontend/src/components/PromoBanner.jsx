import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const PromoBanner = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate('/collections');
  };

  return (
    <div className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-lg">
      {/* Tech-inspired background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-72 h-72 bg-red-500/20 rounded-full -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-64 h-64 bg-red-600/20 rounded-full -bottom-32 -right-32 animate-pulse delay-300"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0xMS41IDExLjVsMTcgMTdtLTE3IDBsMTcgLTE3IiBzdHJva2U9IiMzMzMzMzMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNhKSIgb3BhY2l0eT0iMC4xIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')] opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
          {/* Text Content */}
          <div className="text-center md:text-left space-y-6 transform transition-all duration-500 hover:scale-[1.02]">
            <div className="space-y-4">
              <span className="inline-block bg-red-500/20 px-4 py-1 rounded-full text-sm font-semibold tracking-wide animate-pulse">
                🚀 Flash Sale: Tech Bonanza!
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Unleash Next-Gen
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600">
                  Gadget Revolution
                </span>
              </h2>
            </div>
            <p className="text-lg sm:text-xl max-w-2xl opacity-90 leading-relaxed">
              Explore Our Latest Components with up to <span className="font-bold text-red-300">50% OFF</span><br />
            </p>
          </div>

          {/* Cyber-style Button */}
          <div className="group relative">
            <button
              onClick={handleShopNow}
              className="flex items-center space-x-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-600 hover:to-red-800 px-8 py-4 rounded-lg shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1 font-bold text-lg border-2 border-red-400/30"
            >
              <span>Explore More</span>
              <FiArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Animated Tech Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float text-red-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            {/* Circuit board icon */}
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2 4v16h20V4H2zm18 14H4V6h16v12zM8 8H6v4h2V8zm10 0h-2v4h2V8zm-5 0h-2v4h2V8z"/>
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoBanner;
