import { useState, useEffect } from "react";
import axios from "axios";

const ReviewTable = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

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
      setReviews(reviews.filter((review) => review.id !== id));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const valA = a[sortConfig.key];
    const valB = b[sortConfig.key];
    if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredReviews = sortedReviews.filter((review) =>
    review.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedReviews = filteredReviews.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="overflow-x-auto mt-9">
      
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-500 rounded"
      />
      {loading ? (
        <p>Loading reviews...</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-700">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="px-4 py-2 border border-gray-700">#</th>
              <th className="px-4 py-2 border border-gray-700 cursor-pointer" onClick={() => handleSort("name")}>Name</th>
              <th className="px-4 py-2 border border-gray-700">Comment</th>
              <th className="px-4 py-2 border border-gray-700 cursor-pointer" onClick={() => handleSort("rating")}>Rating</th>
              <th className="px-4 py-2 border border-gray-700">Date</th>
              <th className="px-4 py-2 border border-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedReviews.map((review, index) => (
              <tr key={review.id} className="hover:bg-gray-800">
                <td className="px-4 py-2 border border-gray-700">{(currentPage - 1) * rowsPerPage + index + 1}</td>
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
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage((prev) => (filteredReviews.length > prev * rowsPerPage ? prev + 1 : prev))}
          disabled={filteredReviews.length <= currentPage * rowsPerPage}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReviewTable;
