import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CourseRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    studyingYear: "",
    phone_no: "",
    email: "",
    date: "",
    course: "",
    duration: "30 DAYS",
    referralCode: "",
    transactionId: "",
    paymentScreenshot: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, paymentScreenshot: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const apiUrl = "https://sheetdb.io/api/v1/wwtucvsb8dzob";
    const payload = { data: formData };

    console.log("Submitting Data:", payload);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("Response:", result);

      if (response.ok) {
        alert("Form submitted successfully! 🎉");
        setFormData({
          name: "",
          studyingYear: "",
          phone_no: "",
          email: "",
          date: new Date(),
          course: "",
          duration: "30 DAYS",
          referralCode: "",
          transactionId: "",
          paymentScreenshot: null,
        });
      } else {
        alert("Submission failed! Check the console for details.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    
        <div className="flex items-center justify-center ">
          <form
            onSubmit={handleSubmit}
            className="p-8 border  border-neutral-700 rounded-xl w-full sm:w-full md:w-full lg:w-full backdrop-blur-lg flex flex-col m-5 shadow-lg bg-black"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Course Registration</h2>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="w-full border-neutral-700 bg-black p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            <input type="text" name="studyingYear" value={formData.studyingYear} onChange={handleChange} placeholder="Studying Year" required className="w-full border-neutral-700 bg-black p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            <input type="tel" name="phone_no" value={formData.phone_no} onChange={handleChange} placeholder="Phone Number" required className="w-full border-neutral-700 bg-black p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full border-neutral-700 bg-black p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            {/* <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full border-neutral-700 bg-black p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500" /> */}
            <select name="course" value={formData.course} onChange={handleChange} required className="w-full border-neutral-700 bg-black p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500">
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
            <input type="text" name="referralCode" value={formData.referralCode} onChange={handleChange} placeholder="Referral Code" className="w-full border-neutral-700 p-3 bg-black border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            <input type="text" name="transactionId" value={formData.transactionId} onChange={handleChange} placeholder="Transaction ID" required className="w-full border-neutral-700 p-3 bg-black border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            {/* <input type="file" name="paymentScreenshot" onChange={handleFileChange} required className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500" /> */}
            <p className="text-sm mb-4">UPI Payment ID: <strong>durgaparamasivam755@okaxis</strong></p>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full p-3 text-white rounded-lg font-semibold transition duration-200 ${
                isSubmitting ? "bg-gray-400 cursor-not-allowed" : "inline-flex justify-center items-center text-center w-full h-12 p-5 tracking-tight text-xl hover:bg-orange-500 border border-orange-900 rounded-lg transition duration-200"
              }`}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
    
    
    </>
  );
};

export default CourseRegistrationForm;
