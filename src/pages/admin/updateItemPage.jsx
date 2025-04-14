import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../utils/mediaUpload";

export default function UpdateItemPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [productKey, setProductKey] = useState(location.state.key);
  const [productName, setProductName] = useState(location.state.name);
  const [productPrice, setProductPrice] = useState(location.state.price);
  const [productCategory, setProductCategory] = useState(location.state.category);
  const [productDimensions, setProductDimensions] = useState(location.state.dimensions);
  const [productDescription, setProductDescription] = useState(location.state.description);
  const [productImages, setProductImages] = useState([]);

  async function handleUpdateItem() {
    let updatingImages = location.state.image;

    if (productImages.length > 0) {
      const promises = [];
      for (let i = 0; i < productImages.length; i++) {
        const promise = mediaUpload(productImages[i]);
        promises.push(promise);
      }
      updatingImages = await Promise.all(promises);
    }

    const token = localStorage.getItem("token");

    if (token) {
      try {
        const result = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/${productKey}`,
          {
            name: productName,
            price: productPrice,
            category: productCategory,
            dimensions: productDimensions,
            description: productDescription,
            image: updatingImages,
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
        toast.error(err.response.data.error);
      }
    } else {
      toast.error("You are not authorized to update items");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Update Item</h1>

        <div className="space-y-4">
          <input
            disabled
            type="text"
            placeholder="Product Key"
            value={productKey}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
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
            onClick={handleUpdateItem}
            className="flex-1 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition"
          >
            Update
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
