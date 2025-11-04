import React, { useEffect, useState, useContext } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // 🔹 Load cart when page opens or user changes
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const userKey = user.email;
    const storedCart = JSON.parse(localStorage.getItem(`cart_${userKey}`)) || [];
    setCartItems(storedCart);
  }, [user, navigate]);

  // 🔹 Update localStorage whenever cart changes
  const updateCartStorage = (updatedCart) => {
    const userKey = user.email;
    setCartItems(updatedCart);
    localStorage.setItem(`cart_${userKey}`, JSON.stringify(updatedCart));
  };

  // ➕ Increase quantity
  const increaseQty = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCartStorage(updated);
  };

  // ➖ Decrease quantity
  const decreaseQty = (id) => {
    const updated = cartItems
      .map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      )
      .filter((item) => item.quantity > 0);
    updateCartStorage(updated);
  };

  // ❌ Remove item
  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    updateCartStorage(updated);
  };

  // 🧾 Total price
  const totalPrice = cartItems.reduce((total, item) => {
    const price = parseInt(item.price.replace(/[₹,]/g, ""));
    return total + price * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        🛒 Your Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">
          Your cart is empty 😕
          <button
            onClick={() => navigate("/moreproduct")}
            className="block mt-4 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 mx-auto"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b border-gray-200 py-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-500">{item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-md">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="text-gray-700 hover:text-blue-600"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="text-gray-700 hover:text-blue-600"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}

          {/* 🧮 Total Section */}
          <div className="flex justify-between items-center mt-6">
            <h3 className="text-xl font-bold text-gray-800">
              Total: ₹{totalPrice.toLocaleString("en-IN")}
            </h3>
            <button
              onClick={() => navigate("/checkout")}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
            >
              Proceed to Checkout →
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
