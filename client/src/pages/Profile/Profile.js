// Node Modules
import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { useQuery } from '@apollo/client';
// Utilities
import Auth from '../../utils/auth';
import { QUERY_USERS, QUERY_USER, QUERY_ME } from '../../utils/queries';
// Components
import UserList from '../../components/UserList/';

const Profile = () => {
  const { id } = useParams();

  // Get current user
  const { loading, data, error } = useQuery(id ? QUERY_USER : QUERY_ME, {
    variables: { id },
  });

  // Get a list of all users
  const { usersLoading, data: usersData } = useQuery(QUERY_USERS);

  const user = data?.me || data?.user || {};
  const users = usersData?.users || [];

  if (error) console.log(error);

  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === id) {
    return <Redirect to="/me" />;
  }

  if (loading) {
    return <h4>Loading...</h4>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  const renderUserList = () => {
    if (usersLoading) return null;
    // Only renders users who's profile we're not currently viewing
    const notMeUsers = users.filter(o => o._id !== user._id);
    return <UserList users={notMeUsers} title="User List" />;
  };

  const renderCurrentUserInfo = () => {
    if (id) return null;
    return (
      <ul>
        <li>username: {user.username}</li>
        <li>email: {user.email}</li>
      </ul>
    );
  }

  return (
    <>
      <div>
        <div>
          <h2>
            Viewing {id ? `${user.username}'s` : 'your'} profile.
          </h2>
          {renderCurrentUserInfo()}
          {renderUserList()}
        </div>
      </div>

      <Container>
        <Row>
          <Col>
            <Form className='mb-5' >
              <Form.Control
                placeholder="Enter your search here"
                name="name"
                type="name"
              />
              <Button type="submit">
                Submit
              </Button>
            </Form>

            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>deck1 exp..</Card.Title>
                <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
              </Card.Body>
            </Card>

          </Col>
          <Col xs lg="2">
            <Card style={{ width: '18rem', height: '100%' }}>
              <Card.Body>
                <Card.Title>Current Deck</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">being built</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>
                footer
              </p>
              <footer className="blockquote-footer">
                footer
              </footer>
            </blockquote>
          </Card.Body>
        </Card>

      </Container>
    </>
  );
};

export default Profile;
