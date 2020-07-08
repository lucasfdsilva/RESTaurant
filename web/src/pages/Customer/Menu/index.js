import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NavMenu from '../../../components/NavMenu';

import api from '../../../services/api';

import './styles.css';

function Login(){
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

  const history = useHistory();

  return (
    <div className="menu-container">
      <NavMenu />

      <div className="content">
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

    </div>
  )
}

export default Login;