import React, { useEffect, useState } from 'react'

import './styles.css'

import NavigationMenu from '../../../components/NavigationMenu';
import Footer from '../../../components/Footer';

import Menu from '../../../components/Menu';

export default function Layout(props) {

  return (
    <div className="layout">
      <NavigationMenu/>

      <Menu/>

      <Footer/>
    </div>
  )
}
