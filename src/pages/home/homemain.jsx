import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Homemain() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src="./Home.jpg"
        alt="Sound and Light"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-10" />

      {/* Glassmorphism Card */}
      <div className="relative z-20 flex items-center justify-center h-full px-4">
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-3xl p-10 max-w-3xl text-center text-white shadow-2xl border border-white/20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Heading */}
          <motion.h1
            className="text-4xl sm:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Professional Sound & Lighting Rentals
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            className="text-lg sm:text-xl mb-8 leading-relaxed text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Make your event unforgettable with top-tier sound systems, dazzling lights, and exceptional service — weddings, parties, and every special moment covered.
          </motion.p>

          {/* Call to Actions */}
          <div className="flex justify-center gap-4">
            <Link to="/items">
              <motion.button
                className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
                whileHover={{ scale: 1.05 }}
              >
                Book Now
              </motion.button>
            </Link>
            <Link to="/reviews">
              <motion.button
                className="border border-white px-6 py-3 rounded-full font-semibold text-white hover:bg-white/10 transition"
                whileHover={{ scale: 1.05 }}
              >
                See Reviews
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Optional Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white z-20">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, repeat: Infinity, repeatType: "reverse", duration: 1 }}
        >
          <svg
            className="w-6 h-6 animate-bounce"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
