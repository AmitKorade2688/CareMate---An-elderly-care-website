import React, { useState, useEffect } from 'react';
import blogImg from '../assets/blogImg.jpeg';
import { assests } from '../constants';
import ChatbotModal from './ChatBotModal'; // Import ChatbotModal
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

const Blog = () => {
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
    <div className="relative bg-gray-100 min-h-screen flex flex-col p-6">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-cover bg-center bg-opacity-70" style={{ backgroundImage: `url(${assests.aboutImg3})` }}>
        <div className="w-full h-full bg-black opacity-80 absolute"></div>
        <div className={`relative z-10 text-center mt-40 transition-all duration-1000 ease-in-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <h2 className="text-4xl font-bold text-white mb-4">Blogs</h2>
          <p className="text-orange-500 mt-2 text-lg">Your go-to resource for navigating the challenges of caring for seniors.</p>
        </div>
      </div>

      <div className="relative bg-white shadow-md rounded-lg overflow-hidden w-full max-w-6xl flex flex-col md:flex-row items-center justify-center mt-60 mx-auto z-10 p-7 h-[600px]">
        <div className="w-full md:w-1/2 pt-3 h-full flex items-center">
          <img src={blogImg} alt="About Us" className="object-cover w-full h-full rounded-lg" />
        </div>
        <div className={`w-full md:w-1/2 p-10 pt-3 flex flex-col h-full text-left justify-start transition-all duration-1000 ease-in-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <h1 className="text-4xl font-bold mb-4">The Benefits of Regular Check-ups for Seniors</h1>
          <h3 className="text-lg text-gray-700 mb-4">Prioritizing the health of seniors is essential for early detection of diseases and overall well-being.</h3>
          <p className="text-gray-700 mb-4">
            Regular check-ups allow for early diagnosis of potential health issues and ensure seniors are receiving the necessary care. These appointments help to monitor chronic conditions like diabetes, high blood pressure, and arthritis, while also addressing any new symptoms or concerns. 
            <br /><br />
            Additionally, regular screenings for vision, hearing, and cognitive functions help in maintaining a high quality of life. Ensuring that seniors stay up-to-date with vaccinations, such as flu shots and pneumonia vaccines, is equally important in preventing serious illnesses.
            <br /><br />
            Lastly, caregivers and family members should attend these check-ups whenever possible to stay informed about the senior's health.
          </p>
        </div>
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

export default Blog;
