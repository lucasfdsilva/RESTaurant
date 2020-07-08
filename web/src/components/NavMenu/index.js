import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

import logoSmall from '../../assets/underdog-logo.jpg';

function NavMenu(){
  const [id, setID] = useState(localStorage.getItem("id"));
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));

  const history = useHistory();

  if(id && accessToken){
    return (
      <div className="navigation-menu-container">
      <header>
        <img src={logoSmall} alt="asystec logo"/>
        <Link className="header-link" to="/">Home</Link>
        <Link className="header-link" to="/menu">Menu</Link>
        <Link className="header-link" to="/profile">Profile</Link>
        <Link className="header-link" to="/bookings">Bookings</Link>
        <Link className="header-link" to="/bookings/new">Book Online</Link>
        <Link className="header-link" onClick={() => {
          localStorage.setItem('id', '');
          localStorage.setItem('accessToken', '');
          return history.push('/');
        }}>Logout</Link>
      </header>
    </div>
    )
  }

  return(
    <div className="navigation-menu">
      <header>
        <img src={logoSmall} alt="asystec logo"/>
        <Link className="header-link" to="/">Home</Link>
        <Link className="header-link" to="/menu">Menu</Link>
        <Link className="header-link" to="/register">Register</Link>
        <Link className="header-link" to="/login">Login</Link>
      </header>
    </div>
  )

}

export default NavMenu;
