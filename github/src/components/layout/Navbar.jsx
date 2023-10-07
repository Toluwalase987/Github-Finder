import React, { Component } from 'react'
import { VscGithubInverted } from "react-icons/vsc";
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'


export default function Navbar({title}) {
    return (
      <nav className='bg-primary'>
         <h1><VscGithubInverted/> {title}</h1>
         <div className='links'>
          <ul className='some'>
            <li><Link to="/" className='list'>Home</Link></li>
            <li><Link to="/about" className='list'>About</Link></li>
          </ul>
         </div>
      </nav>
    )
  }


Navbar.defaultProps = {
    title: 'Github Finder'
}
Navbar.propTypes = {
    title: PropTypes.string.isRequired
}
