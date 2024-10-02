import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { assests } from '../constants';
import ChatbotModal from './ChatBotModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

const MainPage1 = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0); // State for tracking scroll position

  const handleGetStartedClick = () => {
    navigate('/services');
  };

  const handleChatGPTClick = () => {
    setIsChatbotOpen(true);
  };

  const closeChatbot = () => {
    setIsChatbotOpen(false);
  };

  // Handle parallax effect by updating scrollY state
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="w-full h-screen flex justify-center items-center relative"
      style={{
        backgroundImage: `url(${assests.mainPage1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-70" />

      {/* Content */}
      <div className="flex w-full h-full justify-center items-center relative z-10">
        <div className="left-part flex flex-col items-center w-[70%] justify-center space-y-8">
          <h1
            className={`font-bold text-5xl px-10 text-center text-white transition-all duration-1000 ease-in-out 
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            Caring Hands for Your Golden Years!
          </h1>
          <p
            className={`font-medium text-center px-10 text-orange-500 transition-all duration-1000 ease-in-out delay-200
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            Where Expertise Meets Compassion to Ensure the Well-Being of Your Loved Ones
          </p>
          <div
            className={`flex justify-center w-full transition-all duration-1000 ease-in-out delay-500 
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <button
              className="w-40 h-10 mt-5 bg-teal-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:bg-orange-600 hover:scale-105"
              onClick={handleGetStartedClick}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* ChatGPT Button with Parallax Effect */}
      <button
        className="fixed w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center shadow-lg transition-transform transform hover:scale-110 z-50" 
        style={{
          bottom: `${30 - scrollY * 0.1}px`, // Adjust based on scrollY for parallax effect
          right: '20px', // Fixed position right
        }}
        onClick={handleChatGPTClick}
        aria-label="Chat with ChatGPT"
      >
        <FontAwesomeIcon icon={faComments} size="lg" />
      </button>

      {/* Chatbot Modal */}
      <ChatbotModal isOpen={isChatbotOpen} onClose={closeChatbot} />
    </div>
  );
};

export default MainPage1;
