import React, { useEffect, useState } from 'react'

import './styles.css'

import NavigationMenu from '../../../components/NavigationMenu';
import Footer from '../../../components/Footer';

import AdminLogin from '../../../components/AdminLogin';

export default function Layout(props) {

  return (
    <div className="layout">
      <NavigationMenu/>

      <AdminLogin/>

      <Footer/>
    </div>
  )
}
