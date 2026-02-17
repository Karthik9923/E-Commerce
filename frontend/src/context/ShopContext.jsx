import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 20;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  // Sync the cart with the backend
  const syncCartWithBackend = async (tokenToUse) => {
    if (!tokenToUse) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { token: tokenToUse } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      } else {
        console.error("Error fetching cart:", response.data.message);
      }
    } catch (error) {
      console.error("Error syncing cart:", error);
    }
  };

  const addToCart = async (itemId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/add`,
        { itemId },
        { headers: { token } }
      );
      if (response.data.success) {
        await syncCartWithBackend(token); // Re-fetch the cart after adding
      } else {
        console.error("Error adding item:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Update cart for increasing, decreasing, or removing items
  const updateCart = async (itemId, quantity) => {
    const updatedCart = { ...cartItems };
    if (quantity > 0) {
      updatedCart[itemId] = quantity;
    } else {
      delete updatedCart[itemId];
    }
    setCartItems(updatedCart);

    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/update`,
        { itemId, quantity },
        { headers: { token } }
      );
      if (!response.data.success) {
        console.error("Error updating cart:", response.data.message);
      } else {
        await syncCartWithBackend(token); // Re-fetch the cart after updating
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  // Increase item quantity
  const increaseQuantity = (itemId) => {
    const currentQuantity = cartItems[itemId] || 0;
    updateCart(itemId, currentQuantity + 1);
  };

  // Decrease item quantity
  const decreaseQuantity = (itemId) => {
    const currentQuantity = cartItems[itemId] || 0;
    if (currentQuantity > 1) {
      updateCart(itemId, currentQuantity - 1);
    } else {
      // Remove item if quantity is 1
      updateCart(itemId, 0);
    }
  };

  // Remove item from cart
  const removeItemFromCart = (itemId) => {
    updateCart(itemId, 0); // Remove item by setting quantity to 0
  };

  // Get the total count of items in the cart
  const getCartCount = () => {
    return Object.values(cartItems).reduce((acc, quantity) => acc + quantity, 0);
  };

  // Get the total price of items in the cart
  const getTotalPrice = () => {
    return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
      const product = products.find(p => p._id === itemId);
      if (!product) return total;
  
      const discountPercent = product.discount || 0;
      const discountedUnitPrice = product.price * (1 - discountPercent / 100);
  
      return total + discountedUnitPrice * quantity;
    }, 0);
  };
  

  // Fetch products data from the backend
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch token from localStorage and sync cart on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      syncCartWithBackend(savedToken); // Sync cart if token exists
    }
  }, []);

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: newQuantity
    }));
  };

  // Fetch products data on component mount
  useEffect(() => {
    getProductsData();
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeItemFromCart,
    getCartCount,
    getTotalPrice,
    syncCartWithBackend,
    setCartItems,
    navigate,
    backendUrl,
    selectedCategory, 
    setSelectedCategory,
    setToken,
    token,
    updateQuantity
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
