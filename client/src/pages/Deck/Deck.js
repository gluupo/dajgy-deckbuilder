import React, { useState } from "react";
import { useParams } from "react-router-dom";
//Components
import { Container, Row, Col, Button } from "react-bootstrap";
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
//Queries & Mutations
import { useQuery, useMutation } from "@apollo/client";
import { EDIT_LAND } from '../../utils/mutations'
import { GET_DECK, QUERY_ME } from '../../utils/queries';
//Components
import MTGCard from '../../components/Card/MTGCard';
import InlineEditDeckName from "../../components/InlineEditDeckName/InlineEditDeckName";
//Assets
import blackmana from './assets/black mana.png';
import whitemana from './assets/white mana.png';
import bluemana from './assets/blue mana.png';
import greenmana from './assets/green mana.png';
import redmana from './assets/red mana.png';

const Deck = () => {
  const { id } = useParams();
  const [value, setValue] = useState();

  //Get Deck
  const { loading: userLoading, data: userData, error: userError } = useQuery(QUERY_ME, {
    variables: { id }
  });
  const { loading, data, error } = useQuery(GET_DECK, { variables: { _id: id } });
  const user = userData?.me || {};
  const deck = data?.getDeck || {};

  if (userError) console.log(userError)


  let editable;


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
  if (manaError) console.log(error)
  if (userLoading) {
    return (
      <h4>Loading...</h4>
    )
  }
  if (id === user.workingDeck) {
    editable = true;
  }

  if (loading) {
    return <h4>Loading...</h4>
  }


  const manaCount = (type) => {
    for (const land in deck) {
      if (land === type) {
        return deck[land]
      }
    }
  }

  const renderMana = () => {
    if (editable) {
      return (
        <>
          {
            manaSymbols.map(e =>
              <Col xs={4} md={2} className="row justify-content-center" key={e.id}>
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
                  alt={e.image}>{manaCount(e.name)}</Col>
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
            )
          }
        </>
      )
    } else {
      return (
        <>
          {
            manaSymbols.map(e =>
              <Col className="row justify-content-center" key={e.id}>
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
                  alt={e.image}>{manaCount(e.name)}</Col>
              </Col>
            )
          }
        </>
      )
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
              editable={editable}
            />)}
        </>
      )
    }
  }

  return (
    <>
      <Container
        className='my-5'>
        <Row
          className="justify-content-center text-center align-items-center m-auto p-0 p-md-4 bg-dark rounded-3" id="bg-card">
          <InlineEditDeckName
            className='col-6'
            value={deck.name || "New Deck" || value} setValue={setValue} editable={editable} />
          <Container>
            <Row className="justify-content-center my-5">
              {renderMana()}
            </Row>
          </Container>
          <Row className='d-flex justify-content-center col-sm-12 mb-5 row'
          >
            {renderDeck()}
          </Row>
        </Row>
      </Container>
    </>
  )
}

export default Deck;