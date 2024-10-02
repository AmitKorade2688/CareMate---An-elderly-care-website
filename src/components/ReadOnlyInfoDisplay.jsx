import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for data fetching
import remainder from '../assets/remainder.mp3'; // Reminder sound

const ReadOnlyInfoDisplay = () => {
    const [medications, setMedications] = useState([]);
    const [appointmentDates, setAppointmentDates] = useState({});
    const [dailyRoutine, setDailyRoutine] = useState({});
    const [reminderInterval, setReminderInterval] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Play reminder sound
    const playReminderSound = () => {
        const audio = new Audio(remainder);
        audio.play();
    };

    // Show popup reminder
    const showPopupReminder = (message) => {
        alert(message); // Can be enhanced with a custom modal
    };

    // Set reminder for medications or appointment
    const setReminder = (time, name, type) => {
        const currentTime = new Date();
        const eventTime = new Date();
        const [hours, minutes] = time.split(':');
        eventTime.setHours(hours, minutes, 0, 0);

        const timeDifference = (eventTime - currentTime) / (1000 * 60); // Difference in minutes

        if (timeDifference <= 30 && timeDifference >= 0) {
            const message = `${type} Reminder: ${name} is scheduled in ${Math.floor(timeDifference)} minutes!`;
            showPopupReminder(message);
            playReminderSound();
        }
    };

    // Start reminders
    const startReminders = () => {
        const interval = setInterval(() => {
            medications.forEach(medication => {
                setReminder(medication.time, medication.name, 'Medication');
            });

            if (appointmentDates.time) {
                setReminder(appointmentDates.time, appointmentDates.type, 'Appointment');
            }
        }, 60000); // Check every minute

        setReminderInterval(interval);
    };

    // Stop reminders
    const stopReminders = () => {
        clearInterval(reminderInterval);
    };

    // Fetch data from the server
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/appointments/latest');
                const data = response.data;

                console.log("Fetched Data:", data);

                setMedications(data.medications || []);
                setAppointmentDates({
                    date: data.nextAppointmentDate || '',
                    time: data.nextAppointmentTime || '',
                    type: data.appointmentType || ''
                });
                setDailyRoutine({
                    activities: data.dailyActivities || '',
                    diet: data.diet || '',
                    sleep: data.sleepSchedule || ''
                });
                setLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Start reminders when medications or appointment data changes
    useEffect(() => {
        if (medications.length > 0 || appointmentDates.time) {
            startReminders();
        }
    }, [medications, appointmentDates]);

    // Format date and time for display
    const formatAppointmentDate = (date) => {
        if (!date) return '';
        const formattedDate = new Date(date).toLocaleDateString();
        return formattedDate;
    };

    const formatAppointmentTime = (time) => {
        if (!time) return '';
        const [hour, minute] = time.split(':');
        const formattedTime = new Date(`1970-01-01T${hour}:${minute}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return formattedTime;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {loading ? (
                <div className="text-xl">Loading...</div>
            ) : error ? (
                <div className="text-xl text-red-600">{error}</div>
            ) : (
                <div className="bg-white p-8 rounded-lg shadow-md mt-10 w-4/5">
                    <h2 className="text-3xl font-semibold mb-6">Your Schedule</h2>

                    {/* Medications Section */}
                    <div className="mb-4">
                        <h3 className="text-2xl font-semibold">Medications:</h3>
                        {medications.length > 0 ? (
                            <ul className="list-disc pl-6">
                                {medications.map((med, index) => (
                                    <li key={index}>
                                        {med.name} - {med.dose} at {formatAppointmentTime(med.time)}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No medications scheduled.</p>
                        )}
                    </div>

                    {/* Appointment Section */}
                    <div className="mb-4">
                        <h3 className="text-2xl font-semibold">Next Appointment:</h3>
                        {appointmentDates.date ? (
                            <p>
                                {appointmentDates.type} on {formatAppointmentDate(appointmentDates.date)} at {formatAppointmentTime(appointmentDates.time)}
                            </p>
                        ) : (
                            <p>No upcoming appointments.</p>
                        )}
                    </div>

                    {/* Daily Routine Section */}
                    <div>
                        <h3 className="text-2xl font-semibold">Daily Routine:</h3>
                        <p><strong>Activities:</strong> {dailyRoutine.activities}</p>
                        <p><strong>Diet:</strong> {dailyRoutine.diet}</p>
                        <p><strong>Sleep Schedule:</strong> {dailyRoutine.sleep}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReadOnlyInfoDisplay;
