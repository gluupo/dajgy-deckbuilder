import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ALL_DECKS } from '../../utils/queries';

const LatestDeck = () => {
  const getAllDecks = useQuery(GET_ALL_DECKS);
  return (
    <div>
      {getAllDecks}
    </div>
  )
}

export default LatestDeck;