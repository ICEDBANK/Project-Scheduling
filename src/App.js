// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Schedule from './components/Schedule';
import About from './components/About';
import CustomNavbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
