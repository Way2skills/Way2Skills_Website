import { useState, useEffect } from "react";
import axios from "axios";
// import * as XLSX from "xlsx";

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
    const valA = a[sortConfig.key]?.toString().toLowerCase();
    const valB = b[sortConfig.key]?.toString().toLowerCase();
    if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredRegistrations = sortedRegistrations.filter((registration) =>
    registration.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedRegistrations = filteredRegistrations.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

//   const downloadExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(registrations);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
//     XLSX.writeFile(workbook, "registrations.xlsx");
//   };

//   const downloadCSV = () => {
//     const csvContent = [
//       ["Name", "Email", "Phone No", "Course"],
//       ...registrations.map((reg) => [reg.name, reg.email, reg.phone_no, reg.course]),
//     ]
//       .map((row) => row.join(","))
//       .join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "registrations.csv";
//     link.click();
//   };

  return (
    <div className="overflow-x-auto mt-9">
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={handleSearch}
          className="p-2 border border-gray-500 rounded"
        />
        {/* <div>
          <button onClick={downloadExcel} className="px-4 py-2 bg-green-500 text-white rounded mr-2">Download Excel</button>
          <button onClick={downloadCSV} className="px-4 py-2 bg-blue-500 text-white rounded">Download CSV</button>
        </div> */}
      </div>
      {loading ? (
        <p>Loading registrations...</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-700">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="px-4 py-2 border border-gray-700">#</th>
              <th className="px-4 py-2 border border-gray-700 cursor-pointer" onClick={() => handleSort("name")}>Name</th>
              <th className="px-4 py-2 border border-gray-700 cursor-pointer" onClick={() => handleSort("email")}>Email</th>
              <th className="px-4 py-2 border border-gray-700 cursor-pointer" onClick={() => handleSort("phone_no")}>Phone No</th>
              <th className="px-4 py-2 border border-gray-700 cursor-pointer" onClick={() => handleSort("course")}>Course</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRegistrations.map((registration, index) => (
              <tr key={registration.id} className="hover:bg-gray-800 cursor-pointer">
                <td className="px-4 py-2 border border-gray-700">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                <td className="px-4 py-2 border border-gray-700">{registration.name}</td>
                <td className="px-4 py-2 border border-gray-700">{registration.email}</td>
                <td className="px-4 py-2 border border-gray-700">{registration.phone_no}</td>
                <td className="px-4 py-2 border border-gray-700">{registration.course}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RegistrationTable;
