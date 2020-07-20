import React, { useEffect, useState } from 'react'

import './styles.css'

import NavigationMenu from '../../../components/NavigationMenu';
import Footer from '../../../components/Footer';

import Login from '../../../components/Login';

export default function Layout(props) {

  return (
    <div className="layout">
      <NavigationMenu/>

      <Login/>

      <Footer/>
    </div>
  )
}
