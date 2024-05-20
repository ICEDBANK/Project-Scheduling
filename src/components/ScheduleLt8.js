import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';

const ScheduleLt8 = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const schedulesRef = ref(database, 'schedules');
    onValue(schedulesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedSchedules = [];
      for (let id in data) {
        if (data[id].machine === 'LT8') {
          loadedSchedules.push(data[id]);
        }
      }
      setSchedules(loadedSchedules);
    });
  }, []);

  if (schedules.length === 0) {
    return <p>No data available for LT8.</p>;
  }

  return (
    <div>
      <h1>LT8 Machine Schedule</h1>
      {schedules.map((schedule, index) => (
        <div key={index}>
          <p>Customer Name: {schedule.customerName}</p>
          <p>Order Number: {schedule.orderNumber}</p>
          <p>PO Number: {schedule.poNumber}</p>
          <p>Estimated Hours: {schedule.estimatedHours}</p>
          <p>Due Date: {schedule.dueDate}</p>
          <p>Nest Number: {schedule.nestNumber}</p>
          <p>Notes: {schedule.notes}</p>
        </div>
      ))}
    </div>
  );
};

export default ScheduleLt8;
