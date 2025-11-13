import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, CreditCard } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import api from "../api/axiosInstance";  // ✅ import yaha


const MoreProduct = () => {
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

useEffect(() => {
  // axios.get("http://localhost:3000/api/admin/products") 
  api.get("/admin/products")   // ✅ auto token refresh enabled
    .then((res) => setProducts(res.data.products))
    .catch(() => console.log("Failed to fetch products"));
}, []);


  const handleAddToCart = (product) => {
    if (!user) {
      alert("Please login first!");
      navigate("/login");
      return;
    }
    addToCart(product);
    toast.success(`${product.name} added to cart 🛒`);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-center px-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center text-gray-800 mb-6"
      >
        Explore Our Pumps 💧
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {products.map((item) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
          >
            <img src={item.image} alt={item.name} className="w-full h-36 object-cover" />
            <div className="p-3 flex flex-col justify-between flex-1 text-center">
              <div>
                <h3 className="text-base font-semibold text-gray-800">{item.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{item.description}</p>
              </div>
              <div>
                <p className="text-blue-700 font-bold mt-2">₹{item.price}</p>
                <div className="flex justify-center gap-2 mt-3">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex items-center gap-1 text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                  >
                    <ShoppingCart size={14} /> Add
                  </button>
                  <button
                    onClick={() => {
                      if (!user) {
                        alert("Please login first!");
                        navigate("/login");
                        return;
                      }
                      addToCart(item);
                      navigate("/checkout");
                    }}
                    className="flex items-center gap-1 text-sm bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                  >
                    <CreditCard size={14} /> Buy
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MoreProduct;
