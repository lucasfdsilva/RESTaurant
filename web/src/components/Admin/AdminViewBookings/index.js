import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';


import './styles.css';

import api from '../../../services/api';

function AdminViewBookings(){
  const [id, setID] = useState(localStorage.getItem("id"));
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function loadProfile(){
    try {
      
      const response = await api.get(`/bookings`);
      setBookings(response.data);

    } catch (error) {
      alert(`Couldn't Load Bookings. Please try again. Error: ${error}.`);
    }
  }
  loadProfile();
  }, [])

  async function handleBookingDeletion(event, bookingID){
    event.preventDefault();

    api.delete('bookings', { data: { id: bookingID }});

    alert('Booking Deleted Succesfully');

    window.location.reload();
  }

  return (
    <div className="bookings-container">
        <h1>All Bookings</h1>

        <div className="bookings">
          <ul>
            {bookings.map(booking => (
              <li key={booking.id}>
                <strong>Booking ID:</strong>
                <p>{booking.id}</p>

                <strong>Slot ID:</strong>
                <p>{booking.slot_id}</p>

                <strong>Date:</strong>
                <p>{booking.date}</p>

                <strong>Start Time:</strong>
                <p>{booking.start_time}</p>

                <strong>Duration:</strong>
                <p>{booking.duration}</p>

                <strong>People:</strong>
                <p>{booking.number_of_people}</p>

                <button onClick={(event) => handleBookingDeletion(event, booking.id)}>
                  <FiTrash2 size={20} color="#a8a8b3"/>
                </button>
              </li>
            ))}
          </ul>
        </div>

    </div>
  )
}

export default AdminViewBookings;