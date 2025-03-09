import { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import RegistrationTable from "./RegistrationTable";
import Reviews from "./Reviews";
import Dashboard from "./Dashboard";

// Admin navigation items
const adminNavigation = [
  { name: "Dashboard", section: "Dashboard" },
  { name: "Registrations", section: "Registrations" },
  { name: "Reviews", section: "Reviews" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Login Component
function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`https://backend-way2skills.onrender.com/api/v1/admin/login`, {
        method: "POST",
        
        headers: { "accept":"application/json","Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
       
      });
      console.log(JSON.stringify({ email, password }));
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        onLogin(true);
      } else {
        setError(data.detail || "Invalid email or password!");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black/90 text-white">
      <div className="bg-black/70 p-8 rounded-lg shadow-lg border border-neutral-800 backdrop-blur-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Admin Login</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring focus:ring-gray-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring focus:ring-gray-500"
            required
          />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

// Admin Component
export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [activeSection, setActiveSection] = useState("Dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/admin/login");
  };

  if (!isAuthenticated) {
    return <Login onLogin={setIsAuthenticated} />;
  }

  return (
    <div className="flex h-screen bg-black/90 text-white">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 flex-col border-r border-neutral-800 bg-black/70 backdrop-blur-lg p-4">
        <div className="flex items-center justify-between pb-6 border-b border-neutral-700">
          <div className="flex items-center space-x-2">
            <img className="h-10 w-10 border-2 bg-white border-white rounded-full" src={logo} alt="Logo" />
            <span className="text-xl font-semibold">Admin Panel</span>
          </div>
          <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-600">
            Logout
          </button>
        </div>
        <nav className="mt-6 space-y-2">
          {adminNavigation.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveSection(item.section)}
              className={classNames(
                "block w-full text-left px-4 py-2 rounded-md text-sm font-medium",
                activeSection === item.section ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
              )}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <Disclosure as="nav" className="md:hidden bg-black/70 backdrop-blur-lg border-b border-neutral-800 fixed w-full z-50">
        {({ open }) => (
          <>
            <div className="flex justify-between items-center px-4 py-3">
              <div className="flex items-center space-x-2">
                <img className="h-10 w-10 border-2 bg-white border-white rounded-full" src={logo} alt="Logo" />
                <span className="text-xl font-semibold">Admin</span>
              </div>
              <Disclosure.Button className="text-gray-400 hover:text-white focus:outline-none">
                {open ? <XMarkIcon className="size-6" /> : <Bars3Icon className="size-6" />}
              </Disclosure.Button>
            </div>

            <Disclosure.Panel className="px-4 pb-3">
              {adminNavigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="button"
                  onClick={() => setActiveSection(item.section)}
                  className={classNames(
                    "block w-full text-left rounded-md px-3 py-2 text-base font-medium",
                    activeSection === item.section ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <button
                onClick={handleLogout}
                className="block w-full text-left mt-2 text-red-500 hover:text-red-600 px-3 py-2"
              >
                Logout
              </button>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-semibold">{activeSection}</h1>
        {activeSection === "Registrations" && <RegistrationTable />}
        {activeSection === "Reviews" && <Reviews />}
        {activeSection === "Dashboard" && <Dashboard />}
      </div>
    </div>
  );
}
