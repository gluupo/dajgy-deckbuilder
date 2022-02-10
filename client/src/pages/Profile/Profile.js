// Node Modules
import React, { useEffect, useState } from 'react';
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
  const user = data?.me || data?.user || {};
  const users = usersData?.users || [];



  // Create a new deck attached to current user
  const [createDeck, { deckError, newDeckData }] = useMutation(CREATE_DECK, {
    // The update method allows us to access and update the local cache
    update(cache, { data: { createDeck } }) {
      try {
        if (user) {
          cache.writeQuery({
            query: QUERY_USER,
            data: { user: { ...user, decks: [createDeck, ...user.decks] } },
          });
        }
      } catch (e) {
        console.error(e);
      }
    }
  })
  //TODO: set current deck to new

  if (Auth.loggedIn() && Auth.getProfile().data._id === id) {
    return <Redirect to="/me" />;
  }

  if (error) console.log(error);

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

  const createHandler = async () => {
    const newDeck = await createDeck()
  }

  const renderCreateButton = () => {
    if (id) return null

    return (
      <Button variant="outline-light" onClick={createHandler}>Create Deck</Button>
    )
  }
}


const renderDeckList = () => {
  if (!user.decks.length) {
    return (
      <h4>No Decks Created</h4>
    )
  } else {
    console.log(user.decks.length)
    return (
      <ListGroup defaultActiveKey="key">
        {
          user.decks.map(deck => (
            <DeckList key={deck._id} {...deck} workingDeck={user.workingDeck} />
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
