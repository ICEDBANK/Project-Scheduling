import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ScheduleForm from './components/ScheduleForm';
import ScheduleLt7 from './components/ScheduleLt7';
import ScheduleLt8 from './components/ScheduleLt8';
import ScheduleLt712 from './components/ScheduleLt712';
import CompletedOrders from './components/CompletedOrders';
import CustomNavbar from './components/CustomNavbar';

function App() {
  const [schedules, setSchedules] = useState([]);

  const handleAddSchedule = (newSchedule) => {
    setSchedules((prevSchedules) => [...prevSchedules, newSchedule]);
  };

  return (
    <Router>
      <div className="App">
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/schedule-form" element={<ScheduleForm onAddSchedule={handleAddSchedule} />} />
          <Route path="/machine-lt7" element={<ScheduleLt7 />} />
          <Route path="/machine-lt8" element={<ScheduleLt8 />} />
          <Route path="/machine-lt712" element={<ScheduleLt712 />} />
          <Route path="/completed-orders" element={<CompletedOrders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
