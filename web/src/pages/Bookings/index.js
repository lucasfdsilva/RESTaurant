import React from 'react';
import { Link } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';

import logoSmall from '../../assets/logo-small.png';

function Bookings(){
  return (
    <div className="bookings-container">

      <header>
        <img src={logoSmall} alt="asystec small logo"/>
        <span>Welcome, USERNAME</span>

        <Link className="button" to="/bookings/new">Make a Booking</Link>
        <button type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Your Bookings</h1>

      <ul>
        <li>
          <strong>Date:</strong>
          <p>DD/MM/YYYY</p>

          <strong>Time:</strong>
          <p>HH:MM</p>

          <strong>Table:</strong>
          <p>Table Name</p>

          <strong>People:</strong>
          <p>Number of People</p>

          <button type="button">
            <FiTrash2 size={20} color="#a8a8b3"/>
          </button>
        </li>

        <li>
          <strong>Date:</strong>
          <p>DD/MM/YYYY</p>

          <strong>Time:</strong>
          <p>HH:MM</p>

          <strong>Table:</strong>
          <p>Table Name</p>

          <strong>People:</strong>
          <p>Number of People</p>

          <button type="button">
            <FiTrash2 size={20} color="#a8a8b3"/>
          </button>
        </li>

        <li>
          <strong>Date:</strong>
          <p>DD/MM/YYYY</p>

          <strong>Time:</strong>
          <p>HH:MM</p>

          <strong>Table:</strong>
          <p>Table Name</p>

          <strong>People:</strong>
          <p>Number of People</p>

          <button type="button">
            <FiTrash2 size={20} color="#a8a8b3"/>
          </button>
        </li>

        <li>
          <strong>Date:</strong>
          <p>DD/MM/YYYY</p>

          <strong>Time:</strong>
          <p>HH:MM</p>

          <strong>Table:</strong>
          <p>Table Name</p>

          <strong>People:</strong>
          <p>Number of People</p>

          <button type="button">
            <FiTrash2 size={20} color="#a8a8b3"/>
          </button>
        </li>
      </ul>

    </div>
  )
}

export default Bookings;