import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';
import { Table } from 'react-bootstrap';

const Dashboard = () => {
  const [schedules, setSchedules] = useState([]);
  const [availableTime, setAvailableTime] = useState({
    LT7: Array(52).fill(80),
    LT8: Array(52).fill(80),
    LT712: Array(52).fill(40),
  });

  useEffect(() => {
    const schedulesRef = ref(database, 'schedules');
    onValue(schedulesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedSchedules = [];
      for (let id in data) {
        loadedSchedules.push(data[id]);
      }
      setSchedules(loadedSchedules);
    });
  }, []);

  useEffect(() => {
    const timeSlots = {
      LT7: Array(52).fill(80),
      LT8: Array(52).fill(80),
      LT712: Array(52).fill(40),
    };

    schedules.forEach((schedule) => {
      const week = getWeekNumber(new Date(schedule.dueDate));
      if (week < 52) {
        timeSlots[schedule.machine][week] -= parseInt(schedule.estimatedHours);
      }
    });

    setAvailableTime(timeSlots);
  }, [schedules]);

  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  return (
    <div>
      <h1>Machine Availability Dashboard</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Week</th>
            <th>LT7 Available Hours</th>
            <th>LT8 Available Hours</th>
            <th>LT712 Available Hours</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 52 }, (_, index) => (
            <tr key={index}>
              <td>Week {index + 1}</td>
              <td>{availableTime.LT7[index]}</td>
              <td>{availableTime.LT8[index]}</td>
              <td>{availableTime.LT712[index]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Dashboard;
