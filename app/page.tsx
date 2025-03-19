"use client";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";

const Home = () => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play first 10 seconds of the video
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play();
      video.currentTime = 0;
      const timer = setTimeout(() => {
        video.pause();
      }, 10000); // Pause after 10 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content (Hero Section) */}
      <div className="relative flex-grow overflow-hidden">
        {/* Background Image */}
        <Image
          src="/hero-2.jpg"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
          className="absolute inset-0"
        />

        {/* Overlay Video (behind content) */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-auto sm:h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 z-10">
          <h2 className="text-3xl sm:text-5xl font-bold leading-tight text-white drop-shadow-md font-poppins">
            Revolutionizing REST API Testing with LLMs
          </h2>
          <p className="mt-4 max-w-xs sm:max-w-3xl text-lg sm:text-xl text-gray-300 drop-shadow-md font-poppins">
            Build automated REST API tests with LLM-powered insights. Identify
            gaps and ensure comprehensive API documentation effortlessly.
          </p>

          {/* Try It Now Button */}
          <button
            onClick={() => router.push("/main")}
            className="mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-purple-500 rounded-2xl hover:bg-purple-600 text-sm sm:text-lg transition duration-300 flex items-center gap-2 shadow-lg"
          >
            Try It Now <FiArrowRight className="text-lg sm:text-xl" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
