import React, { useEffect, useState } from 'react'

import './styles.css'

import NavigationMenu from '../../../components/NavigationMenu';
import Footer from '../../../components/Footer';

import EditProfile from '../../../components/EditProfile';

export default function Layout(props) {

  return (
    <div className="layout">
      <NavigationMenu/>

      <EditProfile/>

      <Footer/>
    </div>
  )
}
