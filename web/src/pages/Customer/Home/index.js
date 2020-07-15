import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import NavMenu from '../../../components/NavMenu';

import './styles.css';

import pintImg from '../../../assets/pint-img.png';

function Home(){

  const history = useHistory();

  return (
    <div className="home-container">
      <NavMenu />

      <div className="content">
        <h1>Pub Name</h1>
        <h2>The Best Pub</h2>
        <img src={pintImg} alt="image of a pint"/>
      </div>
    </div>
  )
}

export default Home;