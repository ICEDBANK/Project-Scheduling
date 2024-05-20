// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ScheduleLt7 from './components/ScheduleLt7';
import ScheduleLt8 from './components/ScheduleLt8';
import ScheduleLt712 from './components/ScheduleLt712';
import CompletedOrder from './components/CompletedOrder';
import CustomNavbar from './components/CustomNavbar';

const App = () => {
  return (
    <Router>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ScheduleLt7" element={<ScheduleLt7 />} />
        <Route path="/ScheduleLt8" element={<ScheduleLt8 />} />
        <Route path="/ScheduleLt712" element={<ScheduleLt712 />} />
        <Route path="/CompletedOrder" element={<CompletedOrder />} />
      </Routes>
    </Router>
  );
};

export default App;
