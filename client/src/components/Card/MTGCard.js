import React from "react";
import { Col, Button } from "react-bootstrap"
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { ADD_TO_DECK, REMOVE_FROM_DECK } from "../../utils/mutations";
import './assets/styles.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';



const MTGCard = (item) => {
  const {
    multiverseid,
    text,
    manaCost,
    name,
    supertypes,
    rarity,
    imageUrl,
    types,
    editable
  } = item;

  const [addToDeck, { error }] = useMutation(ADD_TO_DECK);
  const [removeCard, { removeError }] = useMutation(REMOVE_FROM_DECK);

  const clickHandler = async (e) => {
    try {
      console.log(e.target.dataset.type)
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
      // deletes key from object
      if (e.target.dataset.type === '+') {
        const { data } = await addToDeck({
          variables: { input: copy }
        });
      } else if (e.target.dataset.type === '-') {
        const { data } = await removeCard({
          variables: { multiverseid: multiverseid }
        })
      }
    } catch (err) {
      console.error(err);
    }
  }



  if (error) console.log(error)
  if (removeError) console.log(removeError)

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
      <img src={imageUrl} className="mtg-card" alt={`${name} ${manaCost} \n${text}`} title={`${name} ${manaCost} \n${text}`} />
      {renderButtons()}
    </Col >
  )
}


export default MTGCard;