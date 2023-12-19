import React from 'react'
import { removeAccessToken, removeUserInfoFromStorage } from 'utils/common'
import { useNavigate } from 'react-router-dom'
import { LOGIN_PATH } from 'constants/RoutePaths'
import PropTypes from 'prop-types'
import Sidebar from './sidebar/Sidebar'
import Header from './header/Header'

function Layout({ children }) {
  const navigate = useNavigate()
  const logoutHandler = () => {
    removeAccessToken()
    removeUserInfoFromStorage()
    navigate(LOGIN_PATH)
  }

  return (
    <div>
      <Sidebar logoutHandler={logoutHandler} />
      <main className='body-content has-sidebar'>
        <Header />
        {children}
      </main>
    </div>
  )
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
