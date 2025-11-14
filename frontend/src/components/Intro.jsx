import React, { useEffect, useState, useRef } from "react";
import { Typewriter } from "react-simple-typewriter";
import anime from "animejs/lib/anime.es.js";
import "../style/Intro.css";

const Intro = ({ onFinish }) => {
  const [show, setShow] = useState(true);
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // --- ENTRY ANIMATION (FADE + SCALE) ---
    anime({
      targets: containerRef.current,
      opacity: [0, 1],
      duration: 600,
      easing: "easeOutQuad",
    });

    anime({
      targets: textRef.current,
      translateY: [40, 0],
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 900,
      easing: "easeOutExpo",
    });

    // --- EXIT ANIMATION (FADE OUT) ---
    const timer = setTimeout(() => {
      anime({
        targets: containerRef.current,
        opacity: [1, 0],
        duration: 500,
        easing: "easeInQuad",
        complete: () => {
          setShow(false);
          onFinish();
        },
      });
    }, 3500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      className="intro-container flex justify-center items-center fixed inset-0 z-50"
    >
      <h1
        ref={textRef}
        className="text-6xl md:text-8xl font-extrabold text-white tracking-wider font-montserrat"
      >
        <Typewriter
          words={["MOTORMINES"]}
          loop={1}
          cursor
          cursorStyle="|"
          cursorColor="#12b8eb"
          typeSpeed={120}
          deleteSpeed={50}
        />
      </h1>
    </div>
  );
};

export default Intro;
