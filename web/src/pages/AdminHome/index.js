import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';


function AdminHome(){

  return (
    <div className="admin-home-container">
      <header className="top-navigation">
        <Link className="header-link" to="/"> Logout </Link>
      </header>
      <header className="menu">     
        <ul>
          <li>
            <div class="dropdown">
              <span>Users</span>
              <div class="dropdown-content">
              <Link className="header-link" to="/">View User</Link>
              <Link className="header-link" to="/">Create User</Link>
              </div>
            </div>
          </li>
          <li>
            <div class="dropdown">
              <span>Time Slots</span>
              <div class="dropdown-content">
              <Link className="header-link" to="/">View Timeslots</Link>
              <Link className="header-link" to="/">Create Timeslot</Link>
              </div>
            </div>
          </li>               
          <li>
            <div class="dropdown">
              <span>Bookings</span>
              <div class="dropdown-content">
              <Link className="header-link" to="/">View Bookings</Link>
              </div>
            </div>
          </li>
        </ul>
      </header>

    </div>

    
  )
}

export default AdminHome;