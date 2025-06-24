import React, { useState } from 'react';
import './ChatBot.css';
import { FaRobot, FaUser } from 'react-icons/fa';

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setLoading(true);

    try {
      // Replace with your own backend/chat API call
      const botResponse = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput })
      });

      const data = await botResponse.json();
      const botMessage = { sender: 'bot', text: data.reply || 'Something went wrong.' };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      const botMessage = { sender: 'bot', text: '⚠️ Error fetching response.' };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClear = () => {
    setMessages([]);
    setUserInput('');
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        Crash IQ ChatBot
        <button className="clear-btn" onClick={handleClear}>Clear</button>
      </div>

      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`bubble ${msg.sender}`}>
            <span className="avatar">
              {msg.sender === 'user' ? <FaUser /> : <FaRobot />}
            </span>
            <div className="text">{msg.text}</div>
          </div>
        ))}

        {loading && (
          <div className="bubble bot">
            <span className="avatar"><FaRobot /></span>
            <div className="text loading">
              <span>.</span><span>.</span><span>.</span>
            </div>
          </div>
        )}
      </div>

      <div className="input-area">
        <textarea
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask something like 'Why does my app crash on load?'"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatBot;
