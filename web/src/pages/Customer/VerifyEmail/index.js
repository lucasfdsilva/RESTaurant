import React, { useEffect, useState } from 'react'

import './styles.css'

import NavigationMenu from '../../../components/NavigationMenu';
import Footer from '../../../components/Footer';

import VerifyEmail from '../../../components/VerifyEmail';

export default function Layout(props) {

  return (
    <div className="layout">
      <NavigationMenu/>

      <VerifyEmail/>

      <Footer/>
    </div>
  )
}
