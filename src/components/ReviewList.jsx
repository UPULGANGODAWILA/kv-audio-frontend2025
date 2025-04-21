import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaCheckCircle } from "react-icons/fa";

export default function ReviewList({ currentUser }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`, {
        withCredentials: true,
      })
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err));
  }, []);

  const deleteReview = (email) => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/${email}`, {
        withCredentials: true,
      })
      .then(() => {
        setReviews((prev) => prev.filter((r) => r.email !== email));
      })
      .catch((err) => console.error("Delete failed", err));
  };

  const approveReview = (email) => {
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews/approve/${email}`,
        {},
        { withCredentials: true }
      )
      .then(() => {
        setReviews((prev) =>
          prev.map((r) =>
            r.email === email ? { ...r, isApproved: true } : r
          )
        );
      })
      .catch((err) => console.error("Approval failed", err));
  };

  return (
    <div className="space-y-4 p-4">
      {reviews.map((review, idx) => (
        <div key={idx} className="bg-white p-4 shadow rounded-lg relative">
          <div className="flex items-center gap-4">
            <img
              src={review.profilePicture}
              alt="profile"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold text-accent">{review.name}</p>
              <p className="text-sm text-gray-600">{review.email}</p>
              <p className="text-sm mt-1">Rating: {review.rating} ⭐</p>
              <p className="text-gray-800 mt-2">{review.comment}</p>
              <p className="text-xs text-gray-400">
                {new Date(review.date).toLocaleString()}
              </p>
            </div>
          </div>

          {(currentUser?.email === review.email ||
            currentUser?.role === "admin") && (
            <button
              onClick={() => deleteReview(review.email)}
              className="absolute top-2 right-2 text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-full"
            >
              <FaTrash />
            </button>
          )}

          {currentUser?.role === "admin" && !review.isApproved && (
            <button
              onClick={() => approveReview(review.email)}
              className="absolute top-2 right-12 text-green-500 hover:text-white hover:bg-green-500 p-2 rounded-full"
            >
              <FaCheckCircle />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
