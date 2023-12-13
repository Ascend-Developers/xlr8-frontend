import React from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import UsersPage from 'containers/users/UsersPage'
import HomePage from '../containers/home/HomePage'
import SignIn from '../containers/sigin-in/SiginIn'
import Protected from './Protected'

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Guest Routes */}
        <Route path='/' element={<SignIn />} />

        {/* Protected Routes */}
        <Route
          path='/home'
          element={
            <Protected isLoggedIn>
              <HomePage />
            </Protected>
          }
        />
        <Route
          path='/users'
          element={
            <Protected isLoggedIn>
              <UsersPage />
            </Protected>
          }
        />
      </Routes>
    </Router>
  )
}

export default AppRoutes
