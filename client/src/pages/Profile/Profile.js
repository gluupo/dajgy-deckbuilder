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
      <Container
        style={{ width: '20rem', height: '100%' }}
        className='bg-light rounded-3 p-3 pb-1'>
        <ul>
          <li>username: {user.username}</li>
          <li>email: {user.email}</li>
        </ul>
      </Container>
    );
  };

  const renderCreateButton = () => {
    if (Auth.loggedIn() && Auth.getProfile().data._id === id) {
      return (
        <Button variant="outline-light" onClick={createDeck}>Create Deck</Button>
      )
    }
  }

  console.log(user.decks)

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
              <DeckList {...deck} workingDeck={user.workingDeck} />
            ))
          }
        </ListGroup>
      )
    }
  };

  return (
    <>
      <Container className='mt-5'>
        <Row>
          <div>
            <div>
              <h2>
                Viewing {id ? `${user.username}'s` : 'your'} profile.
              </h2>
              {renderCurrentUserInfo()}
              {renderCreateButton()}
            </div>
          </div>
          <Col xs={12}>
            {renderDeckList()}
          </Col>
          <Col xs lg="2">
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
