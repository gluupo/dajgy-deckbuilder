import React, { useState } from "react";
import { GET_DECK } from '../../utils/queries';
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { EDIT_LAND, UPDATE_DECK_NAME } from '../../utils/mutations'
import { Container, Row, Col, Button } from "react-bootstrap";
import MTGCard from '../../components/Card/MTGCard';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import blackmana from './assets/black mana.png';
import whitemana from './assets/white mana.png';
import bluemana from './assets/blue mana.png';
import greenmana from './assets/green mana.png';
import redmana from './assets/red mana.png';
import InlineEditDeckName from "../../components/InlineEditDeckName/InlineEditDeckName";

const Deck = () => {
  const { id } = useParams();
  const [value, setValue] = useState();

  //Get Deck
  const { loading, data, error } = useQuery(GET_DECK, { variables: { _id: id } });
  console.log(data?.getDeck)
  const deck = data?.getDeck || {};

  console.log(data);

  const [editLand, { manaError }] = useMutation(EDIT_LAND, {
    // The update method allows us to access and update the local cache
    update(cache, { data: { editLand } }) {
      try {
        if (deck) {
          cache.writeQuery({
            query: GET_DECK,
            variables: { _id: id },
            data: { deck: { ...deck } }
          });
        }
      } catch (e) {
        // console.error(e);
      }
    }
  });

  const manaSymbols = [
    {
      id: 0,
      image: whitemana,
      name: "plain"
    },
    {
      id: 1,
      image: bluemana,
      name: "island"
    },
    {
      id: 2,
      image: blackmana,
      name: "swamp"
    },
    {
      id: 3,
      image: redmana,
      name: "mountain"
    },
    {
      id: 4,
      image: greenmana,
      name: "forest"
    },
  ]

  if (error) console.log(error);
  if (loading) {
    return <h4>Loading...</h4>
  }

  const renderMana = (type) => {
    for (const land in deck) {
      if (land === type) {
        console.log(deck[land])
        return deck[land]
      }
    }
  }


  const manaDecrementHandler = async (type) => {
    try {
      const { manaData } = await editLand({ variables: { landtype: type, operation: "minus" } })
      return manaData
    } catch (err) {
      console.log(err)
    }
  }

  const manaIncrementHandler = async (type) => {
    try {
      const { manaData } = await editLand({ variables: { landtype: type, operation: "plus" } })
      return manaData
    } catch (err) {
      console.log(err)
    }
  }

  const renderDeck = () => {
    if (deck.cards && deck.cards.length > 0) {
      return (
        <>
          {deck.cards.map(e =>
            < MTGCard
              key={e.multiverseid}
              {...e}
            />)}
        </>
      )
    }
  }

  return (
    <>
      <Container
        className='flex-fill d-flex'>
        <Row
          className="justify-content-center text-center align-items-center m-auto p-4 bg-dark rounded-3" id="bg-card">
          <InlineEditDeckName
            className='col-6'
            value={deck.name || "New Deck"} setValue={setValue} />
          <Container>
            <Row className="justify-content-center">
              {manaSymbols.map(e =>
                <Col className="row justify-content-center" key={e.id}>
                  <Button
                    variant="transparent"
                    onClick={() => manaIncrementHandler(e.name)}
                    style={{
                      "cursor": "pointer"
                    }}
                  >
                    <TiArrowSortedUp
                      className="text-light col-12"
                      size={40}
                    />
                  </Button>
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
                    alt={e.image}>{renderMana(e.name)}</Col>
                  <Button
                    variant="transparent"
                    onClick={() => manaDecrementHandler(e.name)}

                    style={{
                      "cursor": "pointer"
                    }}
                  >
                    <TiArrowSortedDown
                      className="text-light col-12"
                      size={40} />
                  </Button>
                </Col>
              )}
            </Row>
          </Container>
          <Row>
            {renderDeck()}
          </Row>
        </Row>
      </Container>
    </>
  )
}

export default Deck;