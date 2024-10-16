import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/chat">Chat</Button>
        <Button color="inherit" component={Link} to="/developer">Developer</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;