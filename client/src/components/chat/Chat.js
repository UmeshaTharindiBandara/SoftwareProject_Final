import React, { useState, useEffect } from "react";
import "./Chat.css";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa"; // Importing icons

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/chat");
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setMessages(data);
      } else {
        console.error("Fetched data is not an array:", data);
        setMessages([]);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    if (message.trim() === "") return; // Prevent empty messages
    try {
      await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, message }),
      });
      setMessage(""); // Clear input
      fetchMessages(); // Refresh messages
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000); // Poll every 2 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="chat-container">
      <h2>Live Chat</h2>
      <div className="chat-box">
        {messages.map((msg) => (
          <div key={msg._id} className="chat-message">
            <strong>{msg.user}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <div className="input-wrapper">
          <FaUserCircle className="user-icon" />
          <input
            type="text"
            placeholder="Your Name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>
            <FaPaperPlane className="send-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;