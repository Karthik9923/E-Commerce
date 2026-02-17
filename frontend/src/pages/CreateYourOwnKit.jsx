import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Zap,
  Search,
  Filter
} from "lucide-react";

const CreateYourOwnKit = () => {
  const { products, currency, navigate } = useContext(ShopContext);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showCheckoutDetails, setShowCheckoutDetails] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  // NEW: State to toggle the sticky summary bar visibility
  const [showSummary, setShowSummary] = useState(false);

  // Persist selected products in local storage if needed
  useEffect(() => {
    const storedSelected = localStorage.getItem("selectedKitProducts");
    if (storedSelected) {
      setSelectedProducts(JSON.parse(storedSelected));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedKitProducts", JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  // Toggle product selection
  const toggleProduct = (product) => {
    const isSelected = selectedProducts.find((item) => item._id === product._id);
    if (isSelected) {
      setSelectedProducts(selectedProducts.filter((item) => item._id !== product._id));
    } else {
      if (selectedProducts.length < 20) {
        setSelectedProducts([...selectedProducts, product]);
      } else {
        alert("You can only select up to 20 products for your kit.");
      }
    }
  };

  // Helper function to calculate effective price per product
  const computePrice = (product) => {
    const originalPrice = Number(product.price);
    const discountPercentage = Number(product.discount);
    return discountPercentage > 0
      ? originalPrice * (1 - discountPercentage / 100)
      : originalPrice;
  };

  // Calculate kit totals
  const kitTotal = selectedProducts.reduce((sum, product) => sum + computePrice(product), 0);
  const kitDiscount = kitTotal * 0.05;
  const kitFinalPrice = kitTotal - kitDiscount;

  const isValidKit = selectedProducts.length >= 7 && selectedProducts.length <= 20;
  const availableProducts = products.filter((product) => product.stock);
  const categories = ["All", ...new Set(availableProducts.map((product) => product.category))];

  // Group filtered products by category
  const filteredProducts = availableProducts
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "All" || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .reduce((acc, product) => {
      const category = product.category;
      if (!acc[category]) acc[category] = [];
      acc[category].push(product);
      return acc;
    }, {});

  const handleBuyKit = () => {
    if (!isValidKit) {
      alert("Please select between 7 and 20 products to create your kit.");
      return;
    }
    // Show confirmation modal before proceeding
    setShowConfirmation(true);
  };

  // Confirm and proceed to checkout
  const confirmCheckout = () => {
    setShowConfirmation(false);
    navigate("/kit-place-order", {
      state: { kit: selectedProducts, kitTotal, kitDiscount, kitFinalPrice },
    });
    // Optionally clear selections:
    localStorage.removeItem("selectedKitProducts");
  };

  return (
    <div className="py-16 px-4 min-h-screen relative">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-red-500 to-orange-400 text-white px-6 py-2 rounded-full text-sm font-medium mb-4 shadow-md">
            <Zap className="w-4 h-4 mr-2 fill-current" />
            Custom Kit Builder
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Build Your Own Kit</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Create your perfect bundle with <span className="text-red-600 font-semibold">7-20 components </span>
            and enjoy exclusive <span className="text-green-600 font-semibold">discounts</span> on your entire order.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <Search className="w-5 h-5 absolute left-4 top-3.5 text-gray-400" />
          </div>
          <div className="relative w-full sm:w-64">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full pl-12 pr-4 py-3 appearance-none border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
            <div className="absolute left-4 top-3.5 flex items-center">
              <Filter className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Products by Category */}
        <div className="space-y-12 mb-12">
          {Object.entries(filteredProducts).map(([category, products]) => (
            <section key={category}>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 px-2 border-l-4 border-red-500 pl-4">
                {category}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {products.map((product) => {
                  const isSelected = selectedProducts.some(item => item._id === product._id);
                  return (
                    <div
                      key={product._id}
                      onClick={() => toggleProduct(product)}
                      className={`group relative cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300 ${isSelected ? 'ring-2 ring-red-600 ring-offset-2' : 'hover:ring-1 hover:ring-gray-200'
                        }`}
                    >
                      <div className="relative aspect-square">
                        <ProductItem
                          id={product._id}
                          image={product.image}
                          name={product.name}
                          price={product.price}
                          description={product.description}
                          discount={product.discount}
                          reviews={product.reviews}
                          rating={product.rating}
                          stock={product.stock}
                          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                        />
                        {isSelected && (
                          <div className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full shadow-lg">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-gray-900 truncate">{product.name}</h4>
                        <div className="flex items-center mt-2">
                          <span className="text-red-600 font-semibold">
                            {currency}{computePrice(product).toFixed(2)}
                          </span>
                          {product.discount > 0 && (
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              {currency}{product.price}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Sticky Summary Bar (toggleable) */}
      {showSummary && (
        <div className="sticky bottom-6 bg-white border-t border-gray-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Selected Items</p>
                  <p className="text-xl font-bold text-red-600">
                    {selectedProducts.length}
                    <span className="text-gray-500 text-lg">/20</span>
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Total Value</p>
                  <p className="text-xl font-bold text-gray-900">
                    {currency}{kitTotal.toFixed(2)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Discount</p>
                  <p className="text-xl font-bold text-green-600">
                    -{currency}{kitDiscount.toFixed(2)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Final Price</p>
                  <p className="text-xl font-bold text-gray-900">
                    {currency}{kitFinalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {/* Dropdown toggle button for checkout details */}
                <button
                  onClick={() => setShowCheckoutDetails(!showCheckoutDetails)}
                  className="p-2 border border-gray-200 rounded-full focus:outline-none"
                  title={showCheckoutDetails ? "Hide details" : "Show details"}
                >
                  {showCheckoutDetails ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                {/* Proceed to Checkout button */}
                <button
                  disabled={!isValidKit}
                  onClick={handleBuyKit}
                  className={`w-full md:w-auto flex items-center justify-center px-8 py-3 rounded-xl font-semibold text-lg transition-all ${isValidKit
                      ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                >
                  Proceed to Checkout
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
            {!isValidKit && (
              <p className="text-center text-sm text-gray-500 mt-2 md:mt-0">
                Select 7-20 products to continue
              </p>
            )}
            {/* Additional checkout details dropdown */}
            {showCheckoutDetails && (
              <div className="mt-4 p-4 border border-gray-200 rounded bg-gray-50">
                <p className="font-semibold mb-2">Kit Summary:</p>
                {selectedProducts.length > 0 ? (
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {selectedProducts.map((prod, idx) => (
                      <li key={idx}>
                        {prod.name} x 1
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No items selected.</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {/* Button to toggle sticky summary bar */}
      <div className="fixed bottom-2 right-4 z-50">
        <button
          onClick={() => setShowSummary(!showSummary)}
          className="flex items-center space-x-2 px-2 py-2 bg-red-600 text-white rounded-full shadow-lg focus:outline-none transition-colors duration-300 hover:bg-red-700"
          title={showSummary ? "Hide Kit Summary" : "Show Kit Summary"}
        >
          {showSummary ? (
            <>
              <span className="flex items-center">Hide Summary</span>
              <ChevronDown className="w-5 h-5"/>
            </>
          ) : (
            <>
              <span className="text-sm font-medium">Kit Summary</span>
              <ChevronUp className="w-5 h-5" />
            </>
          )}
        </button>
      </div>


      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Checkout</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to proceed to checkout?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300"
              >
                No
              </button>
              <button
                onClick={confirmCheckout}
                className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateYourOwnKit;
