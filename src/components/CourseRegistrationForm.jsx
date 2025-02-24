import React, { useState } from "react";

const CourseRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone_no: "",
    email: "",
    date: "",
    course: "",
    duration: "30 DAYS",
    transactionId: "",
  });

  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setPaymentScreenshot(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const apiUrl = "http://127.0.0.1:8000/register/"; // FastAPI backend

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    if (paymentScreenshot) {
      formDataToSend.append("file", paymentScreenshot);
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formDataToSend,
        headers: {
          "Accept": "application/json",
        },
      });

      const result = await response.json();

      if (response.ok) {
        alert("Registration is successful! 🎉");

        // Reset form after successful registration
        setFormData({
          name: "",
          phone_no: "",
          email: "",
          date: "",
          course: "",
          duration: "30 DAYS",
          transactionId: "",
        });
        setPaymentScreenshot(null);

        // Redirect to home page after 2 seconds
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
        alert(`Submission success! ${result.detail}`);
      } 
      
    }  finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form
        onSubmit={handleSubmit}
        className="p-8 border border-gray-700 rounded-xl w-full sm:w-96 backdrop-blur-lg flex flex-col m-5 shadow-lg bg-gray-900"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Course Registration
        </h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full p-3 mb-3 border border-gray-600 bg-black text-white rounded-md outline-none"
        />

        <input
          type="tel"
          name="phone_no"
          value={formData.phone_no}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="w-full p-3 mb-3 border border-gray-600 bg-black text-white rounded-md outline-none"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full p-3 mb-3 border border-gray-600 bg-black text-white rounded-md outline-none"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full p-3 mb-3 border border-gray-600 bg-black text-white rounded-md outline-none"
        />

        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
          className="w-full p-3 mb-3 border border-gray-600 bg-black text-white rounded-md outline-none"
        >
          <option value="">Select a Course</option>
          <option value="CORE JAVA">CORE JAVA</option>
          <option value="C,C++">C, C++</option>
          <option value="PYTHON">PYTHON</option>
          <option value="JAVA FULL STACK">JAVA FULL STACK (20,000)</option>
          <option value="MySQL">MySQL (3,000)</option>
          <option value="REACT JS">REACT JS (15,000)</option>
          <option value="PHOTOSHOP">PHOTOSHOP</option>
          <option value="COMBINED COURSES">COMBINED COURSES (7,000)</option>
        </select>

        <input
          type="text"
          name="transactionId"
          value={formData.transactionId}
          onChange={handleChange}
          placeholder="Transaction ID"
          required
          className="w-full p-3 mb-3 border border-gray-600 bg-black text-white rounded-md outline-none"
        />

        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          placeholder="choose the screenshot"
          required
          className="w-full p-3 mb-3 border border-gray-600 bg-black text-white rounded-md outline-none"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full p-3 font-bold text-white rounded-md cursor-pointer transition duration-300 ${
            isSubmitting
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default CourseRegistrationForm;