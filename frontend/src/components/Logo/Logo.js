import React from 'react';
import Tilt from 'react-parallax-tilt';
import eye from './sharpeye.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className='logo-container'>
      <Tilt className='tilt'>
        <div className='inner-tilt'>
          <img src={eye} alt='App logo'/>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;
