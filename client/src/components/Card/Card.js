import React from "react";


const Card = ({ name, types, manaCost, superTypes, rarity, imageUrl, text, multiverseid }) => {

  return (
    <div>
      <img key={multiverseid} src={imageUrl} alt={text} />
    </div>
  )
}

export default Card;