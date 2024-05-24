import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';
import { Table } from 'react-bootstrap';

const CompletedOrders = () => {
  const [completedOrders, setCompletedOrders] = useState([]);

  useEffect(() => {
    const completedOrdersRef = ref(database, 'completedOrders');
    onValue(completedOrdersRef, (snapshot) => {
      const data = snapshot.val();
      const loadedOrders = [];
      for (let id in data) {
        loadedOrders.push({ id, ...data[id] });
      }
      setCompletedOrders(loadedOrders);
    });
  }, []);

  return (
    <div>
      <h1>Completed Orders</h1>
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
            <th>Machine</th>
            <th>Completed Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {completedOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.customerName}</td>
              <td>{order.orderNumber}</td>
              <td>{order.poNumber}</td>
              <td>{order.estimatedHours}</td>
              <td>{order.dueDate}</td>
              <td>{order.nestNumber}</td>
              <td>{order.notes}</td>
              <td>{order.machine}</td>
              <td>{order.completedTimestamp}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CompletedOrders;
