"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    const interval = setInterval(fetchMessages, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchMessages = async () => {
    const res = await fetch("/api/messages");
    const data = await res.json();
    setMessages(data);
  };

  const sendMessage = async () => {
    await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({ text: input, user }),
    });

    setInput("");
  };

  return (
    <div style={{ padding: 20 }}>
      {!user && (
        <input
          placeholder="Enter your name"
          onChange={(e) => setUser(e.target.value)}
        />
      )}

      <div style={{ marginTop: 20 }}>
        {messages.map((msg, i) => (
          <p key={i}>
            <b>{msg.user}</b>: {msg.text}
          </p>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type message..."
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
