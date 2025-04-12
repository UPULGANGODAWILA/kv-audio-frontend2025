import React, { useState } from "react";

export default function Gallery() {
  const images = [
    "/pubilc/logo.png",
    "/images/img2.jpg",
    "/images/img3.jpg",
    "/images/img4.jpg",
    "/images/img5.jpg",
    "/images/img6.jpg",
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Gallery</h1>

      {/* Grid View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((src, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl shadow-lg bg-white"
          >
            <img
              src={src}
              alt={`Gallery ${index}`}
              className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="text-center py-2">
              <button
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                onClick={() => setSelectedImage(src)}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal View */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-[90vh] rounded"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-white text-black rounded-full px-3 py-1 text-sm font-semibold hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
