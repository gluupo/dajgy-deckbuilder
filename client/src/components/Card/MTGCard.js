import React from "react";
import { Col } from "react-bootstrap"
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { ADD_TO_DECK } from "../../utils/mutations";
import './assets/styles.css';



const MTGCard = (item) => {
  const [addtoDeck, { data, loading, error }] = useMutation(ADD_TO_DECK);


  const {
    name,
    types,
    manaCost,
    supertypes,
    rarity,
    imageUrl,
    text,
    multiverseid
  } = item;

  const clickHandler = () => {
    console.log(item)
    addtoDeck(item)
  }

  const divStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '360px'

  }


  return (
    <Col xs={12} sm={6} md={3} key={multiverseid} style={divStyle} alt={`${name} ${manaCost} \n${text}`} title={`${name} ${manaCost} \n${text}`} className='mb-3 m-1' onClick={Auth.loggedIn() ? clickHandler : null}>
    </Col >
  )
}


export default MTGCard;