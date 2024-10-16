import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ChatPage from './components/ChatPage';
import Developer from './components/Developer';
import NavigationBar from './components/NavigationBar';

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/developer" element={<Developer />} />
      </Routes>
    </Router>
  );
};

export default App;