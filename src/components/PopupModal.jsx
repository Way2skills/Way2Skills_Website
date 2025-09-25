import React, { useState } from "react";
import Modal from "react-modal";
import Poster from "../../poster.jpg";

Modal.setAppElement("#root");

const PopupModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleImageClick = () => {
    window.open("https://way2skills-vijayadas-bdbu.bolt.host", "_blank");
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-70"
    >
      <div className="bg-white rounded-lg shadow-2xl p-3 max-w-md w-full max-h-[80vh] mx-4 relative animate-fade-in overflow-hidden">
        <button
          className="absolute top-3 right-3 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-lg font-bold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
          onClick={() => setIsOpen(false)}
          aria-label="Close popup"
        >
          ✕
        </button>

        <img
          src={Poster}
          alt="Way2Skills Poster"
          className="w-full h-auto object-contain cursor-pointer hover:opacity-90 transition-opacity duration-200"
          onClick={handleImageClick}
          title="Click to view special offer"
        />
      </div>
    </Modal>
  );
};

export default PopupModal;
