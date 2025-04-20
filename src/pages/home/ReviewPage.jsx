import { useState, useEffect } from "react";
import axios from "axios";

export default function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState("");
  const [error, setError] = useState("");

  const fetchReviews = async () => {
    try {
      const res = await axios.get("/api/reviews");

      // Debug log
      console.log("API Response:", res.data);

      // Check if it's an array, else try accessing `reviews` field
      const fetchedReviews = Array.isArray(res.data)
        ? res.data
        : res.data.reviews || [];

      setReviews(fetchedReviews);
    } catch (err) {
      console.error(err);
      setError("Error loading reviews");
    }
  };

  const submitReview = async () => {
    try {
      await axios.post("/api/reviews", { message, rating });
      setMessage("");
      setRating("");
      fetchReviews(); // Refresh reviews
    } catch (err) {
      setError("Failed to add review");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add a Review</h2>
      <textarea
        className="w-full p-2 border rounded mb-2"
        placeholder="Write your review..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input
        className="w-full p-2 border rounded mb-2"
        placeholder="Rating (1-5)"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        type="number"
        min={1}
        max={5}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={submitReview}
      >
        Submit Review
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}

      <h3 className="text-xl font-semibold mt-8 mb-4">Reviews</h3>
      <div className="space-y-4">
        {Array.isArray(reviews) && reviews.length > 0 ? (
          reviews.map((review, idx) => (
            <div key={idx} className="border p-4 rounded bg-gray-50">
              <div className="flex items-center mb-2">
                {review.profilePicture && (
                  <img
                    src={review.profilePicture}
                    alt="profile"
                    className="w-10 h-10 rounded-full mr-2"
                  />
                )}
                <div>
                  <p className="font-semibold">{review.name || "Anonymous"}</p>
                  <p className="text-sm text-gray-500">{review.email || ""}</p>
                </div>
              </div>
              <p className="mb-1">{review.message}</p>
              <p className="text-yellow-500">⭐ {review.rating}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews available.</p>
        )}
      </div>
    </div>
  );
}
