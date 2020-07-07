import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';

import logoSmall from '../../assets/underdog-logo.jpg';

function Register(){
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const history = useHistory();

  async function handleRegister(event){
    event.preventDefault();

    if(password !== passwordConfirmation) alert("Passwords don't match. Please try again");

    const data = {
      firstName,
      lastName,
      email,
      password,
      isAdmin: false
    }

    try {
      const response = await api.post('users', data);

      alert(`User Registered Successfully. User ID: ${response.data.newUserID[0]}`);

      history.push('/login');

    } catch (error) {
        alert(`Couldn't Register User. Error: ${error}.`);
    }
  }

  return (
    <div className="register-container">
      <header>
        <img src={logoSmall} alt="asystec logo"/>
        <Link className="header-link" to="/">Home</Link>
        <Link className="header-link" to="/menu">Menu</Link>
        <Link className="header-link" to="/register">Register</Link>
        <Link className="header-link" to="/login">Login</Link>
        <Link className="header-link" to="/bookings/new">Book Online</Link>
      </header>

      <div className="content">
        <section>
          <img src={logoSmall} alt="asystec small logo"/>

          <h1>Register</h1>

          <Link className="back-link" to="/login">
            <FiArrowLeft size={16} color="#e02041"/>
            Already have an account?
          </Link>
        </section>

        <form onSubmit={handleRegister}>

          <input 
            placeholder="First Name"
            value={firstName}
            onChange={event => setFirstName(event.target.value)}
          />
          <input 
            placeholder="Last Name"
            value={lastName}
            onChange={event => setLastName(event.target.value)}
          />
          <input 
            type="email" 
            placeholder="you@email.com"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <input 
            type="password" 
            placeholder="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <input 
            type="password" 
            placeholder="confirm password"
            value={passwordConfirmation}
            onChange={event => setPasswordConfirmation(event.target.value)}
          />

          <button className="button" type="submit">Register</button>

        </form>

      </div>
     
    </div>
  )
}

export default Register;