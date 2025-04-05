import { Link } from "react-router-dom";

export default function ErrorNotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 text-center">
      <img
        src="/404 Error .png" // replace with your chosen image URL
        alt="Page Not Found"
        className="w-80 md:w-96 mb-6"
      />
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-6">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-2 px-6 rounded-full transition duration-300"
      >
        Go back to Home
      </Link>
    </div>
  );
}
