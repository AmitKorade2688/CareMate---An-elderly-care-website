import React from 'react';

const ChatbotModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>

      {/* Modal content */}
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md z-50">
        <h2 className="text-lg font-bold mb-2">Chat with us!</h2>

        {/* Embedded Chatbot */}
        <iframe
          src="https://cdn.botpress.cloud/webchat/v2/shareable.html?botId=c65fa9b6-4874-4743-b09a-cfd30e310f37"
          title="Chatbot"
          className="w-full h-96 border-none"
        ></iframe>

        {/* Styled Close Button */}
        <button
          onClick={onClose}
          className="mt-2 bg-teal-600 text-white px-4 py-2 rounded transition-colors duration-500 ease-in-out hover:bg-orange-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ChatbotModal;
