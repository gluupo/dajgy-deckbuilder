import React from "react";
import { GET_DECK } from '../../utils/queries';
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Container, Row, Col } from "react-bootstrap";
import MTGCard from '../../components/Card/MTGCard';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import blackmana from './assets/black mana.png';
import whitemana from './assets/white mana.png';
import bluemana from './assets/blue mana.png';
import greenmana from './assets/green mana.png';
import redmana from './assets/red mana.png';


const Deck = () => {
  const { id } = useParams();

  //Get Deck
  const { loading, data, error } = useQuery(GET_DECK, { variables: { _id: id } });
  console.log(data?.getDeck)
  const deck = data?.getDeck || {};

  const manaSymbols = [
    {
      image: whitemana
    },
    {
      image: bluemana
    },
    {
      image: blackmana
    },
    {
      image: redmana
    },
    {
      image: greenmana
    },
  ]

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
      <Container
        className='flex-fill d-flex'>
        <Row
          className="justify-content-center text-center align-items-center m-auto p-4 bg-dark rounded-3" id="bg-card">
          <h1
            className='text-light'>DECK GOES HERE LMAO</h1>
          <Container>
            <Row className="justify-content-center">
              {manaSymbols.map(e =>
                <Col className="row justify-content-center">
                  <TiArrowSortedUp
                    className="text-light col-12"
                    size={40}
                  />
                  <Col xs={12}
                    className="m-0 text-white"
                    style={{
                      backgroundImage: `url("${e.image}")`,
                      backgroundSize: '75px',
                      backgroundPosition: '50% 50%',
                      backgroundRepeat: 'no-repeat',
                      width: '75px',
                      height: '75px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '50px',
                      textShadow: '-2px -2px 2px #f00'
                    }}
                    alt={e.image}>10</Col>
                  <TiArrowSortedDown
                    className="text-light col-12"
                    size={40} />
                </Col>
              )}
            </Row>
          </Container>
          {renderDeck()}
        </Row>
      </Container>
    </>
  )
}

export default Deck;