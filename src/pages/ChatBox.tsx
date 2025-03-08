import React, { useState } from 'react';
import { FaRobot } from 'react-icons/fa';
import axios from 'axios';

const ChatbotIcon: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Append user's message to the chat
    setMessages((prev) => [...prev, `**You:** ${input}`]);

    try {
      // Send message to backend API
      const response = await axios.post(
        'http://localhost:5000/generate-content',  // Your backend URL
        { text: input },  // Send the message from the user
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      const botReply = response.data?.generatedText || "I couldn't understand that.";
      setMessages((prev) => [...prev, `**AI:** ${botReply}`]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages((prev) => [...prev, `**AI:** Oops! Something went wrong.`]);
    }

    setInput(''); // Clear input field
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chatbot Icon */}
      <button
        onClick={toggleChat}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all"
      >
        <FaRobot size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-16 right-6 w-80 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-bold mb-2">AI Chatbot</h2>

          <div className="h-64 overflow-y-auto border p-2 mb-2">
            {messages.map((msg, index) => (
              <p key={index} className={msg.startsWith('**You:**') ? 'text-blue-600' : 'text-green-600'}>
                {msg.replace('**', '').replace('**', '')}
              </p>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotIcon;
