import React from 'react';
import { useHistory } from 'react-router-dom';
import NavMenu from '../../../components/NavMenu';

import './styles.css';

function Login(){

  const history = useHistory();

  return (
    <div className="menu-container">
      <NavMenu />

      <div className="content">
        <h1>Menu Items</h1>  
      </div>

    </div>
  )
}

export default Login;