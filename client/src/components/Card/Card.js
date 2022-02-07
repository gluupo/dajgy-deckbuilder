import React from "react";
import { Col } from "react-bootstrap"
import { useDeckContext } from "../../utils/GlobalState";
import { ADD_TO_DECK, UPDATE_DECK_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";


const Card = (item) => {


  const [state, dispatch] = useDeckContext();

  const {
    name,
    types,
    manaCost,
    superTypes,
    rarity,
    imageUrl,
    text,
    multiverseid
  } = item;

  const { deck } = state

  const addToDeck = (id) => {
    // const cardInDeck = deck.find((deckItem) => deckItem.multiverseid === multiverseid)
    // if (cardInDeck) {
    //   dispatch({
    //     type: UPDATE_DECK_QUANTITY,
    //     multiverseid: multiverseid,
    //     cardQuantity: parseInt(cardInDeck.cardQuantity) + 1
    //   });
    //   idbPromise('deck', 'put', {
    //     ...cardInDeck,
    //     cardQuantity: parseInt(cardInDeck.cardQuantity) + 1
    //   });
    // } else {
    //   dispatch({
    //     type: ADD_TO_DECK,
    //     product: { ...item, cardQuantity: 1 }
    //   });
    //   idbPromise('deck', 'add', { ...item, cardQuantity: 1 });
    // }
  }


  const divStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '360px'
  }

  return (
    <Col xs={3} key={multiverseid} style={divStyle} className='mb-3' onClick={() => addToDeck(multiverseid)}>
    </Col>
  )
}


export default Card;