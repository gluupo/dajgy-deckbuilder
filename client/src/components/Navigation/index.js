import React from 'react';
import { Nav, Navbar, Container } from "react-bootstrap"
import './assets/styles.css';

import Auth from '../../utils/auth';

function Navigation() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  if (Auth.loggedIn()) {
    return (
      <>
        <Navbar bg="dark" variant="dark" id="nav">
          <Container>
            <Nav className="me-auto">
              <Nav.Link onClick={logout}>
                logout
              </Nav.Link>
              <Nav.Link href="/me">
                profile
              </Nav.Link>
              <Nav.Link href="/search">
                search
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
  // If logged out show login controls
  return (
    <Navbar bg="dark" variant="dark" id="nav">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/login">
            login
          </Nav.Link>
          <Nav.Link href="/signup">
            signup
          </Nav.Link>
          <Nav.Link href="/search">
            search
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Navigation;
