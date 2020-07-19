import React from 'react'

import './styles.css'

import githubIcon from '../../assets/github-icon.png';

export default function Footer() {
  return (
    <div className="footer">

      <a href="https://github.com/lucasfdsilva/RESTaurant" target="_blank">GitHub</a>

      <img src={githubIcon}/>
      
    </div>
  )
}
