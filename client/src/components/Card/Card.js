import React from "react";
import { Col } from "react-bootstrap"

const Card = (item) => {



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


  const addToDeck = () => {
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
    <Col xs={3} key={multiverseid} style={divStyle} alt={`${name} ${manaCost} \n${text}`} title={`${name} ${manaCost} \n${text}`} className='mb-3' onClick={() => addToDeck(multiverseid)}>
    </Col>
  )
}


export default Card;