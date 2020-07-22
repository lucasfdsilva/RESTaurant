import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';


import './styles.css';

import api from '../../../services/api';

function AdminViewSlots(){
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    async function loadMenuItems(){
    try {
      
      const response = await api.get(`/menu`);
      setMenuItems(response.data);

    } catch (error) {
      alert(`Couldn't Load Menu Items. Please try again. Error: ${error}.`);
    }
  }
  loadMenuItems();
  }, [])

  return (
    <div className="admin-slots-container">
      <h1>Menu Items</h1>  

      <ul>
        {menuItems.map(item => (
          <li key={item.id}>
            <strong>Menu Item ID:</strong>
            <p>{item.id}</p>

            <strong>Name:</strong>
            <p>{item.name}</p>

            <strong>Price:</strong>
            <p>€{item.price}</p>

            <strong>Description:</strong>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>

    
  )
}

export default AdminViewSlots;