import React from 'react';

const Header = () => {
  return (
    <div className="bg-gradient-to-r from-red-800 via-black to-red-800 bg-size-200% animate-shimmer relative overflow-hidden py-3 px-4">
      <div className="flex items-center justify-center space-x-4">
        {/* Left Firework */}
        <div className="animate-bounce">
          <span className="text-2xl">🎉</span>
        </div>
        
        {/* Animated Text */}
        <div className="flex items-center space-x-2">
          <p className="text-lg font-bold uppercase tracking-wide animate-pulse">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-600">
              Exclusive Deals
            </span>
          </p>
          <span className="text-white text-sm font-semibold transform -rotate-12 bg-red-600 px-2 py-1 rounded-lg shadow-lg">
            Upto 30% OFF
          </span>
        </div>

        {/* Right Firework */}
        <div className="animate-bounce delay-75">
          <span className="text-2xl">🎊</span>
        </div>
      </div>

      {/* Animated Border Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pan" />
    </div>
  );
};

export default Header;