import React from "react";

const Home = () => {
  return (
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
        <button className="mt-6 px-8 py-5 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition duration-200">
          Explore Products
        </button>
      </div>
    </div>
  );
};

export default Home;
