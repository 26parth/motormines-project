// ✅ CartContext.jsx
// Ye file cart ka global state manage karti hai — items, add/remove, count etc.

import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  // 🟢 Jab user login kare tab uska cart database se fetch hoga
  useEffect(() => {
    if (!user) return setCartItems([]);
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:3000/cart", { withCredentials: true });
        if (res.data.success) setCartItems(res.data.cart.items);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    fetchCart();
  }, [user]);

  // 🟡 Add product to cart (backend me bhi save hota hai)
  const addToCart = async (product) => {
    try {
      console.log("🟡 Sending to backend:", product);
      const res = await axios.post(
        "http://localhost:3000/cart/add",
        {
          productId: product._id || product.id, // ✅ MongoDB ID ya static ID dono handle
          title: product.title,
          price: Number(String(product.price).replace(/[^0-9.]/g, "")), // ✅ "₹" remove
          img: product.img,
        },
        { withCredentials: true }
      );

      console.log("🟢 Add to cart response:", res.data);
      if (res.data.success) setCartItems(res.data.cart.items);
    } catch (err) {
      console.error("❌ Add to cart failed:", err.response?.data || err.message);
    }
  };

  // 🔴 Remove product from cart
  const removeFromCart = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/cart/remove/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) setCartItems(res.data.cart.items);
    } catch (err) {
      console.error("Remove failed:", err);
    }
  };

  // 🧮 Calculate total cart count (Flipkart-style live counter)
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        setCartItems,
        cartCount, // ✅ added for Navbar badge
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
