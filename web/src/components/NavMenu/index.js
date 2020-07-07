import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

import logoSmall from '../../assets/underdog-logo.jpg';

function NavMenu(){

  const history = useHistory();

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
