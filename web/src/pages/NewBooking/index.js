import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import logoSmall from '../../assets/logo-small.png'

function NewBooking() {
  return (
    <div className="new-booking-container">
      <div className="content">
        <section>
          <img src={logoSmall} alt="asystec small logo"/>

          <h1>New Booking</h1>

          <Link className="back-link" to="/bookings">
            <FiArrowLeft size={16} color="#e02041"/>
            Your Bookings
          </Link>
        </section>

        <form action="submit">

          <input type="date" placeholder="Date"/>
          <input type="number" placeholder="Number of people"/>

          <button className="secondary-button">Check Availability</button>
          
          <select>
            <option value="Time Slot">Time Slot</option>
            <option value="2">1</option>
            <option value="3">2</option>
          </select>

          <select>
            <option value="Table">Table</option>
            <option value="2">Table 1</option>
            <option value="3">Table 2</option>
          </select>

          <button className="button" type="submit">Send Booking</button>

        </form>

      </div>
    </div>
  )
}

export default NewBooking;