import React, { useState, useEffect } from 'react';
import { assests } from '../constants';
import ChatbotModal from './ChatBotModal'; // Import ChatbotModal
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

const AboutUs = () => {
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
      <div className="absolute top-0 left-0 w-full h-1/2 md:h-1/2 bg-cover bg-center bg-opacity-70" style={{ backgroundImage: `url(${assests.aboutImg3})` }}>
        <div className="w-full h-full bg-black opacity-80 absolute"></div>
        <div className={`relative z-10 text-center mt-40 transition-all duration-1000 ease-in-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <h2 className="text-4xl font-bold text-white mb-4">About Us</h2>
          <p className="text-orange-500 mt-2 text-lg">We are dedicated to providing quality services and ensuring customer satisfaction.</p>
        </div>
      </div>

      <div className="relative bg-white shadow-md rounded-lg overflow-hidden w-full max-w-5xl flex flex-col md:flex-row items-center justify-center mt-64 mx-auto z-10 p-6 h-[400px] transition-all duration-1000 ease-in-out transform">
        <div className={`w-full mt-7 pr-5 md:w-1/2 flex flex-row space-x-4 transition-all duration-1000 ease-in-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <img src={assests.aboutImg1} alt="About Us" className="object-cover w-1/2 h-[320px] rounded-lg mb-4" />
          <img src={assests.aboutImg2} alt="About Us" className="object-cover w-1/2 h-[320px] rounded-lg mb-4" />
        </div>
        <div className={`w-full md:w-1/2 p-6 flex flex-col h-full text-left justify-start transition-all duration-1000 ease-in-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <h1 className="text-4xl font-bold mb-4">We take great care of your issues</h1>
          <h3 className="text-lg text-gray-700 mb-4">We strive to connect people with quality services and to ensure satisfaction through our offerings.</h3>
          <ul className="text-gray-700 mb-4 list-disc list-inside">
            <li>Our team consists of experienced professionals committed to excellence and innovation.</li>
            <li>We are here to provide you with the best experience possible.</li>
          </ul>
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

export default AboutUs;
