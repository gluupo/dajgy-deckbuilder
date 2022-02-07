import React from "react";
import { Col } from "react-bootstrap"


const Card = ({ name, types, manaCost, superTypes, rarity, imageUrl, text, multiverseid }) => {



  const divStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '360px'
  }

  return (
    <Col xs={3} key={multiverseid} style={divStyle} className='mb-3'>
    </Col>
  )
}


export default Card;