import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import logoSmall from '../../assets/logo-small.png';

function Register(){
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoSmall} alt="asystec small logo"/>

          <h1>Register</h1>

          <Link className="back-link" to="/login">
            <FiArrowLeft size={16} color="#e02041"/>
            Already have an account?
          </Link>
        </section>

        <form action="submit">

          <input placeholder="First Name"/>
          <input placeholder="Last Name"/>
          <input type="email" placeholder="you@email.com"/>
          <input type="password" placeholder="password"/>
          <input type="password" placeholder="confirm password"/>

          <button className="button" type="submit">Register</button>

        </form>

      </div>
     
    </div>
  )
}

export default Register;