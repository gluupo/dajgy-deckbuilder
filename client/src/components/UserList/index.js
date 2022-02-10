import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Form, Button, Container } from 'react-bootstrap'

const User = ({ _id, username }) => {
  return (
    <div key={_id}>
      <h4>
        <Link to={`/users/${_id}`}>
          {username}
        </Link>
      </h4>
    </div>
  );
};

const UserList = ({ users, title }) => {
  if (!users.length) return <h3>No Users</h3>;

  const renderUsers = () => {
    if (!users) return null;
    return users.map(user => <User key={user._id} {...user} />);
  }

  return (
    <>
      <Container className='flex-fill align-items-center d-flex'>
        <Row className="rounded-3 d-flex justify-content-center text-center align-items-center col-11 col-lg-6 m-auto bg-dark text-light" id="bg-card">
          <div>
            <h3>
              {title}
            </h3>
            {renderUsers()}
          </div>
        </Row>
      </Container>
    </>
  );
};

export default UserList;
