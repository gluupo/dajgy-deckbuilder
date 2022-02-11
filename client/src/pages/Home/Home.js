// Node Modules
import React from 'react';
// Utilities
import Auth from '../../utils/auth';
// Components
import LatestDeck from '../../components/LatestDecks';

const Home = () => {

  const renderUsername = () => {
    if (!Auth.loggedIn()) return null;
    return Auth.getProfile().data.username;
  }

  return (
    <>
      <div className="" id="bg"></div>
      <div className='my-auto'>
        <LatestDeck />
      </div>
      <div>
        {renderUsername()}
      </div>
    </>
  );
};

export default Home;
