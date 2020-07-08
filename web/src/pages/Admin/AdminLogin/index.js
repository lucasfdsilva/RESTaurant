import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../../services/api';

import './styles.css';

function Login(){
  const [id, setID] = useState(localStorage.getItem("id"));
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  useEffect(() => {
    async function loadProfile(){
      try {
        if(id && accessToken && isAdmin) return history.push('/admin');

      } catch (error) {
        alert(`Couldn't Load User Profile. Please try again. Error: ${error}.`);
      }
  }
  loadProfile();
  }, [])

  async function handleLogin(event){
    event.preventDefault();

    const data = {
      email,
      password
    }

    try {
      const response = await api.post('sessions', data);
      if(!response.data.isAdmin) return alert('User is not an admin. Cannot access Admin Panel');

      localStorage.setItem('id', response.data.id);
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('isAdmin', response.data.isAdmin);

      alert(`User Logged In Successfully. JWT Token: ${localStorage.getItem('accessToken')}`);

      history.push('/admin');

    } catch (error) {
        alert(`Couldn't Log in. Error: ${error}.`);
    }
  }
  
  return (
    <div className="login-container">

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

          </form>
        </section>

      </div>
    </div>
  )
}

export default Login;