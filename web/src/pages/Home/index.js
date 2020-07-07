import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

import logoSmall from '../../assets/underdog-logo.jpg';
import pintImg from '../../assets/pint-img.png';

function Home(){

  const history = useHistory();

  return (
    <div className="home-container">

      <header>
        <img src={logoSmall} alt="asystec logo"/>
        <Link className="header-link" to="/">Home</Link>
        <Link className="header-link" to="/menu">Menu</Link>
        <Link className="header-link" to="/register">Register</Link>
        <Link className="header-link" to="/login">Login</Link>
        <Link className="header-link" to="/bookings/new">Book Online</Link>
        <Link className="header-link" onClick={() => {
          localStorage.setItem('id', '');
          localStorage.setItem('accessToken', '');
          return history.push('/');
        }}>Logout</Link>
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