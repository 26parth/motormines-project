import React, { useEffect, useRef } from "react";
import About from "./About";
import Contact from "./Contact";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import anime from "animejs/lib/anime.es.js";

const Home = () => {
  const navigate = useNavigate();

  // Refs for animation
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    // HERO background fade + zoom
    anime({
      targets: heroRef.current,
      opacity: [0, 1],
      scale: [1.05, 1],
      duration: 1200,
      easing: "easeOutQuad",
    });

    // Heading slide up
    anime({
      targets: titleRef.current,
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 900,
      delay: 300,
      easing: "easeOutExpo",
    });

    // Paragraph fade
    anime({
      targets: descRef.current,
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 900,
      delay: 450,
      easing: "easeOutExpo",
    });

    // Button pop animation
    anime({
      targets: btnRef.current,
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 800,
      delay: 650,
      easing: "easeOutBack",
    });
  }, []);

  return (
    <>
      <div
        ref={heroRef}
        className="h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
        style={{ backgroundImage: "url('/images/main-motormines-pumps.jpg')" }}
      >
        <div className="bg-black-transparant p-10 text-center">
          <h1
            ref={titleRef}
            className="text-5xl font-extrabold mb-4 drop-shadow-lg"
          >
            Welcome to MotorMines
          </h1>

          <p
            ref={descRef}
            className="text-lg max-w-xl leading-relaxed mx-auto"
          >
            Discover high-performance submersible water pumps designed for
            durability, efficiency, and reliability — perfect for homes,
            industries, and agriculture.
          </p>

          <button
            ref={btnRef}
            onClick={() => navigate("/moreproduct")}
            className="block mt-4 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 mx-auto"
          >
            Explore Products
          </button>
        </div>
      </div>

      <About />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
