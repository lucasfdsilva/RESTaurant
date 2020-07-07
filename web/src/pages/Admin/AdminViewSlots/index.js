import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../../services/api';

import './styles.css';

function AdminViewSlots(){
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    api.get('slots')
      .then(response => {
        var formattedSlots = [];
        for(const slot of response.data){
          var weekDays = [];
          if(slot.monday) weekDays.push('Monday, ');
          if(slot.tuesday) weekDays.push('Tuesday, ');
          if(slot.wednesday) weekDays.push('Wednesday, ');
          if(slot.thursday) weekDays.push('Thursday, ');
          if(slot.friday) weekDays.push('Friday, ');
          if(slot.saturday) weekDays.push('Saturday, ');
          if(slot.sunday) weekDays.push('Sunday');
          if(!slot.sunday && !slot.monday &&!slot.tuesday &&!slot.wednesday &&!slot.thursday &&!slot.friday &&!slot.saturday) weekDays.push('No Week Day Selected');

          formattedSlots.push({"id": slot.id, "start_time": slot.start_time, "duration": slot.duration, "max_capacity": slot.max_capacity, "week_days": weekDays});
        }

        setSlots(formattedSlots);
      })
  }, [])

  return (
    <div className="admin-slots-container">
      <header className="top-navigation">
      <Link className="header-link" to="/admin">Admin Panel</Link>
      <div class="dropdown">
          <Link className="header-link" to="/">Users</Link>
          <div class="dropdown-content">
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

      <h1>Registered Slots</h1>

      <div className="slots">
        <ul>
          {slots.map(slot => (

            <li key={slot.id}>
              <strong>Slot ID:</strong>
              <p>{slot.id}</p>

              <strong>Start Time:</strong>
              <p>{slot.start_time}</p>

              <strong>Duration:</strong>
              <p>{slot.duration} minutes</p>

              <strong>Max Capacity:</strong>
              <p>{slot.max_capacity} people</p>

              <strong>Weekdays:</strong>
              <p>{slot.week_days}</p>

            </li>
          ))}
        </ul>
      </div>
    
    </div>

    
  )
}

export default AdminViewSlots;