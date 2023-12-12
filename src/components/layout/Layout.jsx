import React from 'react'
import Header from './header/Header'
import Sidebar from './sidebar/Sidebar'

function Layout({ children }) {
  return (
    <div>
      <Sidebar />
      <main className='body-content has-sidebar'>
        <Header />
        {children}
      </main>
    </div>
  )
}

export default Layout
