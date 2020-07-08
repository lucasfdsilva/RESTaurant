import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

function AdminViewUsers(){
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('users')
      .then(response => {
        var formattedUsers = [];
        for(const user of response.data){
          if(user.is_admin == 0){
            formattedUsers.push({ "id": user.id, "first_name": user.first_name, "last_name": user.last_name, "email": user.email, "is_admin": "No"})
          } else{
            formattedUsers.push({ "id": user.id, "first_name": user.first_name, "last_name": user.last_name, "email": user.email, "is_admin": "Yes"})
          }
        }
        setUsers(formattedUsers);
        })
  }, [])

  return (
    <div className="admin-slots-container">
      <h1>Registered Users</h1>

      <div className="slots">
        <ul>
          {users.map(user => (

            <li key={user.id}>
              <strong>User ID:</strong>
              <p>{user.id}</p>

              <strong>First Name:</strong>
              <p>{user.first_name}</p>

              <strong>Last Name:</strong>
              <p>{user.last_name}</p>

              <strong>Email:</strong>
              <p>{user.email}</p>

              <strong>Is Admin:</strong>
              <p>{user.is_admin}</p>
            </li>
          ))}
        </ul>
      </div>
    
    </div>

    
  )
}

export default AdminViewUsers;