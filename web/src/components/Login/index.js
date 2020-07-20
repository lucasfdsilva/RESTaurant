import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function Login(){
  const [id, setID] = useState(localStorage.getItem("id"));
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  useEffect(() => {
    async function checkIfUserIsLoggedIn(){
      try {
        if(id && accessToken) return history.push('/profile');

      } catch (error) {
        alert(`Couldn't Check if user is Logged in. Please try again. Error: ${error}.`);
      }
  }
  checkIfUserIsLoggedIn();
  }, [])

  async function handleLogin(event){
    event.preventDefault();

    const data = {
      email,
      password
    }

    try {
      const response = await api.post('/sessions', data);

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

      <div className="login-content">
        <h1>Login</h1>

        <form onSubmit={handleLogin}>
          <p>Email: </p>
          <input 
            type="email" 
            placeholder="you@email.com"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />

          <p>Password: </p>
          <input 
            type="password" 
            placeholder="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />

          <button type="submit"
            disabled={!email || !password}>
            Login
          </button>
        </form>

        <Link className="back-link" to="/register">
          <FiLogIn size={16} color="#e02041"/>
          Don't have an account?
        </Link>
          
      </div>

    </div>
  )
}