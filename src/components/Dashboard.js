import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';
import { Table } from 'react-bootstrap';

const getWeekNumber = (date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

const getCurrentWeek = () => {
  const today = new Date();
  return getWeekNumber(today);
};

const timeToHours = (time) => {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return hours + minutes / 60 + seconds / 3600;
};

const Dashboard = () => {
  const [schedules, setSchedules] = useState([]);
  const [availableTime, setAvailableTime] = useState({
    LT7: Array(52).fill(80),
    LT8: Array(52).fill(80),
    LT712: Array(52).fill(40),
  });
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());

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

    const now = new Date();
    schedules.forEach((schedule) => {
      const dueDate = new Date(schedule.dueDate);
      const week = getWeekNumber(dueDate);
      const estimatedHours = timeToHours(schedule.estimatedHours);

      // If past due, subtract from current week
      if (dueDate < now) {
        timeSlots[schedule.machine][currentWeek - 1] -= estimatedHours;
      } else if (week < 52) {
        timeSlots[schedule.machine][week] -= estimatedHours;
      }
    });

    setAvailableTime(timeSlots);
  }, [schedules, currentWeek]);

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
          {Array.from({ length: 52 }, (_, index) => {
            const weekIndex = (currentWeek - 1 + index) % 52;
            const isOverbooked = (machine) => availableTime[machine][weekIndex] < 0;
            return (
              <tr key={index}>
                <td>{`Week ${weekIndex + 1}`}</td>
                <td style={{ backgroundColor: isOverbooked('LT7') ? 'red' : 'white' }}>
                  {availableTime.LT7[weekIndex].toFixed(2)}
                </td>
                <td style={{ backgroundColor: isOverbooked('LT8') ? 'red' : 'white' }}>
                  {availableTime.LT8[weekIndex].toFixed(2)}
                </td>
                <td style={{ backgroundColor: isOverbooked('LT712') ? 'red' : 'white' }}>
                  {availableTime.LT712[weekIndex].toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Dashboard;
