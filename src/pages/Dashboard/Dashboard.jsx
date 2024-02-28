import React from 'react'
import './Dashboard.scss'
import { Outlet } from 'react-router-dom'
import LeftNav from '../../components/LeftNav/LeftNav'

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="left-flex">
        <LeftNav/>
      </div>
      <div className="right-flex">
        <Outlet/>
      </div>
    </div>
  )
}

export default Dashboard