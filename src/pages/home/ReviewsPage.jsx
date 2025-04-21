// src/pages/ReviewsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all reviews
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`)
      .then((response) => {
        setReviews(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-semibold text-center mb-6">All Reviews</h2>
      {loading ? (
        <div>Loading reviews...</div>
      ) : (
        <div>
          {reviews.map((review) => (
            <div
              key={review.email}
              className="bg-white/10 p-6 mb-4 rounded-xl shadow-lg"
            >
              <p className="text-lg">{review.comment}</p>
              <div className="mt-4">
                <h3 className="font-bold">{review.name}</h3>
                <p className="text-sm">{`Rating: ${review.rating}/5`}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
