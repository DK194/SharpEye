import React from 'react';
import './Nav.css';

const Nav = ({ onRouteChange }) => {
  return(
    <nav className='nav'>
      <p onClick={() => onRouteChange('signin')}>
        Sign In
      </p>
      <p onClick={() => onRouteChange('register')}>
        Register
      </p>
    </nav>
  );
}

export default Nav;
