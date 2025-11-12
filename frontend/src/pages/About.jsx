// frontend/src/pages/About.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const About = () => {
  const [addabouts, setAddabouts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/addabout")
      .then((res) => setAddabouts(res.data.features))
      .catch(() => console.log("Error fetching addabout"));
  }, []);

  return (
    <>
      {/* SECTION 1 - Static Icons (Why Choose MotorMines) */}
      <div className="bg-white py-16 px-6 sm:px-10 lg:px-20">
        <h2 className="text-3xl font-bold text-center mb-14 text-gray-900">
          Why To Choose MotorMines
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="w-40 h-40 border-2 border-blue-600 rounded-full flex items-center justify-center mb-4">
              <img
                src="/images/High-Suction-Capacity.jpg"
                alt="High Suction Capacity"
                className="w-38 h-38 object-contain"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              High Suction Capacity
            </h3>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="w-40 h-40 border-2 border-blue-600 rounded-full flex items-center justify-center mb-4">
              <img
                src="\images\wide-voltage-design.jpg"
                alt="Wide Voltage Operation"
                className="w-38 h-38 object-contain"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Wide Voltage Operation
            </h3>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="w-40 h-40 border-2 border-blue-600 rounded-full flex items-center justify-center mb-4">
              <img
                src="\images\easy maintenance.jpg"
                alt="Easy Maintenance"
                className="w-38 h-38 object-contain"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Easy Maintenance
            </h3>
          </motion.div>
        </div>
      </div>

      {/* SECTION 2 - Dynamic (Admin Addabout Data) */}
      <div className="bg-gray-50 py-16 px-6 sm:px-10 lg:px-20">
        <h2 className="text-3xl font-bold text-center mb-14 text-gray-900">
          Our Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {addabouts.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-1/2 h-60 md:h-auto overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col justify-between md:w-1/2">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-700 mb-4">
                      {item.description?.slice(0, 250)}...
                    </p>
                  </div>
                  <a
                    href={item.path}
                    className="text-blue-700 font-semibold hover:underline mt-2"
                  >
                    View all products →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default About;
