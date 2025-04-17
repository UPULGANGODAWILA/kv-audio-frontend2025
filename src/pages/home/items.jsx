import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../../components/ProductCard";

export default function Items() {
  const [state, setState] = useState("loading");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isRetrying, setIsRetrying] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (state === "loading") {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/products`)
        .then((res) => {
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
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex flex-col items-center pt-20 px-6">
      {/* Loading State */}
      {state === "loading" && (
        <div className="w-full flex justify-center items-center py-20">
          <div className="w-14 h-14 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error State */}
      {state === "error" && (
        <div className="w-full flex flex-col items-center py-16 text-center">
          <p className="text-red-600 text-xl font-semibold mb-4">
            Failed to load products.
          </p>
          <button
            onClick={() => {
              setIsRetrying(true);
              setState("loading");
            }}
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition 
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
          <div className="w-full flex justify-center mb-8">
            <input
              type="text"
              placeholder="🔍 Search products..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full sm:w-2/3 md:w-1/2 p-4 rounded-xl shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            />
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <ProductCard key={item.key} item={item} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600 text-lg">
                No matching products found.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
