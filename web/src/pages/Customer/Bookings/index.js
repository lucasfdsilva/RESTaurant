import React, { useEffect, useState } from 'react'

import './styles.css'

import NavigationMenu from '../../../components/NavigationMenu';
import Footer from '../../../components/Footer';

import Bookings from '../../../components/Bookings';

export default function Layout(props) {

  return (
    <div className="layout">
      <NavigationMenu/>

      <Bookings/>

      <Footer/>
    </div>
  )
}
