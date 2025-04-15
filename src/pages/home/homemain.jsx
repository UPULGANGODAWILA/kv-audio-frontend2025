import React from "react";
import { motion } from "framer-motion";

export default function Homemain() {
  return (
    <div className="relative w-full h-[700px]">
      {/* Background Image */}
      <img
        src="./Home.jpg"
        alt="Sound and Light"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay with animation */}
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center">
        <div className="container mx-auto px-6 text-white">
          {/* Animated Heading */}
          <motion.h1
            className="text-4xl sm:text-5xl font-semibold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Professional Sound & Lighting Rentals
          </motion.h1>

          {/* Animated Paragraph */}
          <motion.p
            className="text-lg sm:text-xl max-w-2xl mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Make your event unforgettable with our top-notch sound systems,
            dazzling lights, and reliable service — for weddings, parties, and all your special moments.
          </motion.p>

          {/* Animated Button */}
          <motion.button
            className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Book Now
          </motion.button>
        </div>
      </div>
    </div>
  );
}
