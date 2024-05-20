import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CustomNavbar from './components/CustomNavbar';
import Dashboard from './components/Dashboard';
import ScheduleForm from './components/ScheduleForm';
import ScheduleLt7 from './components/ScheduleLt7';
import ScheduleLt8 from './components/ScheduleLt8';
import ScheduleLt712 from './components/ScheduleLt712';

function App() {
  return (
    <div>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/schedule" element={<ScheduleForm />} />
        <Route path="/machine-lt7" element={<ScheduleLt7 />} />
        <Route path="/machine-lt8" element={<ScheduleLt8 />} />
        <Route path="/machine-lt712" element={<ScheduleLt712 />} />
      </Routes>
    </div>
  );
}

export default App;
