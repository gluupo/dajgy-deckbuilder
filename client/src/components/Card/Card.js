import React from "react";
import { Col } from "react-bootstrap"

const Card = (item) => {



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


  const addToDeck = () => {

  }


  const divStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '360px'
  }

  console.log(item)

  return (
    <Col xs={3} key={multiverseid} style={divStyle} alt={`${name} ${manaCost} \n${text}`} title={`${name} ${manaCost} \n${text}`} className='mb-3' onClick={() => addToDeck(multiverseid)}>
    </Col>
  )
}


export default Card;