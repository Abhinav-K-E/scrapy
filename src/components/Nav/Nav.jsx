import React from 'react'
import './Nav.scss'

import LOGO from '../../assets/images/logo.svg'

const Nav = () => {
  return (
    <nav className='nav'>
        <div className="logo">
            <img src={LOGO} alt="" />
        </div>
        <div className="login-btn">
            Login
        </div>
    </nav>
  )
}

export default Nav