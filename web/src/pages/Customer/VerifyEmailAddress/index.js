import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import NavMenu from '../../../components/NavMenu';

import api from '../../../services/api';

import './styles.css';

function VerifyEmailAddress(props){
  const [id, setID] = useState(localStorage.getItem("id"));
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [verificationToken, setVerificationToken] = useState(props.match.params.verificationToken);
  const [message, setMessage] = useState('');

  const history = useHistory();

  useEffect(() => {
    async function verifyEmailAddressHandler(){
      try {

        const response = await api.put(`/users/verify/${verificationToken}`);
        console.log(response)

        setMessage(response.data.message);

      } catch (error) {
        alert(`Couldn't Verify User Email Address. Please try again. Error: ${error}.`);
      }
  }
  verifyEmailAddressHandler();
  }, [])

  return (
    <div className="register-container">
      <NavMenu />

      <div className="content">
        <h1>{message}</h1>
      </div>
     
    </div>
  )
}

export default VerifyEmailAddress;