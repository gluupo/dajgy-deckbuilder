import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from "react-bootstrap"

import Auth from '../../utils/auth';

function Navbar() {
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
    <>
      <div className="navbar-dark">
        <Link to="/login">
          Login
        </Link>
        <Link to="/signup">
          Signup
        </Link>
        <Link to="/search">
          Search
        </Link>
      </div>
    </>
  )
}

export default Navbar;
