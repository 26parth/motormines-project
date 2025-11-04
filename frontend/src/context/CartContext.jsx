import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  // 🧠 Load from localStorage per user
  useEffect(() => {
    if (!user) return setCartItems([]);
    const stored = localStorage.getItem(`cart_${user.email}`);
    if (stored) setCartItems(JSON.parse(stored));
  }, [user]);

  // 💾 Save cart whenever it updates
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  // ➕ Add to cart
  const addToCart = (product) => {
    if (!user) return alert("Please login first!");
    const existing = cartItems.find((item) => item.id === product.id);
    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // ❌ Remove from cart
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // 🔢 Total count
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
