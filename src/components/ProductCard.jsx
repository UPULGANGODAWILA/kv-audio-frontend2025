import { Link } from "react-router-dom";

export default function ProductCard({ item }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col w-full max-w-xs mx-auto">
      {/* Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={item.image[0]}
          alt={item.name}
          className="w-full h-full object-contain p-2"
        />
      </div>

      {/* Details */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">{item.name}</h2>
          <p className="text-gray-600 text-sm mt-1">{item.category}</p>
          <p className="text-gray-700 text-sm mt-2 line-clamp-3">{item.description}</p>

          <div className="flex justify-between items-center mt-3">
            <span className="text-base font-bold text-green-500">{item.price}</span>
            <span
              className={`px-3 py-1 text-sm rounded-full ${
                item.availability ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {item.availability ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <div className="mt-3 text-sm text-gray-600">
            <span className="font-medium">Dimensions:</span> {item.dimensions}
          </div>
        </div>

        {/* View Details Button */}
        <div className="mt-4">
          <Link
            to={`/product/${item.key}`}
            className="block w-full text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

