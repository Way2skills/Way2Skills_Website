import React from "react";
import Navbar from "./Navbar";

const RefundPolicy = () => {
  return (
    <>
    <Navbar/>
    <div className="flex justify-center">
    <div className="p-6 max-w-4xl mx-3 mt-20 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Refund and Cancellation policy</h1>

      <ul className="list-decimal ml-7">
      
      <li className="mb-4 text-gray-300 text-justify">
      You can cancel the course before starting date, in case of any refunds approved by way2skills , it will take 3 days ti credit to your bank account
      </li>
      <li className="mb-4 text-gray-300 text-justify">
      In case of any refunds approved by <b>WAY2SKILLS</b>, it will take <b>3 days</b> to credit to your bank account.
      </li>
      </ul>
    </div>
    </div>
    </>
  );
};

export default RefundPolicy;
