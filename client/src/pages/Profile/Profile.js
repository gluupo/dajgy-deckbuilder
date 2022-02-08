// Node Modules
import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { ListGroup, Row, Col, Button, Container, Card } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
// Utilities
import Auth from '../../utils/auth';
import { QUERY_USERS, QUERY_USER, QUERY_ME } from '../../utils/queries';
import { CREATE_DECK } from '../../utils/mutations';
// Components
import UserList from '../../components/UserList/';
import DeckList from './DeckList';

const Profile = () => {
  const { id } = useParams();

  // Get current user
  const { loading, data, error } = useQuery(id ? QUERY_USER : QUERY_ME, {
    variables: { id },
  });

  // Get a list of all users
  const { usersLoading, data: usersData } = useQuery(QUERY_USERS);

  // Create a new deck attached to current user
  const [createDeck, { deckError, newDeckData }] = useMutation(CREATE_DECK);
  //TODO: set current deck to new

  const user = data?.me || data?.user || {};
  const users = usersData?.users || [];

  if (error) console.log(error);

  // redirect to personal profile page if username is yours
  // if (Auth.loggedIn() && Auth.getProfile().data._id === id) {
  //   return <Redirect to="/me" />;
  // }

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
  };

  const renderCreateButton = () => {
    if (Auth.loggedIn() && Auth.getProfile().data._id === id) {
      return (
        <Button variant="outline-light" onClick={createDeck}>Create Deck</Button>
      )
    }
  }

  const renderDeckList = () => {
    if (!user.decks.length) {
      return (
        <h4>No Decks Created</h4>
      )
    } else {
      return (
        <ListGroup defaultActiveKey="key">
          {
            user.decks.map(deck => (
              <DeckList {...deck} />
            ))
          }
        </ListGroup>
      )
    }
  };

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
            {renderCreateButton()}
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

        {renderDeckList()}

      </Container>
    </>
  );
};

export default Profile;
