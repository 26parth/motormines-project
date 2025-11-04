import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, CreditCard } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";  // add this import
import toast from "react-hot-toast";

const MoreProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      title: "4-Inch Borewell Submersible Pump",
      img: "/images/4-Inch_Borewell_Submersibles_600x.webp",
      desc: "Powerful motor for deep water extraction.",
      price: "₹8,999",
    },
    {
      id: 2,
      title: "Agricultural Water Pump",
      img: "/images/Agricultural Pumps.jpg",
      desc: "Perfect for irrigation and heavy-duty use.",
      price: "₹12,499",
    },
    {
      id: 3,
      title: "Industrial Pump",
      img: "/images/Industrial Pumps.jpg",
      desc: "Built for factory-grade operations.",
      price: "₹15,990",
    },
    {
      id: 4,
      title: "Residential Openwell Pump",
      img: "/images/Residential Openwell.jpg",
      desc: "Efficient and durable home water solution.",
      price: "₹7,499",
    },
    {
      id: 5,
      title: "Pressure Booster Pump",
      img: "/images/Pressure Booster Pumps.jpg",
      desc: "Boosts water pressure for homes.",
      price: "₹6,999",
    },
    {
      id: 6,
      title: "Shallow Well Pump",
      img: "/images/shallow well Pumps.jpg",
      desc: "Compact pump for small water sources.",
      price: "₹5,799",
    },
    {
      id: 7,
      title: "DMBCMB High Flow Pump",
      img: "/images/DMBCMB.jpg",
      desc: "Delivers excellent water pressure.",
      price: "₹9,299",
    },
    {
      id: 8,
      title: "High Suction Capacity Pump",
      img: "/images/High Suction Capacity.jpg",
      desc: "Strong suction and long life span.",
      price: "₹8,499",
    },
  ];

  const { addToCart } = useContext(CartContext);

const handleAddToCart = (product) => {
  if (!user) {
    alert("Please login first!");
    navigate("/login");
    return;
  }
  addToCart(product); 
  toast.success(`${product.title} added to cart 🛒`);
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
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
          >
            <img src={item.img} alt={item.title} className="w-full h-36 object-cover" />
            <div className="p-3 flex flex-col justify-between flex-1 text-center">
              <div>
                <h3 className="text-base font-semibold text-gray-800">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </div>
              <div>
                <p className="text-blue-700 font-bold mt-2">{item.price}</p>
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
                      addToCart(item); // add that product to cart
                      navigate("/checkout"); // go straight to checkout
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
