import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../../services/api';

import AdminHomeMain from '../../../components/AdminHomeMain';
import AdminViewUsers from '../../../components/AdminViewUsers';
import AdminCreateUser from '../../../components/AdminCreateUser';
import AdminViewSlots from '../../../components/AdminViewSlots';
import AdminCreateSlot from '../../../components/AdminCreateSlot';
import AdminViewMenuItems from '../../../components/AdminViewMenuItems';
import AdminCreateMenuItem from '../../../components/AdminCreateMenuItem';

import './styles.css';

import asystecLogo from '../../../assets/logo-small.png'

function AdminHome(){
  const [id, setID] = useState(localStorage.getItem("id"));
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [component, setComponent] = useState('AdminHomeMain');
  
  const history = useHistory();

  useEffect(() => {
    async function loadProfile(){
    try {
      
      if(!id || !accessToken || isAdmin == 0) return history.push('/admin/login');
      
      const response = await api.get(`/users/${id}`);

      setFirstName(response.data.user.first_name);
      setLastName(response.data.user.last_name);

    } catch (error) {
      alert(`Couldn't Load User Profile. Please try again. Error: ${error}.`);
    }
  }
  loadProfile();
  }, [])

  return (
    <div className="admin-home-container">
      <header>
        <img src={asystecLogo} alt="asystec"/>

        <p>Logged as: {firstName +' '+lastName}</p>
        <Link onClick={() => {
          localStorage.setItem('id', '');
          localStorage.setItem('accessToken', '');
          localStorage.setItem('isAdmin', 0);
          return history.push('/admin/login');
        }}>Logout</Link>
      </header>

      <menu>
        <div className="general-links">
          <Link onClick={() => setComponent('AdminHomeMain')}>Admin Panel</Link>
        </div>
        <div className="users-links">
          <Link onClick={() => setComponent('AdminViewUsers')}>View Users</Link>
          <Link onClick={() => setComponent('AdminCreateUser')}>Create User</Link>
        </div>

        <div className="slots-links">
          <Link onClick={() => setComponent('AdminViewSlots')}>View Slots</Link>
          <Link onClick={() => setComponent('AdminCreateSlot')}>Create Slot</Link>
        </div>

        <div className="menu-items-links">
          <Link onClick={() => setComponent('AdminViewMenuItems')}>View Menu Items</Link>
          <Link onClick={() => setComponent('AdminCreateMenuItem')}>Create Menu Item</Link>
        </div>
      </menu>

      <main>
        {component == 'AdminHomeMain' &&
          <AdminHomeMain />
        }

        {component == 'AdminViewUsers' &&
          <AdminViewUsers />
        }

        {component == 'AdminCreateUser' &&
          <AdminCreateUser />
        }

        {component == 'AdminViewSlots' &&
          <AdminViewSlots />
        }

        {component == 'AdminCreateSlot' &&
          <AdminCreateSlot />
        }

        {component == 'AdminViewMenuItems' &&
          <AdminViewMenuItems />
        }

        {component == 'AdminCreateMenuItem' &&
          <AdminCreateMenuItem />
        }
      </main>

      <footer>
        <p>Created by Lucas Da Silva</p>
        <a className="footer-links" href="https://github.com/lucasfdsilva/restaurant-management">GitHub Repo</a>
      </footer>
    </div>
  )
}

export default AdminHome;