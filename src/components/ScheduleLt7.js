import React, { useEffect, useState } from 'react';
import { ref, onValue, set, push } from 'firebase/database';
import { database } from '../firebase';
import { Table, DropdownButton, Dropdown } from 'react-bootstrap';

const ScheduleLt7 = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const schedulesRef = ref(database, 'schedules');
    onValue(schedulesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedSchedules = [];
      for (let id in data) {
        if (data[id].machine === 'LT7') {
          loadedSchedules.push({ id, ...data[id] });
        }
      }
      setSchedules(loadedSchedules);
    });
  }, []);

  const handleStatusChange = (scheduleId, newStatus) => {
    const scheduleRef = ref(database, `schedules/${scheduleId}`);
    const schedule = schedules.find((s) => s.id === scheduleId);

    if (newStatus === 'Completed') {
      const completedOrderRef = ref(database, 'completedOrders');
      const newOrder = { ...schedule, completedTimestamp: new Date().toISOString() };
      set(push(completedOrderRef), newOrder);
      set(scheduleRef, null);
    } else {
      set(scheduleRef, { ...schedule, status: newStatus });
    }
  };

  const getRowStyle = (status) => {
    switch (status) {
      case 'Running':
        return { backgroundColor: 'green' };
      case 'Staged':
        return { backgroundColor: 'purple' };
      case 'Paused':
        return { backgroundColor: 'yellow' };
      case 'On Hold':
        return { backgroundColor: 'black', color: 'white' };
      default:
        return {};
    }
  };

  if (schedules.length === 0) {
    return <p>No data available for LT7.</p>;
  }

  return (
    <div>
      <h1>LT7 Machine Schedule</h1>
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
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule, index) => (
            <tr key={index} style={getRowStyle(schedule.status)}>
              <td>{schedule.customerName}</td>
              <td>{schedule.orderNumber}</td>
              <td>{schedule.poNumber}</td>
              <td>{schedule.estimatedHours}</td>
              <td>{schedule.dueDate}</td>
              <td>{schedule.nestNumber}</td>
              <td>{schedule.notes}</td>
              <td>
                <DropdownButton
                  title={schedule.status || 'Select Status'}
                  onSelect={(newStatus) => handleStatusChange(schedule.id, newStatus)}
                >
                  <Dropdown.Item eventKey="Running">Running</Dropdown.Item>
                  <Dropdown.Item eventKey="Staged">Staged</Dropdown.Item>
                  <Dropdown.Item eventKey="Paused">Paused</Dropdown.Item>
                  <Dropdown.Item eventKey="Completed">Completed</Dropdown.Item>
                  <Dropdown.Item eventKey="On Hold">On Hold</Dropdown.Item>
                </DropdownButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ScheduleLt7;
