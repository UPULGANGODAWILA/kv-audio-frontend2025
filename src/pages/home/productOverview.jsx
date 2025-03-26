import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";
import { addToCart, loadCart } from "../utils/cart";
import toast from "react-hot-toast";

export default function ProductOverview() {
    const { key } = useParams();
    const [loadingStatus, setLoadingStatus] = useState("loading");
    const [product, setProduct] = useState({});

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`)
            .then((res) => {
                setProduct(res.data);
                setLoadingStatus("loaded");
            })
            .catch((err) => {
                console.error(err);
                setLoadingStatus("error");
            });
    }, []);

    return (
        <div className="w-full h-full flex justify-center items-center bg-gray-100 px-4 py-6">
            {loadingStatus === "loading" && (
                <div className="w-full flex justify-center items-center">
                    <div className="w-16 h-16 border-4 border-t-green-500 rounded-full animate-spin"></div>
                </div>
            )}

            {loadingStatus === "loaded" && (
                <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6 md:flex">
                    {/* Left - Image */}
                    <div className="md:w-1/2 flex justify-center">
                        <ImageSlider images={product.image} />
                    </div>

                    {/* Right - Product Details */}
                    <div className="md:w-1/2 flex flex-col items-center text-center md:text-left md:items-start p-4">
                        <h1 className="text-2xl md:text-3xl font-bold text-accent">{product.name}</h1>
                        <h2 className="text-lg md:text-xl font-semibold text-gray-700">{product.category} Category</h2>
                        <p className="text-gray-600 mt-2">{product.description}</p>
                        <p className="text-xl font-bold text-green-500 mt-4">Rs. {product.price?.toFixed(2)}</p>

                        <div className="mt-2 text-sm text-gray-600">
                            <span className="font-medium">Dimensions:</span> {product.dimensions}
                        </div>

                        <button
                            className="mt-6 bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-md"
                            onClick={() => {
                                addToCart(product.key, 1);
                                toast.success("Added to Cart");
                                console.log(loadCart());
                            }}
                        >
                            🛒 Add to Cart
                        </button>
                    </div>
                </div>
            )}

            {loadingStatus === "error" && (
                <div className="w-full h-full flex justify-center items-center">
                    <h1 className="text-3xl font-bold text-red-500">Error Occurred</h1>
                </div>
            )}
        </div>
    );
}
