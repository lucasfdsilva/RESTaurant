import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../../services/api';

import './styles.css';

function AdminCreateUser(){
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const history = useHistory();

  async function handleRegister(event){
    event.preventDefault();

    const data = {
      firstName,
      lastName,
      email,
      password,
      isAdmin
    }

    try {
      const response = await api.post('users', data);

      alert(`User Registered Successfully. User ID: ${response.data.newUserID[0]}`);

      history.push('/admin/users')

    } catch (error) {
        alert(`Couldn't Register User. Error: ${error}.`);
    }
  }

  return (
    <div className="admin-slots-container">
      <header className="top-navigation">
      <Link className="header-link" to="/admin">Admin Panel</Link>
      <div className="dropdown">
          <Link className="header-link" to="/">Users</Link>
          <div className="dropdown-content">
            <Link className="header-link" to="/">View User</Link>
            <Link className="header-link" to="/">Create User</Link>
          </div>
        </div>

        <div class="dropdown">
          <Link className="header-link" to="/">Time Slots</Link>
          <div class="dropdown-content">
            <Link className="header-link" to="/admin/slots">View Timeslots</Link>
            <Link className="header-link" to="/">Create Timeslot</Link>
          </div>
        </div>

        <div class="dropdown">
          <Link className="header-link" to="/">Bookings</Link>
          <div class="dropdown-content">
            <Link className="header-link" to="/">View Bookings</Link>
          </div>
        </div>

        <Link className="header-link" to="/"> Logout </Link>
      </header>

      <h1>Create User</h1>

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

          <div className="weekdays">
          <strong>Is Admin? </strong>
            <input 
              type="checkbox" 
              value={isAdmin}
              onChange={event => setIsAdmin(event.target.checked)}
            />
          </div>

          <button className="button" type="submit">Create User</button>

      </form>
    
    </div>
  )
}

export default AdminCreateUser;