import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axiosInstance";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (!user) return setCartItems([]);

    const fetchCart = async () => {
      try {
        const res = await api.get("/cart");
        if (res.data.success) setCartItems(res.data.cart.items);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    fetchCart();
  }, [user]);

  const addToCart = async (product) => {
    try {
      const body = {
        productId: product.productId || product._id || product.id,
        title: product.title || product.name,
        price: Number(String(product.price).replace(/[^0-9.]/g, "")),
        img: product.img || product.image,
      };
      const res = await api.post("/cart/add", body);
      if (res.data.success) setCartItems(res.data.cart.items);
    } catch (err) {
      console.error("Add to cart failed:", err.response?.data || err);
    }
  };

  const removeFromCart = async (id) => {
    try {
      const res = await api.delete(`/cart/remove/${id}`);
      if (res.data.success) setCartItems(res.data.cart.items);
    } catch (err) {
      console.error("Remove failed:", err);
    }
  };

  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, setCartItems, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
