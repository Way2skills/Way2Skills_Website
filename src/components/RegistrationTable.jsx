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

    const API_URL = "https://backend-way2skills.onrender.com/api/v1/register/";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}registrations/`,{ maxRedirects: 5 });
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
        setCurrentPage(1);
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
                                <th className="px-4 py-2 border border-gray-700">#</th>
                                <th className="px-4 py-2 border border-gray-700">Name</th>
                                <th className="px-4 py-2 border border-gray-700">Email</th>
                                <th className="px-4 py-2 border border-gray-700">Phone No</th>
                                <th className="px-4 py-2 border border-gray-700">Course</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((item, index) => (
                                <tr key={item.id} onClick={() => handleRowClick(item)} className="cursor-pointer hover:bg-gray-800">
                                    <td className="px-4 py-2 border border-gray-700">{startIndex + index + 1}</td>
                                    <td className="px-4 py-2 border border-gray-700">{item.name}</td>
                                    <td className="px-4 py-2 border border-gray-700">{item.email}</td>
                                    <td className="px-4 py-2 border border-gray-700">{item.phone_no}</td>
                                    <td className="px-4 py-2 border border-gray-700">{item.course}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {selectedRecord && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-1/2">
                        <h3 className="text-xl font-semibold mb-4">Transaction Details</h3>
                        <p><strong>Transaction ID:</strong> {selectedRecord.transactionId}</p>
                        <img src={`data:image/png;base64,${selectedRecord.file_base64}`} alt="Transaction" className="w-full mt-4" />
                        <button onClick={closeModal} className="mt-4 bg-red-500 px-4 py-2 rounded">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegistrationTable;
