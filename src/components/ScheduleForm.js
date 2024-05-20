import React, {useState} from "react";
import {
    Button,
    Col,
    Form,
    Row} 
    from 'react-bootstrap'

const ScheduleForm = ({ onAddSchedule }) => {



};

return (

    <>
        <Form>
            <Form.Group as={Row} className="mb-3" controlId="formCutomerName">
                <Form.Label column sm="10">Customer Name : </Form.Label>
                <Col sm="10" type="Text" placeholder="Customer Name?"></Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formCutomerOrderNumber">
                <Form.Label column sm="10">Order# : </Form.Label>
                <Col sm="10" type="Text" placeholder="Enter Order Number"></Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formCutomerPoNumber">
                <Form.Label column sm="10">PO# : </Form.Label>
                <Col sm="10" type="Text" placeholder="Enter PO Number"></Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="EstimatedHours">
                <Form.Label column sm="10">Estimated Hours : </Form.Label>
                <Col sm="10" type="Duration" placeholder="Enter Estimated Hours"></Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="LaserDueDate">
                <Form.Label column sm="10">Due Date : </Form.Label>
                <Col sm="10" type="Date" placeholder="What is the Laser Due Date?"></Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="NestFileIdNumber">
                <Form.Label column sm="10">Nest Number : </Form.Label>
                <Col sm="10" type="Text" placeholder="What is the Nest Id Number?"></Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="Notes">
                <Form.Label column sm="10">Notes : </Form.Label>
                <Col sm="10" type="Text" placeholder="Enter Some Notes"></Col>
            </Form.Group>
            <Form.Group as={Row} controlId="SelectedMachine">
          <Form.Label>Machine</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>LT7</option>
            <option>LT8</option>
            <option>LT712</option>
          </Form.Select>
        </Form.Group>
        </Form>
    </>

)

export default ScheduleForm;