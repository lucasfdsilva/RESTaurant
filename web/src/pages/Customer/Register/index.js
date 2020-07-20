import React, { useEffect, useState } from 'react'

import './styles.css'

import NavigationMenu from '../../../components/NavigationMenu';
import Footer from '../../../components/Footer';

import Register from '../../../components/Register';

export default function Layout(props) {

  return (
    <div className="layout">
      <NavigationMenu/>

      <Register/>

      <Footer/>
    </div>
  )
}
