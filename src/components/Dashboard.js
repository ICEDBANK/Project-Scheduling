import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';
import { Table } from 'react-bootstrap';
import { getISOWeek, getYear } from 'date-fns';

// Function to get the current ISO week number and year
const getCurrentWeekAndYear = () => {
  const today = new Date();
  const week = getISOWeek(today);
  const year = getYear(today);
  console.log(`Current ISO Week: ${week}, Year: ${year}`);
  return {
    week,
    year,
  };
};

// Function to convert time string (hh:mm:ss) to hours
const timeToHours = (time) => {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return hours + minutes / 60 + seconds / 3600;
};

// Function to convert hours to time string (hh:mm:ss)
const hoursToTime = (hours) => {
  const totalSeconds = Math.floor(hours * 3600);
  const hh = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const mm = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const ss = (totalSeconds % 60).toString().padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
};

const Dashboard = () => {
  const [schedules, setSchedules] = useState([]);
  const [availableTime, setAvailableTime] = useState({
    LT7: Array(52).fill(80),
    LT8: Array(52).fill(80),
    LT712: Array(52).fill(40),
  });
  const { week: currentWeek, year: currentYear } = getCurrentWeekAndYear();

  useEffect(() => {
    console.log("Fetching schedules from Firebase...");
    const schedulesRef = ref(database, 'schedules');
    onValue(schedulesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedSchedules = [];
      for (let id in data) {
        loadedSchedules.push(data[id]);
      }
      console.log("Schedules fetched:", loadedSchedules);
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
      const week = getISOWeek(dueDate);
      const estimatedHours = timeToHours(schedule.estimatedHours);
      const dueYear = getYear(dueDate);

      console.log(`Processing schedule:`, schedule);
      console.log(`Due date: ${format(dueDate, 'yyyy-MM-dd')}, ISO Week: ${week}, Year: ${dueYear}`);

      // If past due, subtract from current week
      if (dueDate < now) {
        timeSlots[schedule.machine][currentWeek - 1] -= estimatedHours;
      } else if (dueYear === currentYear && week <= 52) {
        timeSlots[schedule.machine][week - 1] -= estimatedHours;
      }
    });

    console.log("Updated available time slots:", timeSlots);
    setAvailableTime(timeSlots);
  }, [schedules, currentWeek, currentYear]);

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
            const displayWeek = currentWeek + index;
            const displayYear = currentYear + Math.floor(displayWeek / 52);
            if (displayYear > currentYear && displayWeek % 52 < currentWeek) {
              return null; // Skip weeks from the next year that are not yet relevant
            }
            const isOverbooked = (machine) => availableTime[machine][weekIndex] < 0;
            console.log(`Rendering week ${displayWeek % 52 + 1} (${displayYear}), Available LT7: ${hoursToTime(availableTime.LT7[weekIndex])}`);
            return (
              <tr key={index}>
                <td>{`Week ${displayWeek % 52 + 1} (${displayYear})`}</td>
                <td style={{ backgroundColor: isOverbooked('LT7') ? 'red' : 'white' }}>
                  {hoursToTime(availableTime.LT7[weekIndex])}
                </td>
                <td style={{ backgroundColor: isOverbooked('LT8') ? 'red' : 'white' }}>
                  {hoursToTime(availableTime.LT8[weekIndex])}
                </td>
                <td style={{ backgroundColor: isOverbooked('LT712') ? 'red' : 'white' }}>
                  {hoursToTime(availableTime.LT712[weekIndex])}
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
