import React, { useState } from "react";
import PropTypes from "prop-types";

export default function ImageSlider({ images = [], title = "" }) {
    const [selectedImage, setSelectedImage] = useState(images[0] || "");

    if (images.length === 0) {
        return <p className="text-gray-500 text-center">No images available</p>;
    }

    return (
        <div className="w-full flex flex-col items-center">
            {/* Heading */}
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">{title}</h2>

            {/* Main Image Display */}
            <div className="relative w-full max-w-3xl h-[350px] md:h-[500px] overflow-hidden rounded-lg shadow-lg transition-all duration-500 mb-6 object-cover">
                <img 
                    src={selectedImage} 
                    alt="Selected product" 
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>

            {/* Thumbnail Images */}
            <div className="w-full flex justify-center gap-3 overflow-x-auto p-2">
                {images.map((image, index) => (
                    <img 
                        key={index} 
                        src={image} 
                        alt={`Thumbnail ${index}`} 
                        className={`w-[100px] h-[80px] md:w-[130px] md:h-[100px] object-cover cursor-pointer transition-all duration-300 shadow-md rounded-md border-2 
                            ${image === selectedImage ? "border-primary scale-105" : "border-transparent hover:scale-105 hover:border-gray-300"}`}
                        onClick={() => setSelectedImage(image)}
                    />
                ))}
            </div>
        </div>
    );
}

ImageSlider.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
};
