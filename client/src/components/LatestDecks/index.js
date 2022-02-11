import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_DECKS } from '../../utils/queries';
import { Row, Container, Button, Form } from 'react-bootstrap'

const LatestDeck = () => {
  const { loading, data } = useQuery(GET_ALL_DECKS, { variables: { order: -1, limit: 5 } });
  const decks = data?.getAllDecks || [];

  const DeckLink = ({ _id, name }) => {
    return (
      <div>
        <Button
          id="deckList"
          variant="outline-light"
          href={`/deck/${_id}`}
          size="lg"
          className="my-2"
          style={{
            "cursor": "pointer",
            "width": "400px"
          }}
        >
          {name}
        </Button >
      </div>
    );
  };

  const renderDecks = () => {
    if (loading) {
      return <h2>Loading ...</h2>
    } else if (!decks.length) return null;
    return decks.map(deck => <DeckLink key={deck._id} {...deck} />);
  }
  return (
    <Container className='flex-fill align-items-center d-flex'>
      <Row className="rounded-3 d-flex justify-content-center text-center align-items-center col-11 col-lg-6 m-auto bg-dark text-light pb-1" id="bg-card">
        <Form className="col-12 col-md-12 col-lg-10 bg-dark p-4 p-sm-5 rounded-3 m-2">
          <h1 className='text-light mb-3'>
            Latest Decks
          </h1>
          {renderDecks()}
        </Form>
      </Row>
    </Container>
  );
};

export default LatestDeck;