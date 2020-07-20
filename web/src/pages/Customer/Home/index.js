import React, { useEffect, useState } from 'react'

import './styles.css'

import NavigationMenu from '../../../components/NavigationMenu';
import Footer from '../../../components/Footer';

import HomePageBody from '../../../components/Home';

export default function Layout() {

  return (
    <div className="layout">
      <NavigationMenu/>

      <HomePageBody/>

      <Footer/>
    </div>
  )
}
