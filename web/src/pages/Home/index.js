import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import logoSmall from '../../assets/underdog-logo.jpg';
import pintImg from '../../assets/pint-img.png';

function Home(){
  return (
    <div className="home-container">

      <header>
        <img src={logoSmall} alt="asystec logo"/>
        <Link className="header-link" to="/menu">Menu</Link>
        <Link className="header-link" to="/register">Register</Link>
        <Link className="header-link" to="/login">Login</Link>
        <Link className="header-link" to="/bookings/new">Book Online</Link>
      </header>

      <div className="content">
        <h1>The Underdog Pub</h1>
        <h2>Beer Specialists</h2>
        <img src={pintImg} alt="image of a pint"/>
      </div>
    </div>
  )
}

export default Home;