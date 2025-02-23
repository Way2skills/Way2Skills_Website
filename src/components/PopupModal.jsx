import React, { useState } from "react";
import Modal from "react-modal";
import Banner from "../assets/banner.jpeg";

Modal.setAppElement("#root");

const PopupModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-lg p-5 max-w-lg relative">
      <button
        className="absolute top-2 right-2 text-xl font-bold text-black hover:text-gray-800 focus:outline-none"
        onClick={() => setIsOpen(false)}
        >
        ✕
        </button>

        <img
          src={Banner}
          alt="Hackathon Popup"
          className="w-full h-auto"
        />
      </div>
    </Modal>
  );
};

export default PopupModal;
