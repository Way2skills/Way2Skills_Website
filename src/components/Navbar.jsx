import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.png";
import { navItems } from "../constants";
import ContactUs from "./ContactUs"; // Import the ContactUs component

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleNavbar = () => setMobileDrawerOpen(!mobileDrawerOpen);
  const closeNavbar = () => setMobileDrawerOpen(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-800/80 bg-black/50">
        <div className="container px-4 mx-auto relative lg:text-sm">
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <div className="flex items-center flex-shrink-0">
              <img className="h-16 w-16 mr-2 border-2 border-white bg-[#e3e8e8]" src={logo} alt="Logo" />
              <span className="text-xl tracking-tight text-white">Way2Skills</span>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex ml-14 space-x-12">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a className="text-white px-4 py-2 hover:text-orange-500 transition" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={openModal}
                  className="px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-500 hover:text-white transition"
                >
                  Contact Us
                </button>
              </li>
            </ul>

            {/* Mobile Menu Button */}
            <div className="lg:hidden md:flex">
              <button onClick={toggleNavbar} className="text-white">
                {mobileDrawerOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer */}
          {mobileDrawerOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-90 z-40 flex flex-col items-center justify-center">
              <button onClick={closeNavbar} className="absolute top-5 right-5 text-white hover:text-gray-400">
                <X size={32} />
              </button>
              <ul className="text-center text-white space-y-6 text-xl">
                {navItems.map((item, index) => (
                  <li key={index} onClick={closeNavbar}>
                    <a className="hover:text-orange-500 transition" href={item.href}>
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => {
                      closeNavbar();
                      openModal();
                    }}
                    className="px-6 py-3 border border-orange-500 text-orange-500 rounded hover:bg-orange-500 hover:text-white transition"
                  >
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* Contact Us Modal */}
      {isModalOpen && (
        <div className="fixed inset-0  flex items-center justify-center backdrop-blur-lg bg-black bg-opacity-50 z-50">
          <div className="bg-black backdrop-blur-lg border border-neutral-700 p-9 rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/3 relative">
            <button onClick={closeModal} className="absolute top-4 right-4 text-white hover:text-gray-400 z-5">
              <X size={24} />
            </button>
            <ContactUs closeModal={closeModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
