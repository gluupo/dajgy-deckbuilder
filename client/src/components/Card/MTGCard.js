import React from "react";
import { Col, Button } from "react-bootstrap"
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../../utils/auth";
import { GET_DECK } from "../../utils/queries";
import { ADD_TO_DECK, REMOVE_FROM_DECK } from "../../utils/mutations";
import './assets/styles.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useToasts } from 'react-toast-notifications'



const MTGCard = (item) => {
  const { addToast } = useToasts();
  let {
    multiverseid,
    text,
    manaCost,
    name,
    supertypes,
    rarity,
    imageUrl,
    types,
    editable,
    cardCount,
    deckId
  } = item;
  const { loading, data, error: deckError } = useQuery(GET_DECK, { variables: { _id: '6205cea3a8acc60016fefc87' } });
  const deck = data?.getDeck || {}

  const [addToDeck, { error }] = useMutation(ADD_TO_DECK, {
    refetchQueries: [
      GET_DECK, // DocumentNode object parsed with gql
      'getDeck' // Query name
    ],
  });

  const [removeCard, { removeError }] = useMutation(REMOVE_FROM_DECK, {
    refetchQueries: [
      GET_DECK, // DocumentNode object parsed with gql
      'getDeck' // Query name
    ],
  });

  const clickHandler = async (e) => {
    try {
      // Execute mutation and pass in defined parameter data as variables

      const copy = {
        multiverseid,
        text,
        manaCost,
        name,
        supertypes,
        rarity,
        imageUrl,
        types,
      }

      if (e.target.dataset.type === '+') {
        const { data } = await addToDeck({
          variables: { input: copy }
        });
        addToast('Card Added', {
          appearance: 'success',
          autoDismiss: true,
        })
      } else if (e.target.dataset.type === '-') {
        const { data } = await removeCard({
          variables: { multiverseid: multiverseid }
        })
        addToast('Card Removed', {
          appearance: 'error',
          autoDismiss: true,
        })
      }
    } catch (err) {
    }
  }



  // if (error) console.log(error)
  // if (removeError) console.log(removeError)

  const renderButtons = () => {
    if (editable) {
      return (
        <ButtonGroup>
          <Button
            variant="outline-light"
            className="m-1"
            data-type="+"
            onClick={Auth.loggedIn()
              ? clickHandler
              : null}
          >
            +
          </Button>
          <Button
            variant="outline-light"
            className="m-1"
            data-type="-"
            onClick={Auth.loggedIn()
              ? clickHandler
              : null}
          >
            -
          </Button>
        </ButtonGroup>
      )
    }
  }


  return (

    <Col xs={12} sm={6} md={3} key={name} className='mb-3 m-1'>
      {cardCount ? <h4 className="text-white">{cardCount} in Deck</h4> : null}
      <img src={imageUrl} className="mtg-card" alt={`${name} ${manaCost} \n${text}`} title={`${name} ${manaCost} \n${text}`} />
      {renderButtons()}
    </Col >
  )
}


export default MTGCard;