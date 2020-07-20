import React, { useEffect, useState } from 'react'

import './styles.css'

import NavigationMenu from '../../../components/NavigationMenu';
import Footer from '../../../components/Footer';

import Profile from '../../../components/Profile';

export default function Layout(props) {

  return (
    <div className="layout">
      <NavigationMenu/>

      <Profile/>

      <Footer/>
    </div>
  )
}
