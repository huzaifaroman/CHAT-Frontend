import React, { useState } from 'react';

const Chat = () => {
  const [userInput, setUserInput] = useState('');
  const [responses, setResponses] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('http://127.0.0.1:5000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: userInput }) // Send the user input
    });

    const data = await response.json();

    // Update this line to access the 'text' key from the response
    setResponses([...responses, { user: userInput, bot: data.text }]); 

    setUserInput(''); // Clear input field
  };

  return (
    <div>
      <h2>Chat</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask me anything..."
        />
        <button type="submit">Send</button>
      </form>
      <div>
        {responses.map((msg, index) => (
          <div key={index}>
            <strong>User:</strong> {msg.user}<br />
            <strong>Bot:</strong> {msg.bot}<br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
