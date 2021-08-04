import React from 'react';
import './NavProfile.css';

const NavProfile = ({ onRouteChange }) => {
  return(
    <nav className='nav-profile'>
      <p onClick={() => onRouteChange('home')}>
        Sign Out
      </p>
    </nav>
  );
}

export default NavProfile;
