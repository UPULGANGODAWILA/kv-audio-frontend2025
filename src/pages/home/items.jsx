import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../../components/ProductCard";

export default function Items() {
  const [state, setState] = useState("loading"); // loading, success, error
  const [items, setItems] = useState([]);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    if (state === "loading") {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/products`)
        .then((res) => {
          console.log(res.data);
          setItems(res.data);
          setState("success");
          setIsRetrying(false);
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error || "An error occurred");
          setState("error");
          setIsRetrying(false);
        });
    }
  }, [state]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-16 px-4">
      {/* Loading State */}
      {state === "loading" && (
        <div className="w-full flex justify-center items-center py-10">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error State with Retry Button */}
      {state === "error" && (
        <div className="w-full flex flex-col items-center py-15  text-center">
          <p className="text-red-500 text-lg font-semibold mb-4">
            Failed to load products.
          </p>
          <button m-2
            onClick={() => {
              setIsRetrying(true);
              setState("loading");
            }}
            className="px-5 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition 
              disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isRetrying}
          >
            {isRetrying ? "Retrying..." : "Retry"}
          </button>
        </div>
      )}

      {/* Success State - Product Grid (Mobile Responsive) */}
      {state === "success" && (
        <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {items.map((item) => (
            <ProductCard key={item.key} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
