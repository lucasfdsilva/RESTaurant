import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

import hamburguerImg from '../../assets/hamburguer.png';
import logoSmall from '../../assets/underdog-logo.jpg';

function Login(){
  return (
    <div className="login-container">
      <header>
        <img src={logoSmall} alt="asystec logo"/>
        <Link className="header-link" to="/">Home</Link>
        <Link className="header-link" to="/menu">Menu</Link>
        <Link className="header-link" to="/register">Register</Link>
        <Link className="header-link" to="/login">Login</Link>
        <Link className="header-link" to="/bookings/new">Book Online</Link>
      </header>

      <div className="content">
        <section className="form">
          
          <form>
            <h1>Login</h1>

            <input type="email" placeholder="you@email.com"/>
            <input type="password" placeholder="password"/>

            <button className="button" type="submit">Login</button>

            <Link className="back-link" to="/register">
              <FiLogIn size={16} color="#e02041"/>
              Don't have an account?
            </Link>

          </form>
        </section>

        <img src={logoSmall} alt="Asystec Logo"/>
      </div>
    </div>
  )
}

export default Login;