import React, { useState } from "react";

const ContactUs = ({ closeModal }) => {
  const [formData, setFormData] = useState({ name: "", email: "", phone_no: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const apiUrl = "https://sheetdb.io/api/v1/ibhm2ntqwhwsr";
    const payload = { data: { name: formData.name, Email: formData.email, phone_no: formData.phone_no } };

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
        setFormData({ name: "", email: "", phone_no: "" });
        closeModal(); // Close the modal after successful submission
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
    <div className="p-8 backdrop-blur-lg border border-neutral-700 rounded-xl w-full flex flex-col shadow-lg bg-black/10 z-3">
      <h2 className="text-4xl font-bold mb-6 text-center">Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full p-3 border rounded border-neutral-700 mb-4 bg-black focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full p-3 border rounded mb-4 border-neutral-700 bg-black focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="tel"
          name="phone_no"
          value={formData.phone_no}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="w-full p-3 border rounded mb-4 border-neutral-700 bg-black focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full p-3 text-white rounded-lg font-semibold transition duration-200 ${
            isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
