import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const CustomNavbar = () => {

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={NavLink} to="/">Scheduling App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/">Dashboard</Nav.Link>
          <Nav.Link as={NavLink} to="/schedule">Schedule Form</Nav.Link>
          <Nav.Link as={NavLink} to="/machine-lt7">Machine LT7</Nav.Link>
          <Nav.Link as={NavLink} to="/machine-lt8">Machine LT8</Nav.Link>
          <Nav.Link as={NavLink} to="/machine-lt712">Machine LT712</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
