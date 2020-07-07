import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import hamburguerImg from '../../assets/hamburguer.png';
import logoSmall from '../../assets/underdog-logo.jpg';

function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  async function handleLogin(event){
    event.preventDefault();

    const data = {
      email,
      password
    }

    try {
      const response = await api.post('sessions', data);

      console.log(response)

      localStorage.setItem('id', response.data.id);
      localStorage.setItem('accessToken', response.data.accessToken);

      alert(`User Logged In Successfully. JWT Token: ${localStorage.getItem('accessToken')}`);

      history.push('/profile');

    } catch (error) {
        alert(`Couldn't Log in. Error: ${error}.`);
    }
  }
  
  return (
    <div className="login-container">
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
        <section className="form">
          
          <form onSubmit={handleLogin}>
            <h1>Login</h1>

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