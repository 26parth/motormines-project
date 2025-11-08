import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">🛒 Your Shopping Cart</h2>

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
            <div key={item._id} className="flex justify-between border-b py-4">
              <div className="flex gap-4">
                <img src={item.img} alt={item.title} className="w-20 h-20 rounded" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p>₹{item.price}</p>
                  <p>Qty: {item.quantity}</p>
                </div>
              </div>
              <button onClick={() => removeFromCart(item._id)} className="text-red-500">
                <Trash2 />
              </button>
            </div>
          ))}
          <div className="flex justify-between mt-6 font-bold">
            <h3>Total:</h3>
            <span>₹{total}</span>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="mt-6 w-full bg-green-600 text-white py-2 rounded"
          >
            Proceed to Checkout →
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
