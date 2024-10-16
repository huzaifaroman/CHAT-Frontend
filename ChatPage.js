import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import PDFUpload from './PDFUpload';

const ChatPage = () => {
  const [userInput, setUserInput] = useState('');
  const [responses, setResponses] = useState([]);

  const sendMessage = async () => {
    if (!userInput) return;

    setResponses([...responses, { sender: 'user', message: userInput }]);
    setUserInput('');

    const response = await fetch('http://127.0.0.1:5000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: userInput })
    });

    const data = await response.json();
    setResponses((prevResponses) => [...prevResponses, { sender: 'bot', message: data.text }]);
  };

  return (
    <Box>
      <Typography variant="h4">Chat</Typography>
      <Box>
        {responses.map((msg, index) => (
          <Typography key={index} align={msg.sender === 'user' ? 'right' : 'left'}>
            <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.message}
          </Typography>
        ))}
      </Box>
      <TextField
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type your message..."
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={sendMessage}>
        Send
      </Button>
      <PDFUpload />
    </Box>
  );
};

export default ChatPage;