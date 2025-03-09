import { useState, useEffect } from "react";
import { UserGroupIcon, StarIcon } from "@heroicons/react/24/outline";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement);

const Dashboard = () => {
  const [registrations, setRegistrations] = useState(0);
  const [reviews, setReviews] = useState(0);
  const [reviewStats, setReviewStats] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const regRes = await fetch("https://backend-way2skills.onrender.com/api/v1/register/registrations");
        const regData = await regRes.json();
        setRegistrations(regData.length);

        const revRes = await fetch("https://backend-way2skills.onrender.com/api/v1/reviews");
        const revData = await revRes.json();
        setReviews(revData.length);

        const reviewCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        revData.forEach(review => {
          if (reviewCounts[review.rating] !== undefined) {
            reviewCounts[review.rating]++;
          }
        });
        setReviewStats(reviewCounts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []);

  const cards = [
    {
      title: "Registrations",
      value: registrations,
      icon: <UserGroupIcon className="size-12 opacity-80" />, 
      bgColor: "bg-gradient-to-br from-yellow-400 to-red-500"
    },
    {
      title: "Reviews",
      value: reviews,
      icon: <StarIcon className="size-12 opacity-80" />, 
      bgColor: "bg-gradient-to-br from-blue-400 to-indigo-500"
    }
  ];

  const chartData = {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [
      {
        label: "Review Count",
        data: [reviewStats[1], reviewStats[2], reviewStats[3], reviewStats[4], reviewStats[5]],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderWidth: 2,
        pointBackgroundColor: "#3B82F6",
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`flex items-center justify-between w-full p-6 rounded-xl shadow-md text-white transition-transform transform hover:scale-105 ${card.bgColor}`}
          >
            <div>
              <h2 className="text-lg font-bold">{card.title}</h2>
              <p className="text-2xl font-semibold mt-2">{card.value}</p>
            </div>
            {card.icon}
          </div>
        ))}
      </div>
      
      {/* Review Insights Graph */}
      <div className="mt-10 p-6 bg-black shadow-md rounded-xl text-white">
        <h2 className="text-xl font-bold mb-4">Review Insights</h2>
        <div className="h-64">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;