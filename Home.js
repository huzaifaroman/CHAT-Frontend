import React from 'react';
import { Button, Typography } from '@mui/material';

const Home = ({ navigateTo }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <Typography variant="h2">Dawg AI</Typography>
      <Button variant="contained" color="primary" onClick={() => navigateTo('/chat')} style={{ marginTop: '50px' }}>
        Start Chat
      </Button>
    </div>
  );
};

export default Home;