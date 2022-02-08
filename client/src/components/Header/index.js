import React from 'react';
import Navigation from '../Navigation';

const Header = () => {
  return (
    <header style={{ backgroundImage: ('./assets/banner.png') }} id='header'>
      <Navigation />
    </header>
  );
};

export default Header;
