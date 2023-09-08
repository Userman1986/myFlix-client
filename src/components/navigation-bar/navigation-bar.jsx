import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Movie App</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        {user ? (
          <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
        ) : (
          <>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Signup</Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
};
