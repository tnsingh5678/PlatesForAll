import React, { useState } from "react";
import { FaComment, FaTimes } from "react-icons/fa";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you?", sender: "bot" },
  ]);

  const questions = [
    "Hello",
    "Donate Food",
    "How to Volunteer",
    "Find Food",
  ];

  const responses = {
    "hello": "Hey there! How can I help you today?",
    "donate food": "To donate food, please click the 'Donate Now' button on our website.",
    "how to volunteer": "Visit our 'Volunteer' page to see current opportunities.",
    "find food": "Use the 'Find Food' tool on our website to locate food near you.",
  };

  const handleQuestionClick = (question) => {
    setMessages((prev) => [
      ...prev,
      { text: question, sender: "user" },
      { text: responses[question.toLowerCase()] || "I'm not sure about that.", sender: "bot" },
    ]);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat Icon */}
      {!isOpen && (
        <button
          className="p-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full shadow-lg hover:scale-110 transition"
          onClick={() => setIsOpen(true)}
        >
          <FaComment size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 bg-gray-900 text-white rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-orange-500 p-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Chatbot</h2>
            <button onClick={() => setIsOpen(false)} className="text-white hover:scale-110 transition">
              <FaTimes size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="h-64 p-4 overflow-y-auto flex flex-col space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 max-w-[75%] rounded-lg ${msg.sender === "user" ? "bg-pink-500 self-end" : "bg-gray-800 self-start"}`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Predefined Questions */}
          <div className="grid grid-cols-2 gap-2 p-3 bg-gray-800">
            {questions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleQuestionClick(q)}
                className="p-2 bg-gray-700 rounded-lg hover:bg-pink-500 transition"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;