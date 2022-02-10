import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ALL_DECKS } from '../../utils/queries';
import { Row, Form, Button, Container } from 'react-bootstrap'

const LatestDeck = () => {
  const { loading, data } = useQuery(GET_ALL_DECKS, { variables: { order: -1, limit: 5 } });
  const decks = data?.getAllDecks || [];


  const renderDecks = () => {
    if (loading) {
      return <h2>Loading ...</h2>
    } else if (!decks.length) return null;
    console.log(decks);
    return decks.map(deck => <div>{deck.name}</div>)
  }

  return (
    <>
      <Container className='flex-fill align-items-center d-flex'>
        <Row className="rounded-3 d-flex justify-content-center text-center align-items-center col-11 col-lg-6 m-auto bg-dark text-light" id="bg-card">
          <div>
            <h1>
              List of Decks
            </h1>
            <h2>
              {renderDecks()}
            </h2>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default LatestDeck;