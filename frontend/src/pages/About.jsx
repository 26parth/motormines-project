import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const About = () => {
  const navigate = useNavigate();
  const [features, setFeatures] = useState([]);
  const [products, setProducts] = useState([]); // ✅ Added

  // fetch features (already working)
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/admin/features")
      .then((res) => setFeatures(res.data.features))
      .catch(() => console.log("Error fetching features"));
  }, []);

  // ✅ fetch products
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products")
      .then((res) => setProducts(res.data.products))
      .catch(() => console.log("Error fetching products"));
  }, []);

  return (
    <>
      <div className="bg-white py-4 px-4 sm:px-6 lg:px-8">
        {/* ======= WHY CHOOSE SECTION ======= */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 rounded-md shadow-md py-3">
            Why Choose MotorMines Submersible Pumps
          </h2>

          <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-16">
            {features.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center text-center cursor-pointer group transition-transform duration-300 hover:scale-105"
              >
                <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center rounded-full bg-blue-50 shadow-md group-hover:bg-blue-100 transition">
                  <img
                    src={item.image} // ✅ changed from item.img → item.image
                    alt={item.title}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-800 group-hover:text-blue-600">
                  {item.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ======= PRODUCT BOX SECTION ======= */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 mt-32">
            Our Featured Pump Categories
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.7 }}
                viewport={{ once: true }}
                className="bg-white shadow-lg rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5 text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{product.desc}</p>

                  <Link
                    to="/moreproduct"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    MoreProduct
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default About;
