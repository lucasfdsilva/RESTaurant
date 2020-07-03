import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

import hamburguerImg from '../../assets/hamburguer.png';
import logoSmall from '../../assets/logo-small.png';

function Login(){
  return (
    <div className="login-container">
      <div className="content">
        <section className="form">
          <img src={logoSmall} alt="Asystec Logo Small"/>

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

        <img src={hamburguerImg} alt="Asystec Logo"/>
      </div>
    </div>
  )
}

export default Login;