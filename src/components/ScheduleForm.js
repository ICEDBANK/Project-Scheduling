import React, { useState } from "react";
import { Button, Col, Form, Row } from 'react-bootstrap';

const ScheduleForm = ({ onAddSchedule }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    orderNumber: '',
    poNumber: '',
    estimatedHours: '',
    dueDate: '',
    nestNumber: '',
    notes: '',
    machine: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddSchedule(formData); // Pass data to parent component
    localStorage.setItem('formData', JSON.stringify(formData)); // Store data in localStorage
    alert("Schedule submitted!");
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formCustomerName">
          <Form.Label column sm="2">Customer Name:</Form.Label>
          <Col sm="10">
            <Form.Control 
              type="text" 
              placeholder="Customer Name?" 
              name="customerName" 
              value={formData.customerName} 
              onChange={handleChange} 
              required 
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formOrderNumber">
          <Form.Label column sm="2">Order#:</Form.Label>
          <Col sm="10">
            <Form.Control 
              type="text" 
              placeholder="Enter Order Number" 
              name="orderNumber" 
              value={formData.orderNumber} 
              onChange={handleChange} 
              required 
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPoNumber">
          <Form.Label column sm="2">PO#:</Form.Label>
          <Col sm="10">
            <Form.Control 
              type="text" 
              placeholder="Enter PO Number" 
              name="poNumber" 
              value={formData.poNumber} 
              onChange={handleChange} 
              required 
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="estimatedHours">
          <Form.Label column sm="2">Estimated Hours:</Form.Label>
          <Col sm="10">
            <Form.Control 
              type="number" 
              placeholder="Enter Estimated Hours" 
              name="estimatedHours" 
              value={formData.estimatedHours} 
              onChange={handleChange} 
              required 
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="dueDate">
          <Form.Label column sm="2">Due Date:</Form.Label>
          <Col sm="10">
            <Form.Control 
              type="date" 
              name="dueDate" 
              value={formData.dueDate} 
              onChange={handleChange} 
              required 
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="nestNumber">
          <Form.Label column sm="2">Nest Number:</Form.Label>
          <Col sm="10">
            <Form.Control 
              type="text" 
              placeholder="What is the Nest Id Number?" 
              name="nestNumber" 
              value={formData.nestNumber} 
              onChange={handleChange} 
              required 
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="notes">
          <Form.Label column sm="2">Notes:</Form.Label>
          <Col sm="10">
            <Form.Control 
              type="text" 
              placeholder="Enter Some Notes" 
              name="notes" 
              value={formData.notes} 
              onChange={handleChange} 
              required 
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="selectedMachine">
          <Form.Label column sm="2">Machine:</Form.Label>
          <Col sm="10">
            <Form.Select 
              name="machine" 
              value={formData.machine} 
              onChange={handleChange} 
              required 
            >
              <option value="">Choose...</option>
              <option value="LT7">LT7</option>
              <option value="LT8">LT8</option>
              <option value="LT712">LT712</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Button type="submit" className="btn btn-primary">Submit</Button>
      </Form>
    </>
  );
};

export default ScheduleForm;
