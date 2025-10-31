/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 


const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Wide Voltage Design",
      img: "/images/wide voltage design.jpg",
      path: "/voltage",
    },
    {
      title: "Easy Maintenance",
      img: "/images/easy maintenance.jpg",
      path: "/maintenance",
    },
    {
      title: "Anti Rust",
      img: "/images/Anti-Rust-.png",
      path: "/anti-rust",
    },
  ];

  const products = [
    {
      title: "Residential Pumps",
      img: "/images/Residential Pumps.jpg",
      desc: "Efficient water solutions for your home with durable design and high performance.",
    },
    {
      title: "Agricultural Pumps",
      img: "/images/Agricultural Pumps.jpg",
      desc: "High-performance submersible pumps built for farms and irrigation needs.",
    },
    {
      title: "Industrial Pumps",
      img: "/images/Industrial Pumps.jpg",
      desc: "Reliable industrial-grade pumps ideal for heavy-duty operations and factories.",
    },
    {
      title: "Borewell Pumps",
      img: "/images/Borewell Pumps.jpg",
      desc: "Designed for deep water extraction with strong motor and rust-resistant body.",
    },
  ];

  return (
    <div className="bg-white py-24 px-4 sm:px-6 lg:px-8"> {/* 👈 Increased top padding */}
      {/* ======= WHY CHOOSE SECTION ======= */}
      <motion.div
        initial={{ opacity: 0, y: 50 }} // 👈 animation start
        whileInView={{ opacity: 1, y: 0 }} // 👈 on scroll visible
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
                  src={item.img}
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
              
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
             
                 <Link to="/moreproduct" className="text-blue-600 font-semibold hover:underline">
                            MoreProduct
                          </Link>
              
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default About;
