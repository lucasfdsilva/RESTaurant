import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

export default function AdminNavigationMenu() {
  return (
    <div className="admin-navigation-menu-container">

      <div className="admin-navigation-menu-content">

        <div className="strong-link">
          <Link to='/admin'>Home</Link>
        </div>

        <div className="weak-link">
          <Link to='/admin/users'>Users</Link>
        </div>

        <div className="strong-link">
          <Link to='/admin/slots'>Slots</Link>
        </div>

        <div className="weak-link">
          <Link to='/admin/menu'>Menu</Link>
        </div>

        <div className="strong-link">
          <Link to='/admin/bookings'>Bookings</Link>
        </div>

      </div>

    </div>
  )
}

