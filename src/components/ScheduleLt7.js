import React from 'react';

const ScheduleLt7 = ({ schedules }) => {
  const filteredSchedules = schedules.filter(schedule => schedule.machine === 'LT7');

  if (filteredSchedules.length === 0) {
    return <p>No data available for LT7.</p>;
  }

  return (
    <div>
      <h1>LT7 Machine Schedule</h1>
      {filteredSchedules.map((schedule, index) => (
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

export default ScheduleLt7;
