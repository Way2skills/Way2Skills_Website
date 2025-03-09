import React, { useEffect, useState } from "react";
import axios from "axios";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("https://backend-way2skills.onrender.com/api/v1/reviews");
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="bg-black text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 border-b pb-2 border-gray-700">User Reviews</h2>
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : reviews.length > 0 ? (
        <div className="space-y-4 bg-black">
          {reviews.map((review, index) => (
            <div key={index} className="p-4 border border-gray-700 rounded-lg">
              <p className="font-semibold text-lg">{review.name}</p>
              <p className="text-yellow-400">{"⭐".repeat(review.rating)}</p>
              <p className="text-gray-300">{review.comment}</p>
              <p className="text-sm text-gray-500 mt-2">{new Date(review.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No reviews available</p>
      )}
    </div>
  );
};

export default Reviews;