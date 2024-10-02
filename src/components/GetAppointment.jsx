import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GetAppointment = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        address: '',
        phone: '',
        date: '',
        notes: '',
        previousApplication: '',
        procedure: '',
    });

    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send data to the server (mocked or real endpoint)
            const response = await axios.post('http://localhost:5000/api/appointments', formData);
            console.log('Appointment Response:', response.data);

            // Navigate to InfoSubmission component on successful submission
            navigate('/info-submission');
        } catch (error) {
            console.error('Error submitting appointment:', error);
        }
    };

    const handleVideoChat = () => {
        window.open('https://meet.google.com/oym-frab-sdk', '_blank');
    };

    return (
        <div 
            className="min-h-[200vh] flex flex-col items-center justify-center bg-fixed bg-cover bg-center"
            style={{
                backgroundImage: `url('your-image-path.jpg')`, // Add the image path
                backgroundAttachment: 'fixed', // This enables the parallax effect
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}
        >
            <form
                className="bg-white backdrop-blur-md p-8 rounded-lg shadow-md w-full"
                onSubmit={handleSubmit}
            >
                <h2 className="text-3xl font-semibold text-black mb-6">Get Appointment</h2>

                {/* Form Fields */}
                <div className="mb-5">
                    <label className="block text-black mb-2 text-lg">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
                        placeholder="Enter your name"
                    />
                </div>

                <div className="mb-5">
                    <label className="block text-black mb-2 text-lg">Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
                        placeholder="Enter your age"
                    />
                </div>

                <div className="mb-5">
                    <label className="block text-black mb-2 text-lg">Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
                        placeholder="Enter your address"
                    />
                </div>

                <div className="mb-5">
                    <label className="block text-black mb-2 text-lg">Phone:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
                        placeholder="Enter your phone number"
                    />
                </div>

                <div className="mb-5">
                    <label className="block text-black mb-2 text-lg">Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
                    />
                </div>

                <div className="mb-5">
                    <label className="block text-black mb-2 text-lg">Notes:</label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
                        placeholder="Any additional notes"
                    />
                </div>

                <div className="mb-5">
                    <label className="block text-black mb-2 text-lg">Previous Application:</label>
                    <input
                        type="text"
                        name="previousApplication"
                        value={formData.previousApplication}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
                        placeholder="Enter details if any"
                    />
                </div>

                <div className="mb-5">
                    <label className="block text-black mb-2 text-lg">Procedure:</label>
                    <input
                        type="text"
                        name="procedure"
                        value={formData.procedure}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
                        placeholder="Enter procedure name"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="w-40 h-10 mt-5 bg-teal-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:bg-orange-600 hover:scale-105"
                    >
                        Submit Appointment
                    </button>

                    <button
                        type="button"
                        onClick={handleVideoChat}
                        className="w-40 h-10 mt-5 bg-teal-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:bg-orange-600 hover:scale-105"
                    >
                        Video Chat
                    </button>
                </div>
            </form>
        </div>
    );
};

export default GetAppointment;
