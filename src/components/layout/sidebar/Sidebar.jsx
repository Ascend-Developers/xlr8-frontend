import React from 'react'

// import { ReactComponent as MiniLogo } from 'assets/images/Logo.svg'
import { NavLink } from 'react-router-dom'
import { House } from 'phosphor-react'
import { Accordion } from 'react-bootstrap'
import Logo from '../../../assets/images/Logo.png'

import './Sidebar.scss'

function Sidebar() {
  return (
    <div className='App sidebar-main'>
      <div className='logo-menu-otr'>
        <div className='logo-otr'>
          <p>
            {/* <MiniLogo /> */}
            <img src={Logo} alt='logo' width='100px' height='100%' />
          </p>
        </div>
      </div>
      <Accordion defaultActiveKey='4'>
        <NavLink to='/home'>
          <p className='menu-linkk'>
            <House size={24} className='menu-linkk-icon' />
            <span className='heading-smb'>Dashboard</span>
          </p>
        </NavLink>
        <NavLink to='/users'>
          <p className='menu-linkk'>
            <House size={24} className='menu-linkk-icon' />
            <span className='heading-smb'>Users</span>
          </p>
        </NavLink>
        <NavLink to='/event'>
          <p className='menu-linkk'>
            <House size={24} className='menu-linkk-icon' />
            <span className='heading-smb'>Events</span>
          </p>
        </NavLink>
      </Accordion>
      <NavLink to='/event'>
        <p className='menu-linkk-logout'>
          <House size={24} className='menu-linkk-icon' />
          <span className='heading-smb'>Logout</span>
        </p>
      </NavLink>
    </div>
  )
}

export default Sidebar
