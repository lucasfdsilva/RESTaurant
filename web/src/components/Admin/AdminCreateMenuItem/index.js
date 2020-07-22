import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

import api from '../../../services/api';

function AdminCreateSlots(){
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState(0);

  const history = useHistory();

  async function handleMenuItemCreation(event){
    event.preventDefault();

    const data = {
      name,
      price,
      description,
      stock
    }

    try {
      const response = await api.post('menu', data);
      alert(`Menu Item created succesfully`);
      history.push('/admin')
      
    } catch (error) {
        alert(`Couldn't create menu item`);
    }
  }

  return (
    <div className="admin-slots-container">
      <h1>Create Menu Item</h1>

      <form onSubmit={handleMenuItemCreation}>

          <strong>Name:</strong>
          <input 
            type="text"
            placeholder="Menu Item Name"
            value={name}
            onChange={event => setName(event.target.value)}
          />
          <strong>Price:</strong>
          <input 
            type="number"
            placeholder="Item Price"
            value={price}
            onChange={event => setPrice(event.target.value)}
          />
          <strong>Description:</strong>
          <input 
            type="text" 
            placeholder="Item Description"
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
          <strong>Stock:</strong>
          <input 
            type="number"
            placeholder="Item Stock Level"
            value={stock}
            onChange={event => setStock(event.target.value)}
          />

          <button className="button" type="submit">Create Menu Item</button>

      </form>
    
    </div>
  )
}

export default AdminCreateSlots;