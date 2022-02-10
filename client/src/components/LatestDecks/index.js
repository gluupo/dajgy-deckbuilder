import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ALL_DECKS } from '../../utils/queries';

const LatestDeck = () => {
  const { loading, data } = useQuery(GET_ALL_DECKS, { variables: { order: -1, limit: 5 } });
  const decks = data?.getAllDecks || [];


  const renderDecks = () => {
    if (loading) {
      return <h2>Loading ...</h2>
    } else if (!decks.length) return null;
    console.log(decks);
    return decks.map(deck => <div>{deck.name}</div>)
  }

  return (
    <div>
      {renderDecks()}
    </div>
  )
}

export default LatestDeck;