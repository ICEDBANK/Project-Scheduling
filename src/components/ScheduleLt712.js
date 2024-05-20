import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';
import { Table } from 'react-bootstrap';

const ScheduleLt712 = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const schedulesRef = ref(database, 'schedules');
    onValue(schedulesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedSchedules = [];
      for (let id in data) {
        if (data[id].machine === 'LT712') {
          loadedSchedules.push(data[id]);
        }
      }
      setSchedules(loadedSchedules);
    });
  }, []);

  if (schedules.length === 0) {
    return <p>No data available for LT712.</p>;
  }

  return (
    <div>
      <h1>LT712 Machine Schedule</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Order Number</th>
            <th>PO Number</th>
            <th>Estimated Hours</th>
            <th>Due Date</th>
            <th>Nest Number</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule, index) => (
            <tr key={index}>
              <td>{schedule.customerName}</td>
              <td>{schedule.orderNumber}</td>
              <td>{schedule.poNumber}</td>
              <td>{schedule.estimatedHours}</td>
              <td>{schedule.dueDate}</td>
              <td>{schedule.nestNumber}</td>
              <td>{schedule.notes}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ScheduleLt712;
