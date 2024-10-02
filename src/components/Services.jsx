import React, { useEffect, useState } from 'react';
import service1 from '../assets/service1.jpg';
import service2 from '../assets/service2.jpg';
import service3 from '../assets/service3.jpg';
import service4 from '../assets/service4.jpg';
import service5 from '../assets/service5.jpg';
import service6 from '../assets/service6.jpg';
import ChatbotModal from './ChatBotModal'; // Import ChatbotModal
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChatbotClick = () => {
    setIsChatbotOpen(true);
  };

  const closeChatbot = () => {
    setIsChatbotOpen(false);
  };

  return (
    <div className="flex flex-col p-4 h-[150vh] bg-gray-100">
      <h1 className="text-3xl font-bold text-center mt-20">Empowering Elders with Trust and Care</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-20">
        {[
          { title: 'Special Care', img: service1, description: 'Providing personalized care plans tailored to each elder’s needs, ensuring comfort and security.' },
          { title: 'Medical Check', img: service2, description: 'Regular health assessments and monitoring to keep track of vital signs and overall wellness.' },
          { title: 'Senior Care', img: service3, description: 'Dedicated caregivers to assist with daily activities, fostering independence and dignity.' },
          { title: 'Emergency Service', img: service4, description: '24/7 emergency response team ready to assist seniors in case of unforeseen circumstances.' },
          { title: 'Homecare Visit', img: service5, description: 'In-home visits by qualified professionals to provide medical care and companionship.' },
          { title: 'Senior Therapy', img: service6, description: 'Therapeutic services including physical, occupational, and speech therapy to enhance mobility and communication.' },
        ].map((service, index) => (
          <div
            key={index}
            className={`card bg-white shadow-lg rounded-lg p-4 relative w-[90%] mx-auto my-4 border transform transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            <img src={service.img} alt={service.title} className="w-20 h-20 object-cover border rounded-md absolute -top-10 left-4" />
            <div className="pt-16">
              <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <a href="#" className="text-blue-500 hover:underline">Learn more</a>
            </div>
          </div>
        ))}
      </div>

      {/* ChatGPT Button with Parallax Effect */}
      <button
        className="fixed w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center shadow-lg transition-transform transform hover:scale-110 z-50"
        style={{
          bottom: `${30 - scrollY * 0.1}px`,
          right: '20px',
        }}
        onClick={handleChatbotClick}
        aria-label="Chat with ChatGPT"
      >
        <FontAwesomeIcon icon={faComments} size="lg" />
      </button>

      {/* Chatbot Modal */}
      <ChatbotModal isOpen={isChatbotOpen} onClose={closeChatbot} />
    </div>
  );
};

export default Services;
