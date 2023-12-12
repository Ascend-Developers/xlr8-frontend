import React from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
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
      </Routes>
    </Router>
  )
}

export default AppRoutes
