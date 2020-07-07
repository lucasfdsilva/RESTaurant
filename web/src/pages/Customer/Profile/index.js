import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

import LoggedNavMenu from '../../../components/LoggedNavMenu';

import api from '../../../services/api';

import './styles.css';

function Profile(){
  const [id, setID] = useState(localStorage.getItem("id"));
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [memberSince, setMemberSince] = useState('')

  const history = useHistory();

  useEffect(() => {
    async function loadProfile(){
    try {
      
      if(!id || !accessToken) return history.push('/login');
      
      const response = await api.get(`/users/${id}`);

      setFirstName(response.data.user.first_name);
      setLastName(response.data.user.last_name);
      setEmail(response.data.user.email);
      setMemberSince(response.data.user.created_at);

    } catch (error) {
      alert(`Couldn't Load User Profile. Please try again. Error: ${error}.`);
    }
  }
  loadProfile();
  }, [])

  async function handleDeleteUser(){
    try {

      const response = await api.delete('users', { data: { id: id }});

      localStorage.setItem('id', '');
      localStorage.setItem('accessToken', '');

      alert(`User Deleted Succesfully ${response.data}`);

      history.push('/');
      
    } catch (error) {
      alert(`Could not delete user. Error: ${error}`)
    }

  }

  return (
    <div className="profile-container">
      <LoggedNavMenu />

      <div className="content">
        
        <form>
          <strong>First Name: </strong>
          <p>{firstName}</p>

          <strong>Last Name: </strong>
          <p>{lastName}</p>

          <strong>Email: </strong>
          <p>{email}</p>

          <strong>Member Since: </strong>
          <p>{memberSince}</p>
        </form>

        <Link className="back-link" to="/profile/edit">
          <FiEdit2 size={16} color="#e02041"/>
          Edit Profile
        </Link>

        <Link className="back-link" onClick={handleDeleteUser}>
          <FiTrash2 size={16} color="#e02041"/>
          Delete Account
        </Link>

      </div>
    </div>
  )
}

export default Profile;