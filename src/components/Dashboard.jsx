import { useState, useEffect } from "react";
import { UserGroupIcon, StarIcon } from "@heroicons/react/24/outline";

const Dashboard = () => {
  const [registrations, setRegistrations] = useState(0);
  const [reviews, setReviews] = useState(0);

  useEffect(() => {
    fetch("https://backend-way2skills.onrender.com/api/v1/register/registrations")
      .then((res) => res.json())
      .then((data) => setRegistrations(data.length))
      .catch((err) => console.error("Error fetching registrations:", err));

    fetch("https://backend-way2skills.onrender.com/api/v1/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data.length))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Registration Card */}
      <div className="flex items-center justify-between w-full p-6 rounded-xl shadow-md bg-gradient-to-br from-yellow-400 to-red-500 text-white transition-transform transform hover:scale-105">
        <div>
          <h2 className="text-lg font-bold">Registrations</h2>
          <p className="text-2xl font-semibold mt-2">{registrations}</p>
        </div>
        <UserGroupIcon className="size-12 opacity-80" />
      </div>

      {/* Reviews Card */}
      <div className="flex items-center justify-between w-full p-6 rounded-xl shadow-md bg-gradient-to-br from-blue-400 to-indigo-500 text-white transition-transform transform hover:scale-105">
        <div>
          <h2 className="text-lg font-bold">Reviews</h2>
          <p className="text-2xl font-semibold mt-2">{reviews}</p>
        </div>
        <StarIcon className="size-12 opacity-80" />
      </div>
    </div>
  );
};

export default Dashboard;