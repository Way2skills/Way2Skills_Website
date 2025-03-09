import { useState, useEffect } from "react";
import axios from "axios";

const ReviewTable = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("https://backend-way2skills.onrender.com/api/v1/reviews");
      setReviews(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setLoading(false);
    }
  };

  const deleteReview = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await axios.delete(`https://backend-way2skills.onrender.com/api/v1/reviews/${id}`);
      setReviews(reviews.filter((review) => review.id !== id)); // Update UI after deletion
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Reviews</h2>
      {loading ? (
        <p>Loading reviews...</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-700">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="px-4 py-2 border border-gray-700">#</th>
              <th className="px-4 py-2 border border-gray-700">Name</th>
              <th className="px-4 py-2 border border-gray-700">Comment</th>
              <th className="px-4 py-2 border border-gray-700">Rating</th>
              <th className="px-4 py-2 border border-gray-700">Date</th>
              <th className="px-4 py-2 border border-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={review.id} className="hover:bg-gray-800">
                <td className="px-4 py-2 border border-gray-700">{index + 1}</td>
                <td className="px-4 py-2 border border-gray-700">{review.name}</td>
                <td className="px-4 py-2 border border-gray-700">{review.comment}</td>
                <td className="px-4 py-2 border border-gray-700">{review.rating}</td>
                <td className="px-4 py-2 border border-gray-700">{new Date(review.createdAt).toLocaleString()}</td>
                <td className="px-4 py-2 border border-gray-700">
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReviewTable;
