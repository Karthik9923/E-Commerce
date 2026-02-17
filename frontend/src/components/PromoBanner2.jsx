import { Zap, ChevronRight, Box, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const KitPromoBanner = () => {
   const navigate = useNavigate();
 
   const handleShopNow = () => {
     navigate('/kit');
   };

  return (
    <div className="relative bg-gradient-to-br from-red-600 via-red-500 to-orange-500 rounded-xl overflow-hidden shadow-2xl">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-yellow-300/10 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Text Content */}
          <div className="flex-1 text-white relative z-10 text-center md:text-left">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full mb-4 md:mb-6 animate-fade-in-up">
              <Zap className="w-4 h-4 mr-2" fill="currentColor" />
              <span className="text-sm font-semibold">Custom Kits</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">
                Build Smart, Save More
              </span>
              <br />
              <span className="text-white">Exclusive<span className='text-yellow-400'> Deals </span>On Custom Bundles</span>
            </h2>
            
            <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-95 max-w-2xl mx-auto md:mx-0">
              Create your ideal component kit (7-20 items) and unlock exclusive benefits:
            </p>

            <div className="grid grid-cols-2 md:flex gap-4 mb-8 md:mb-10 max-w-md mx-auto md:mx-0">
              <div className="flex items-center bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                <Wrench className="w-5 h-5 mr-2 text-yellow-400" />
                <span className="text-sm">Expert Support</span>
              </div>
              <div className="flex items-center bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                <Box className="w-5 h-5 mr-2 text-yellow-400" />
                <span className="text-sm">Bulk Discounts</span>
              </div>
            </div>

            <button onClick={handleShopNow} className="inline-flex items-center px-8 py-4 bg-white text-red-600 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
              Start Building Now
              <ChevronRight className="w-5 h-5 ml-2 -mr-1" />
            </button>
          </div>

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
      </div>
    </div>
  );
};

export default KitPromoBanner;