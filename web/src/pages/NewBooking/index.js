import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoSmall from '../../assets/logo-small.png'

function NewBooking() {
  const [date, setDate] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [slotID, setSlotID] = useState(0);

  const history = useHistory();

  async function handleCheckAvailability(event){
    event.preventDefault();

    const response = await api.get(`availability?date=${date}&numberOfPeople=${parseInt(numberOfPeople)}`);
    if(response.data.availableSlots.length == 0){
      alert('No Slots available on this date');
    }
    
    setAvailableSlots(response.data.availableSlots);
  }

  async function handleBookingCreation(event){
    event.preventDefault();

    const data = {
      userID: 3,
      date,
      slotID,
      numberOfPeople: parseInt(numberOfPeople),
    }

    try {
      const response = await api.post('bookings', data);

      alert('Booking Registered Succesfully');

      history.push('/')

    } catch (error) {
      alert(`Couldn't Create Booking.`);
    }
  }

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

          <input 
            type="date" 
            value={date}
            onChange={event => setDate(event.target.value)}
          />
          <input 
            type="number" 
            placeholder="Number of people"
            value={numberOfPeople}
            onChange={event => setNumberOfPeople(event.target.value)}
          />

          <button className="secondary-button" onClick={handleCheckAvailability}>Check Availability</button>

          <ul>
            {availableSlots.map(slot => (
              <button key={slot.slot_id} value={slotID} onClick={ function(event){ setSlotID(slot.slot_id); event.preventDefault()} }>
                <strong>{slot.start_time}</strong>
              </button>
            ))}
          </ul>

          <button className="button" disabled={slotID == 0} onClick={handleBookingCreation}>Send Booking</button>

        </form>

      </div>
    </div>
  )
}

export default NewBooking;