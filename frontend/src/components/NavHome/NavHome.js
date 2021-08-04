import React from 'react';
import './NavHome.css';

const NavHome = ({ onRouteChange }) => {
  return(
    <nav className='nav-home'>
      <p onClick={() => onRouteChange('signin')}>
        Sign In
      </p>
      <p onClick={() => onRouteChange('register')}>
        Register
      </p>
    </nav>
  );
}

export default NavHome;
