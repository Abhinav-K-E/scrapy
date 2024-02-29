import React from 'react'
import './HomePage.scss'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='home'>
      <Link to='/dashboard/products' className="login-btn">
        Login to Continue
      </Link>
    </div>
  )
}

export default HomePage