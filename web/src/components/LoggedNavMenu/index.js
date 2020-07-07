import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

import logoSmall from '../../assets/underdog-logo.jpg';

function LoggedNavMenu(){

  const history = useHistory();

  return(
    <div className="navigation-menu">
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

export default LoggedNavMenu;
