import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const InfoSubmission = () => {
    const [medications, setMedications] = useState([]);
    const [appointmentDates, setAppointmentDates] = useState({
        date: '',
        time: '',
        type: ''
    });
    const [dailyRoutine, setDailyRoutine] = useState({
        activities: '',
        diet: '',
        sleep: ''
    });
    const [showDialog, setShowDialog] = useState(false); // State to control the dialog visibility
    const navigate = useNavigate(); // Initialize navigate

    const handleMedChange = (e, index) => {
        const { name, value } = e.target;
        const newMedications = [...medications];
        newMedications[index] = { ...newMedications[index], [name]: value };
        setMedications(newMedications);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const appointmentData = {
                medications: medications,
                nextAppointmentDate: appointmentDates.date,
                nextAppointmentTime: appointmentDates.time,
                appointmentType: appointmentDates.type,
                dailyActivities: dailyRoutine.activities,
                diet: dailyRoutine.diet,
                sleepSchedule: dailyRoutine.sleep
            };

            // Send data to the server
            const response = await axios.post('http://localhost:5000/api/appointments', appointmentData);
            console.log('Info Submission Response:', response.data);
            setShowDialog(true); // Show dialog on successful submission
        } catch (error) {
            console.error('Error submitting information:', error);
        }
    };

    const handleCloseDialog = () => {
        setShowDialog(false); // Close dialog
    };

    const handleSeeSchedule = () => {
        navigate('/read-only-info'); // Navigate to the ReadOnlyInfoDisplay component
    };

    // Format date and time for display
    const formatAppointment = () => {
        if (appointmentDates.date && appointmentDates.time) {
            const appointmentDate = new Date(appointmentDates.date);
            const formattedDate = appointmentDate.toLocaleDateString(); // Format date
            const formattedTime = new Date(`1970-01-01T${appointmentDates.time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format time
            return `Next Appointment: ${appointmentDates.type} on ${formattedDate} at ${formattedTime}`;
        }
        return '';
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md mt-10">
                <h2 className="text-3xl font-semibold mb-6">Additional Information</h2>

                {/* Medications Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Medications</h3>
                    {medications.map((med, index) => (
                        <div key={index} className="mb-4">
                            <input
                                type="text"
                                name="name"
                                value={med.name || ''}
                                onChange={(e) => handleMedChange(e, index)}
                                placeholder="Medication Name"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                            <input
                                type="text"
                                name="dose"
                                value={med.dose || ''}
                                onChange={(e) => handleMedChange(e, index)}
                                placeholder="Dosage"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                            />
                            <input
                                type="time"
                                name="time"
                                value={med.time || ''}
                                onChange={(e) => handleMedChange(e, index)}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                            />
                        </div>
                    ))}
                    <button type="button" onClick={() => setMedications([...medications, {}])} className="mb-4 text-teal-500">Add Medication</button>
                </div>

                {/* Next Appointment Section */}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Next Appointment</h3>
                    <input
                        type="date"
                        value={appointmentDates.date}
                        onChange={(e) => setAppointmentDates({ ...appointmentDates, date: e.target.value })}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="time"
                        value={appointmentDates.time}
                        onChange={(e) => setAppointmentDates({ ...appointmentDates, time: e.target.value })}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                    />
                    <select
                        value={appointmentDates.type}
                        onChange={(e) => setAppointmentDates({ ...appointmentDates, type: e.target.value })}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                    >
                        <option value="">Select Appointment Type</option>
                        <option value="In-person">In-person</option>
                        <option value="Video Call">Video Call</option>
                    </select>
                </div>

                {/* Formatted Appointment Output */}
                {formatAppointment() && (
                    <p className="text-lg font-semibold text-green-500 mb-4">
                        {formatAppointment()}
                    </p>
                )}

                {/* Daily Routine Section */}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Daily Routine</h3>
                    <textarea
                        value={dailyRoutine.activities}
                        onChange={(e) => setDailyRoutine({ ...dailyRoutine, activities: e.target.value })}
                        placeholder="Daily Activities"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                    <textarea
                        value={dailyRoutine.diet}
                        onChange={(e) => setDailyRoutine({ ...dailyRoutine, diet: e.target.value })}
                        placeholder="Diet"
                        className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                    />
                    <textarea
                        value={dailyRoutine.sleep}
                        onChange={(e) => setDailyRoutine({ ...dailyRoutine, sleep: e.target.value })}
                        placeholder="Sleep Schedule"
                        className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                    />
                </div>

                <button type="submit" className="w-full p-3 text-white bg-teal-500 rounded-lg hover:bg-teal-600">
                    Submit Information
                </button>
                <button type="button" onClick={handleSeeSchedule} className="mt-4 w-full p-3 text-white bg-teal-500 rounded-lg hover:bg-teal-600">
                    See Your Schedule
                </button>
            </form>

            {/* Dialog Box */}
            {showDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <h3 className="text-xl font-semibold mb-4">Thanks!</h3>
                        <p>Your information has been submitted successfully.</p>
                        <button
                            onClick={handleCloseDialog}
                            className="mt-4 w-full p-2 text-white bg-teal-600 rounded-lg transition duration-300 hover:bg-orange-500"
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InfoSubmission;
