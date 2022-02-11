// Node Modules
import React from 'react';
import { useParams } from 'react-router-dom';
import { ListGroup, Row, Col, Button, Container } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';

// Utilities
import Auth from '../../utils/auth';
import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import { CREATE_DECK } from '../../utils/mutations';
// Components
import DeckList from './DeckList';

const Profile = () => {
  const { id } = useParams();

  // Get current user
  const { loading, data, error } = useQuery(id ? QUERY_USER : QUERY_ME, {
    variables: { id },
  });

  // Get a list of all users
  const user = data?.me || data?.user || {};
  let editable;


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
    editable = true;
  }

  if (error) console.log(error);
  if (deckError) console.log(deckError)

  if (loading) {
    return <h4>Loading...</h4>;
  }

  if (!user?.username) {
    return (
      <Container className='flex-fill align-items-center d-flex'>
        <Row className="rounded-3 d-flex justify-content-center text-center align-items-center col-11 col-lg-6 m-auto bg-dark text-light p-4" id="bg-card">
          <h3>
            You need to be logged in to see this. Use the navigation links above to
            sign up or log in!
          </h3>
        </Row>
      </Container>
    );
  }

  const createHandler = async () => {
    await createDeck()
  }

  const renderCreateButton = () => {
    if (editable) {
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
      return (
        <ListGroup defaultActiveKey="key">
          {
            user.decks.map(deck => (
              <DeckList key={deck._id} {...deck} editable={editable} />
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
              <h1 className='text-light'>
                Viewing {editable ? 'your' : `${user.username}'s`} profile
              </h1>
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
