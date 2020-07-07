import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import logoSmall from '../../assets/underdog-logo.jpg';

function Login(){
  return (
    <div className="menu-container">
      <header>
        <img src={logoSmall} alt="asystec logo"/>
        <Link className="header-link" to="/">Home</Link>
        <Link className="header-link" to="/menu">Menu</Link>
        <Link className="header-link" to="/register">Register</Link>
        <Link className="header-link" to="/login">Login</Link>
        <Link className="header-link" to="/bookings/new">Book Online</Link>
      </header>

      <div className="content">
        <h1>Menu Items</h1>  
      </div>

    </div>
  )
}

export default Login;