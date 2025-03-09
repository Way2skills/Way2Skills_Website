import { useState, useEffect } from "react";
import axios from "axios";

const RegistrationTable = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const rowsPerPage = 10;
  const API_URL = "https://backend-way2skills.onrender.com/api/v1/register/registrations/";

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const response = await axios.get(API_URL);
      setRegistrations(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      setLoading(false);
    }
  };

  const deleteRegistration = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      await axios.delete(`${API_URL}${id}`);
      setRegistrations(registrations.filter((registration) => registration.id !== id));
    } catch (error) {
      console.error("Error deleting registration:", error);
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

  const sortedRegistrations = [...registrations].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const valA = a[sortConfig.key];
    const valB = b[sortConfig.key];
    if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredRegistrations = sortedRegistrations.filter((registration) =>
    registration.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedRegistrations = filteredRegistrations.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

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
        <p>Loading registrations...</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-700">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="px-4 py-2 border border-gray-700">#</th>
              <th className="px-4 py-2 border border-gray-700 cursor-pointer" onClick={() => handleSort("name")}>Name</th>
              <th className="px-4 py-2 border border-gray-700">Email</th>
              <th className="px-4 py-2 border border-gray-700">Phone No</th>
              <th className="px-4 py-2 border border-gray-700">Course</th>
              <th className="px-4 py-2 border border-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRegistrations.map((registration, index) => (
              <tr key={registration.id} className="hover:bg-gray-800 cursor-pointer" onClick={() => setSelectedTransaction(registration.file_base64)}>
                <td className="px-4 py-2 border border-gray-700">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                <td className="px-4 py-2 border border-gray-700">{registration.name}</td>
                <td className="px-4 py-2 border border-gray-700">{registration.email}</td>
                <td className="px-4 py-2 border border-gray-700">{registration.phone_no}</td>
                <td className="px-4 py-2 border border-gray-700">{registration.course}</td>
                <td className="px-4 py-2 border border-gray-700">
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteRegistration(registration.id); }}
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
          onClick={() => setCurrentPage((prev) => (filteredRegistrations.length > prev * rowsPerPage ? prev + 1 : prev))}
          disabled={filteredRegistrations.length <= currentPage * rowsPerPage}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      {selectedTransaction && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Transaction Image</h3>
            <img src={`data:image/png;base64,${selectedTransaction}`} alt="Transaction" className="w-full" />
            <button onClick={() => setSelectedTransaction(null)} className="mt-4 bg-red-500 px-4 py-2 rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationTable;