import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const CourseRegistrationForm = () => {
  const [studentName, setStudentName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const scriptURL = 'https://script.google.com/macros/s/AKfycbxLCbGYPkVpGindGejiVk8ua-PT6whUYsaNEyy2T6Sb_-VZV3Y8lV0ptA9iuaQvUq3Now/exec';

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      StudentName: studentName,
      Email: email,
      PhoneNumber: phoneNumber,
      Date: new Date().toISOString(), // Sending Date as expected in Google Sheets
    };

    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.result === 'success') {
        alert('Form submitted successfully!');
        setStudentName('');
        setEmail('');
        setPhoneNumber('');
      } else {
        alert('Error submitting form: ' + result.error);
      }
    } catch (error) {
      alert('Network error: ' + error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <form onSubmit={handleSubmit} className="m-5">
          <div className="p-9 rounded-xl flex flex-col h-full">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-8 tracking-wide">
              Register
            </h2>
            <div className="mt-5">
              <label htmlFor="studentName" className="text-3xl">
                STUDENT NAME
              </label>
              <input
                type="text"
                id="studentName"
                value={studentName}
                className="inline-flex justify-center items-center text-center w-full h-12 p-5 mt-10 tracking-tight text-xl rounded-lg transition duration-200"
                onChange={(e) => setStudentName(e.target.value)}
                required
              />
            </div>
            <div className="mt-5">
              <label htmlFor="email" className="text-3xl">
                EMAIL ID
              </label>
              <input
                type="email"
                id="email"
                value={email}
                className="inline-flex justify-center items-center text-center w-full h-12 p-5 mt-10 tracking-tight text-xl rounded-lg transition duration-200"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-5">
              <label htmlFor="phoneNumber" className="text-3xl">
                PHONE NUMBER
              </label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                className="inline-flex justify-center items-center text-center w-full h-12 p-5 mt-10 tracking-tight text-xl rounded-lg transition duration-200"
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="inline-flex justify-center items-center text-center w-full h-12 p-5 mt-5 tracking-tight text-xl hover:bg-orange-500 border border-orange-900 rounded-lg transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
        <Footer />
      </div>
    </>
  );
};

export default CourseRegistrationForm;
