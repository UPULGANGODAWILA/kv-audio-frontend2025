import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../../components/ProductCard";

export default function Items() {
  const [state, setState] = useState("loading"); // loading, success, error
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isRetrying, setIsRetrying] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (state === "loading") {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/products`)
        .then((res) => {
          console.log(res.data);
          setItems(res.data);
          setFilteredItems(res.data);
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

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(query)
    );
    setFilteredItems(filtered);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-16 px-4">
      {/* Loading State */}
      {state === "loading" && (
        <div className="w-full flex justify-center items-center py-10">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error State */}
      {state === "error" && (
        <div className="w-full flex flex-col items-center py-15 text-center">
          <p className="text-red-500 text-lg font-semibold mb-4">
            Failed to load products.
          </p>
          <button
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

      {/* Success State */}
      {state === "success" && (
        <div className="w-full max-w-7xl">
          {/* Search Bar */}
          <div className="w-full flex justify-center mb-6 px-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full sm:w-1/2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <ProductCard key={item.key} item={item} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No matching products found.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
