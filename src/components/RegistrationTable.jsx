import React, { useState, useEffect } from "react";
import axios from "axios";

const RegistrationTable = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [duplicateRows, setDuplicateRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const API_URL = "https://backend-way2skills.onrender.com/registrations/";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_URL);
                setData(response.data);
                setFilteredData(response.data);
                findDuplicates(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const findDuplicates = (records) => {
        const seen = new Map();
        const duplicates = [];

        records.forEach((item) => {
            const key = `${item.email}-${item.phone_no}`;
            if (seen.has(key)) {
                duplicates.push(item.id);
                duplicates.push(seen.get(key));
            } else {
                seen.set(key, item.id);
            }
        });

        setDuplicateRows([...new Set(duplicates)]);
    };

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchQuery(value);
        const filtered = data.filter(
            (item) =>
                item.name.toLowerCase().includes(value) ||
                item.email.toLowerCase().includes(value) ||
                item.phone_no.toLowerCase().includes(value) ||
                item.course.toLowerCase().includes(value)
        );
        setFilteredData(filtered);
        setCurrentPage(1); // Reset to first page on search
    };

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        const sortedData = [...filteredData].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });
        setSortConfig({ key, direction });
        setFilteredData(sortedData);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            try {
                await axios.delete(`${API_URL}${id}`);
                setData((prevData) => prevData.filter((item) => item.id !== id));
                setFilteredData((prevData) => prevData.filter((item) => item.id !== id));
                findDuplicates(filteredData);
            } catch (error) {
                console.error("Error deleting record:", error);
            }
        }
    };

    const handleRowClick = (record) => {
        setSelectedRecord(record);
    };

    const closeModal = () => {
        setSelectedRecord(null);
    };

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

    return (
        <div className="bg-black text-white p-6 rounded-lg mt-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2 border-black">Data Table</h2>

            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full p-2 mb-4 rounded-md bg-black text-white border border-gray-700"
            />

            {loading ? (
                <p className="text-gray-400">Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-700 text-sm">
                        <thead className="bg-black text-white">
                            <tr>
                                <th className="px-4 py-2 border border-gray-700 cursor-pointer" onClick={() => handleSort("id")}>
                                    # 
                                </th>
                                <th className="px-4 py-2 border border-gray-700 cursor-pointer" onClick={() => handleSort("name")}>
                                    Name {sortConfig.key === "id" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                                </th>
                                <th className="px-4 py-2 border border-gray-700 cursor-pointer" onClick={() => handleSort("email")}>Email</th>
                                <th className="px-4 py-2 border border-gray-700 cursor-pointer" onClick={() => handleSort("phone_no")}>Phone No</th>
                                <th className="px-4 py-2 border border-gray-700 cursor-pointer" onClick={() => handleSort("course")}>Course</th>
                                <th className="px-4 py-2 border border-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className={`border border-gray-700 hover:text-orange-400 transition cursor-pointer `}
                                        onClick={() => handleRowClick(item)}
                                    >
                                        <td className="px-4 py-2 border border-gray-700">
                                            {startIndex + index + 1}{" "}
                                            {duplicateRows.includes(item.id) && (
                                                <span className="inline-block w-2.5 h-2.5 bg-red-500 rounded-full ml-2 animate-blink"></span>
                                            )}
                                        </td>
                                        <td className="px-4 py-2 border border-gray-700">{item.name}</td>
                                        <td className="px-4 py-2 border border-gray-700">{item.email}</td>
                                        <td className="px-4 py-2 border border-gray-700">{item.phone_no}</td>
                                        <td className="px-4 py-2 border border-gray-700">{item.course}</td>
                                        <td className="px-4 py-2 border border-gray-700">
                                            <button
                                                className="bg-red-500 hover:bg-black text-white py-1 px-3 rounded"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(item.id);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4 text-gray-400">
                                        No records found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
                <button
                    className={`px-4 py-2 mx-2 ${currentPage === 1 ? "bg-gray-600 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} text-white rounded`}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="text-white px-4 py-2">Page {currentPage} of {totalPages}</span>
                <button
                    className={`px-4 py-2 mx-2 ${currentPage === totalPages ? "bg-gray-600 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} text-white rounded`}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default RegistrationTable;
