import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';


function AdminHome(){

  return (
    <div className="admin-home-container">

      <header className="top-navigation">
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
            <Link className="header-link" to="/admin/slots/new">Create Timeslot</Link>
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
      
      <h1>Welcome to Admin Panel</h1>

    </div>
  )
}

export default AdminHome;