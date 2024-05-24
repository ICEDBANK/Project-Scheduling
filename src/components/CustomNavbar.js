import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CustomNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">Scheduling App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/schedule-form">Schedule Form</Nav.Link>
          <Nav.Link as={Link} to="/machine-lt7">Machine LT7</Nav.Link>
          <Nav.Link as={Link} to="/machine-lt8">Machine LT8</Nav.Link>
          <Nav.Link as={Link} to="/machine-lt712">Machine LT712</Nav.Link>
          <Nav.Link as={Link} to="/completed-orders">Completed Orders</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
