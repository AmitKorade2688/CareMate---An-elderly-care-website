import React, { useState, useEffect } from 'react';
import { assests } from '../constants';

const ContactUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [showDialog, setShowDialog] = useState(false); // State for dialog visibility

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result);
      setShowDialog(true); // Show the dialog upon successful submission
      setFormData({ // Reset form fields after submission
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false); // Close the dialog
  };

  return (
    <div className="relative bg-gray-100 min-h-screen flex flex-col items-center justify-center p-6">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-cover bg-center bg-opacity-70" style={{ backgroundImage: `url(${assests.contactTop})` }}>
        <div className="w-full h-full bg-black opacity-80 absolute"></div>
        <div className={`relative z-10 text-center mt-48 transition-all duration-1000 ease-in-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <h2 className="text-4xl font-bold text-white">Contact Us</h2>
          <p className="text-orange-500 mt-2 text-lg">If you have any questions or need assistance, <br /> our team of experienced healthcare professionals is here to help.</p>
        </div>
      </div>

      <div className="relative bg-white shadow-md rounded-lg overflow-hidden w-full max-w-5xl flex flex-col md:flex-row mt-72 z-10">
        <div className="w-full md:w-1/2">
          <img src={assests.docimg} alt="Contact Us" className="object-cover w-full h-[300px] md:h-full" />
        </div>
        <div className={`w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center transition-all duration-1000 ease-in-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Your Name</label>
              <input type="text" name="name" placeholder="Enter your first name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Your Email</label>
              <input type="email" name="email" placeholder="Enter your email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Message</label>
              <textarea name="message" placeholder="Write your message" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200" rows="4" value={formData.message} onChange={handleChange} required></textarea>
            </div>
            <button type="submit" className="w-full h-12 bg-teal-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:bg-orange-600 hover:scale-105">Submit</button>
          </form>
        </div>
      </div>

      {/* Dialog Box */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-4">Thanks for contacting us!</h3>
            <button
              onClick={handleCloseDialog}
              className="bg-teal-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:bg-orange-600 hover:scale-105"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
