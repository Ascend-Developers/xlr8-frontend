import React from 'react'

import { ReactComponent as MiniLogo } from 'assets/images/Logo.svg'
import { NavLink } from 'react-router-dom'
import { House } from 'phosphor-react'
import { Accordion } from 'react-bootstrap'

import './Sidebar.scss'

function Sidebar() {
  return (
    <div className='App sidebar-main'>
      <div className='logo-menu-otr'>
        <div className='logo-otr'>
          <p>
            <MiniLogo />
          </p>
        </div>
      </div>
      <Accordion defaultActiveKey='4'>
        <NavLink to='/home'>
          <p className='menu-linkk'>
            <House size={24} /> <span className='heading-smb'>Dashboard</span>
          </p>
        </NavLink>
      </Accordion>
    </div>
  )
}

export default Sidebar
