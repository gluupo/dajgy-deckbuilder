import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Container } from "react-bootstrap"

import Auth from '../../utils/auth';

function Navigation() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  if (Auth.loggedIn()) {
    return (
      <>
        <Link to="/me">
          {Auth.getProfile().data.username}'s profile
        </Link>
        <button onClick={logout}>
          Logout
        </button>
      </>
    );
  }
  // If logged out show login controls
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/login">
            Login
          </Nav.Link>
          <Nav.Link href="/signup">
            Signup
          </Nav.Link>
          <Nav.Link href="/search">
            Search
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Navigation;
