import React from 'react';
import Logo from '../../components/Logo/Logo';
import NavHome from '../../components/NavHome/NavHome';
import Meta from '../../components/Meta/Meta';
import './HomeScreen.css';

const HomeScreen = ({ onRouteChange }) => {
  return (
    <div className='home-container'>
      <Meta />
      <div className='logo-wrapper'>
        <Logo />
      </div>
      <div className='home-title'>
        <h1>Sharp Eye</h1>
      </div>
      <div className='home-text'>
        <p>Sharp Eye is an app that allows you to detect faces in the pictures. Interested how it works? Give it a try! Register an account now or sign in if you have one already.</p>
      </div>
      <NavHome onRouteChange={onRouteChange} />
    </div>
  );
}

export default HomeScreen;
