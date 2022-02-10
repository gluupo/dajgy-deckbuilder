import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_DECKS } from '../../utils/queries';
import { Row, Container, Button } from 'react-bootstrap'

const LatestDeck = () => {
  const { loading, data } = useQuery(GET_ALL_DECKS, { variables: { order: -1, limit: 5 } });
  const decks = data?.getAllDecks || [];

  const DeckLink = ({ _id, name }) => {
    return (
      <div>
        <Button
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
    console.log(decks);
    return decks.map(deck => <DeckLink key={deck._id} {...deck} />);
  }
  return (
    <>
      <Container className='flex-fill align-items-center d-flex py-3'>
        <Row className="rounded-3 d-flex justify-content-center text-center align-items-center col-11 col-lg-6 m-auto bg-dark text-light" id="bg-card">
          <div>
            <h1>
              List of Decks
            </h1>
            {renderDecks()}
          </div>
        </Row>
      </Container>
    </>
  );
};

export default LatestDeck;