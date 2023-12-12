import React from 'react'

import { User, CaretDown } from 'phosphor-react'
import BreadcrumbTrail from 'components/common/breadcrumb-trail'

import './Header.scss'

function Header() {
  return (
    <div className='header-main'>
      <div className='container-fluid'>
        <div className='wrapper'>
          <div className='breadcrumb'>
            <BreadcrumbTrail />
          </div>
          <div className='profile-otr'>
            <div className='avatar'>
              <User size={24} />
            </div>
            <span className='user-name'>Wade Warren</span>
            <CaretDown size={24} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
