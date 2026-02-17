import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, cartItems, navigate } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setSelectedImage(product.image[0]);
      const recent = JSON.parse(localStorage.getItem("recentProducts")) || [];
      const updatedRecent = [productId, ...recent.filter(id => id !== productId)];
      localStorage.setItem("recentProducts", JSON.stringify(updatedRecent.slice(0, 10)));
    }
  }, [productId, products]);

  const itemInCart = cartItems[productId] || 0;

  const handleAddToCart = () => {
    if (!localStorage.getItem("token")) {
      toast.error("Please Login");
    } else {
      addToCart(productId);
      setIsAdded(true);
    }
  };

  const handleBuyNow = () => {
    if (!localStorage.getItem("token")) {
      toast.error("Please Login");
    } else {
      addToCart(productId);
      navigate('/cart');
    }
  };
  

  return productData ? (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="hidden sm:flex mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <a href="/" className="text-gray-500 hover:text-gray-700">
                Home
              </a>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li>
              <a href="/collections" className="text-gray-500 hover:text-gray-700">
                Products
              </a>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li className="text-gray-600 font-medium">{productData.name}</li>
          </ol>
        </nav>

        {/* Product Section */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Image Gallery */}
          <div className="flex flex-col-reverse sm:flex-row gap-4 mb-8 lg:mb-0">
            <div className="sm:w-1/4 flex sm:flex-col gap-3 overflow-x-auto pb-2">
              {productData.image.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`flex-shrink-0 w-20 h-20 sm:w-full sm:h-24 rounded-lg border-2 overflow-hidden transition-all ${
                    img === selectedImage ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-contain p-1"
                  />
                </button>
              ))}
            </div>
            <div className="relative sm:w-3/4 aspect-square bg-white rounded-xl overflow-hidden">
              <img
                src={selectedImage}
                alt="Main product"
                className="w-full h-full object-contain p-8 cursor-zoom-in hover:scale-105 transition-transform"
              />
              <span className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full text-sm text-gray-600 shadow-sm">
                Roll over image to zoom in
              </span>
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:pl-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{productData.name}</h1>

            <div className="mt-3 flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(4)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className="text-sm text-gray-500">25 ratings</span>
              <span className="text-gray-400">|</span>
              <span className="text-sm text-green-600 font-medium">In Stock</span>
            </div>

            <div className="mt-6">
              <p className="text-3xl font-bold text-gray-900">
                {currency}{(productData.price * (1 - productData.discount/100)).toFixed(2)}
              </p>
              <p className="mt-2 text-sm text-gray-500">Includes GST</p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  onTouchStart={handleAddToCart}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                    isAdded
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  {isAdded ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Added ({itemInCart})
                    </span>
                  ) : (
                    'Add to Cart'
                  )}
                </button>
                <button
                  onTouchStart={handleBuyNow}
                  onClick={handleBuyNow}
                  className="flex-1 py-3 px-6 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Buy Now
                </button>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">7-day easy returns</span>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900">Product details</h3>
              <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-gray-500">Category</dt>
                  <dd className="text-gray-900">{productData.category}</dd>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-gray-500">SKU</dt>
                  <dd className="text-gray-900">{productData._id.slice(-8)}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-12 border-b">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`py-4 px-1 border-b-2 font-medium ${activeTab === 'description'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-1 border-b-2 font-medium ${activeTab === 'reviews'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Reviews (10)
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-gray-600 leading-7">{productData.description}</p>
              <ul className="mt-6 space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  High-quality components with 2-year manufacturer warranty
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  CE Certified and RoHS Compliant
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Technical support available Monday-Friday
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Related Products */}
        <RelatedProducts category={productData.category} />
      </div>
    </div>
  ) : (
    <div className="text-center py-20">
      <p className="text-gray-500">Loading product details...</p>
    </div>
  );
};

export default Product;
