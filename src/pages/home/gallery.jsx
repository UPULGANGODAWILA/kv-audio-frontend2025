import React, { useState } from "react";

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Renders a gallery of images with a grid layout. Each image can be viewed in a larger modal
 * when clicked. The modal provides a close button to return to the grid view.
 *
 * The gallery consists of a collection of predefined images. Hovering over an image in the grid
 * slightly enlarges it, providing a visual cue that it is interactive.
 *
/*******  3a5b26d7-d6b6-4d3a-8708-c1727d924b02  *******/
export default function Gallery() {
  const images = [
    "/01.jpg",
    "/02.jpg",
    "/03.jpg",
    "/07.jpg",
    "/04.jpg",
    "/06.jpg",
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
