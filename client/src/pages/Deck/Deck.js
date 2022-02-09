import React from "react";
import { GET_DECK } from '../../utils/queries';
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Container, Row, Col } from "react-bootstrap";
import MTGCard from '../../components/Card/MTGCard';


const Deck = () => {
  const { id } = useParams();

  //Get Deck
  const { loading, data, error } = useQuery(GET_DECK, { variables: { _id: id } });
  console.log(data)
  const deck = data?.getDeck || {};



  if (error) console.log(error);
  if (loading) {
    return <h4>Loading...</h4>
  }

  const renderDeck = () => {
    console.log(deck.cards)
    if (deck.cards && deck.cards.length > 0) {
      return (
        <Col>
          {deck.cards.map(e =>
            < MTGCard
              multiverseid={e.multiverseid}
              name={e.name}
              manaCost={e.manaCost}
              superTypes={e.superTypes}
              rarity={e.rarity}
              imageUrl={e.imageUrl}
              text={e.text}
            />)}
        </Col>
      )
    }
  }

  return (
    <>
      <Container>
        <Row>
          <h1>DECK GOES HERE LMAO</h1>
          {renderDeck()}
        </Row>
      </Container>
    </>
  )
}

export default Deck