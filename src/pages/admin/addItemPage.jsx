import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../utils/mediaUpload.jsx";

export default function AddItemPage() {
  const [productKey, setProductKey] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productCategory, setProductCategory] = useState("audio");
  const [productDimensions, setProductDimensions] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState([]);
  const navigate = useNavigate();

  async function handleAddItem() {
    const promises = [];

    for (let i = 0; i < productImages.length; i++) {
      const promise = mediaUpload(productImages[i]);
      promises.push(promise);
    }

    const token = localStorage.getItem("token");

    if (token) {
      try {
        const imageUrls = await Promise.all(promises);

        const result = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/products`,
          {
            key: productKey,
            name: productName,
            price: productPrice,
            category: productCategory,
            dimensions: productDimensions,
            description: productDescription,
            image: imageUrls,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        toast.success(result.data.message);
        navigate("/admin/items");
      } catch (err) {
        toast.error(err.response?.data?.error || "Something went wrong");
      }
    } else {
      toast.error("You are not authorized to add items");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Add New Item</h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Product Key"
            value={productKey}
            onChange={(e) => setProductKey(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            placeholder="Product Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <select
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="audio">Audio</option>
            <option value="lights">Lights</option>
          </select>
          <input
            type="text"
            placeholder="Product Dimensions"
            value={productDimensions}
            onChange={(e) => setProductDimensions(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <textarea
            placeholder="Product Description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="file"
            multiple
            onChange={(e) => setProductImages(e.target.files)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleAddItem}
            className="flex-1 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition"
          >
            Add
          </button>
          <button
            onClick={() => navigate("/admin/items")}
            className="flex-1 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
