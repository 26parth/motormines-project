import React from "react";
import About from "./About";
import Contact from "./Contact";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();
  
  return (
    <> 
    <div
      className="h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
      style={{ backgroundImage: "url('/images/main motor pumps.jpeg')" }}
    >
      {/* Dark overlay for readability */}
      <div className="bg-black-transparant p-10 text-center  ">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to MotorMines
        </h1>
        <p className="text-lg max-w-xl leading-relaxed " >
          Discover high-performance submersible water pumps designed for
          durability, efficiency, and reliability — perfect for homes,
          industries, and agriculture.
        </p>
        <button
            onClick={() => navigate("/moreproduct")}
            className="block mt-4 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 mx-auto"
          >
            Explore Products
          </button>
      </div>
    </div>
      {/* ✅ Ye About Section */}
      <About />

      {/* ✅ Ye Contact Section */}
      <Contact />

      {/* ✅ Ye Footer */}
      <Footer />
     </>
  );
};

export default Home;
