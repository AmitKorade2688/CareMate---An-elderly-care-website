import React, { useState, useEffect } from 'react';
import careersImg from '../assets/careersImg.jpg'; // Import the careers image
import { assests } from '../constants';

const Careers = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    careType: '',
    startDate: '',
    timeSchedule: '',
    recurringSchedule: '',
    serviceLocation: '',
    additionalServices: '',
    specialInstructions: '',
    emergencyContact: '',
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
      const response = await fetch('http://localhost:5000/api/careers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result);
      setShowDialog(true); // Show the dialog upon successful submission
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false); // Close the dialog
    setFormData({ // Reset the form fields
      fullName: '',
      email: '',
      phone: '',
      careType: '',
      startDate: '',
      timeSchedule: '',
      recurringSchedule: '',
      serviceLocation: '',
      additionalServices: '',
      specialInstructions: '',
      emergencyContact: '',
    });
  };

  return (
    <div className="relative bg-gray-100 min-h-screen flex flex-col p-6">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-cover bg-center bg-opacity-70" style={{ backgroundImage: `url(${assests.aboutImg3})` }}>
        <div className="w-full h-full bg-black opacity-80 absolute"></div>
        <div className={`relative z-10 text-center mt-40 transition-all duration-1000 ease-in-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <h1 className="text-5xl font-bold text-white mb-4">Join US</h1>
          <p className="text-gray-300 mt-2 text-lg">Join Us and Contribute back to the society !</p> <br />
          <h2 className="text-4xl font-bold text-orange-500 mb-4">Apply Now!</h2>
        </div>
      </div>

      <div className="relative bg-white shadow-md rounded-lg overflow-hidden w-full max-w-9xl flex flex-col items-center justify-center mt-96 mx-auto z-10 p-7 h-[1300px]">
        <div className={`relative p-10 pt-3 flex flex-col h-full text-left justify-start transition-all duration-1000 ease-in-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <h2 className="text-2xl font-bold mb-4 text-black">Hire a Caregiver or Nurse</h2>
          <p className="text-gray-700 mb-4">Please fill out the form below to hire a caregiver. Ensure to provide accurate details to get the best service.</p>

          <form onSubmit={handleSubmit}>
            {/* Form fields */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" name="fullName" placeholder="Enter full name" className="mt-1 p-2 border rounded w-full" value={formData.fullName} onChange={handleChange} required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" name="email" placeholder="Enter email address" className="mt-1 p-2 border rounded w-full" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input type="tel" name="phone" placeholder="Enter phone number" className="mt-1 p-2 border rounded w-full" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Type of Care Required</label>
              <select name="careType" className="mt-1 p-2 border rounded w-full" value={formData.careType} onChange={handleChange}>
                <option value="">Select Care Type</option>
                <option value="In-Home Care">In-Home Care</option>
                <option value="Nursing Services">Nursing Services</option>
                <option value="Companionship">Companionship</option>
                <option value="Personal Care">Personal Care</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Preferred Start Date</label>
              <input type="date" name="startDate" className="mt-1 p-2 border rounded w-full" value={formData.startDate} onChange={handleChange} required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Time Schedule</label>
              <input type="text" name="timeSchedule" placeholder="e.g. 9:00 AM - 5:00 PM" className="mt-1 p-2 border rounded w-full" value={formData.timeSchedule} onChange={handleChange} required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Recurring Schedule</label>
              <select name="recurringSchedule" className="mt-1 p-2 border rounded w-full" value={formData.recurringSchedule} onChange={handleChange}>
                <option value="">Select Recurring Option</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="One-time">One-time</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Service Location (Address)</label>
              <input type="text" name="serviceLocation" placeholder="Enter address" className="mt-1 p-2 border rounded w-full" value={formData.serviceLocation} onChange={handleChange} required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Additional Services</label>
              <textarea name="additionalServices" placeholder="Household Tasks (cleaning, groceries, etc.)" className="mt-1 p-2 border rounded w-full" rows="3" value={formData.additionalServices} onChange={handleChange}></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Special Instructions</label>
              <textarea name="specialInstructions" placeholder="Any specific needs or preferences" className="mt-1 p-2 border rounded w-full" rows="3" value={formData.specialInstructions} onChange={handleChange}></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
              <input type="text" name="emergencyContact" placeholder="Enter emergency contact details" className="mt-1 p-2 border rounded w-full" value={formData.emergencyContact} onChange={handleChange} required />
            </div>
            <button type="submit" className="bg-teal-600 text-white px-6 py-3 mt-4 rounded-md transition duration-300 ease-in-out transform hover:bg-orange-600 hover:scale-105">
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Dialog Box */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-4">Thanks for applying!</h3>
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

export default Careers;
