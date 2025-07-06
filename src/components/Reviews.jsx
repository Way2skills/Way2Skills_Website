import { useState, useEffect } from "react";
import axios from "axios";
import AISearchComponent from "./AISearchComponent";
// import { saveAs } from "file-saver";

const ReviewTable = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [useAISearch, setUseAISearch] = useState(false);
  const [aiResults, setAiResults] = useState([]);
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
    const valA = a[sortConfig.key]?.toString().toLowerCase() || "";
    const valB = b[sortConfig.key]?.toString().toLowerCase() || "";
    if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredReviews = sortedReviews.filter((review) =>
    review.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedReviews = filteredReviews.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  // Handle AI search results
  const handleAIResults = (results) => {
    setAiResults(results);
  };

  // Determine which data to display
  const displayData = useAISearch && aiResults.length > 0 ? aiResults : paginatedReviews;

//   const downloadCSV = () => {
//     const csvHeader = "Name,Comment,Rating,Date\n";
//     const csvRows = filteredReviews.map(
//       (review) => `${review.name},${review.comment},${review.rating},${new Date(review.createdAt).toLocaleString()}`
//     ).join("\n");

//     const csvString = csvHeader + csvRows;
//     const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
//     saveAs(blob, "reviews.csv");
//   };

  return (
    <div className="overflow-x-auto mt-9">
      {/* Search Mode Toggle */}
      <div className="mb-4">
        <div className="flex items-center gap-4 mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={useAISearch}
              onChange={(e) => setUseAISearch(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm font-medium">
              🤖 Use AI Search (Beta)
            </span>
          </label>
        </div>

        {useAISearch ? (
          /* AI Search Component */
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              🧠 AI-Powered Review Search
            </h3>
            <AISearchComponent
              searchType="reviews"
              placeholder="Search reviews with AI - try 'excellent teaching' or 'great experience'..."
              onResults={handleAIResults}
            />
          </div>
        ) : (
          /* Traditional Search */
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={handleSearch}
              className="p-2 border border-gray-500 rounded mr-4"
            />
            {/* <button
              onClick={downloadCSV}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Download CSV
            </button> */}
          </div>
        )}
      </div>

      {loading ? (
        <p>Loading reviews...</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-700">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="px-4 py-2 border border-gray-700 cursor-pointer" onClick={() => handleSort("id")}>#</th>
              <th className="px-4 py-2 border border-gray-700 cursor-pointer" onClick={() => handleSort("name")}>Name</th>
              <th className="px-4 py-2 border border-gray-700 cursor-pointer" onClick={() => handleSort("comment")}>Comment</th>
              <th className="px-4 py-2 border border-gray-700 cursor-pointer" onClick={() => handleSort("rating")}>Rating</th>
              <th className="px-4 py-2 border border-gray-700 cursor-pointer" onClick={() => handleSort("createdAt")}>Date</th>
              <th className="px-4 py-2 border border-gray-700">Action </th>
              {useAISearch && aiResults.length > 0 && (
                <th className="px-4 py-2 border border-gray-700">🎯 AI Relevance</th>
              )}
            </tr>
          </thead>
          <tbody>
            {displayData.map((review, index) => (
              <tr key={review.id} className="hover:bg-gray-800">
                <td className="px-4 py-2 border border-gray-700">
                  {useAISearch ? review.id : (currentPage - 1) * rowsPerPage + index + 1}
                </td>
                <td className="px-4 py-2 border border-gray-700">{review.name}</td>
                <td className="px-4 py-2 border border-gray-700">{review.comment}</td>
                <td className="px-4 py-2 border border-gray-700">
                  {review.rating ? (
                    <div className="flex items-center">
                      <span className="text-yellow-500">{"★".repeat(review.rating)}</span>
                      <span className="text-gray-400">{"☆".repeat(5 - review.rating)}</span>
                      <span className="ml-1 text-sm">({review.rating}/5)</span>
                    </div>
                  ) : (
                    review.rating || "N/A"
                  )}
                </td>
                <td className="px-4 py-2 border border-gray-700">
                  {review.created_at ? new Date(review.created_at).toLocaleString() : 
                   review.createdAt ? new Date(review.createdAt).toLocaleString() : "N/A"}
                </td>
                <td className="px-4 py-2 border border-gray-700">
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </td>
                {useAISearch && aiResults.length > 0 && (
                  <td className="px-4 py-2 border border-gray-700">
                    {review.similarity && (
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(review.similarity * 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600">
                          {(review.similarity * 100).toFixed(1)}%
                        </span>
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Traditional Pagination - only show for non-AI search */}
      {!useAISearch && (
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
      )}

      {/* AI Search Results Info */}
      {useAISearch && aiResults.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            🎯 Showing {aiResults.length} AI-powered search results with relevance scores
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewTable;