import React from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import UsersPage from 'containers/users/UsersPage'
import SignIn from 'containers/sigin-in/SignIn'
import { RESET_PASSWORD_PATH } from 'constants/RoutePaths'
import ResetPassword from 'containers/reset-password/ResetPassword'
import PropTypes from 'prop-types'
import EventsPage from 'containers/events/Events'
import EventCreatePage from 'containers/events/Create'
import HomePage from '../containers/home/HomePage'
import Protected from './Protected'

function AppRoutes({ isLoggedIn }) {
  return (
    <Router>
      <Routes>
        {/* Guest Routes */}
        <Route path='/' element={<SignIn />} />
        <Route path={RESET_PASSWORD_PATH} element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route
          path='/home'
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <HomePage />
            </Protected>
          }
        />
        <Route
          path='/users'
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <UsersPage />
            </Protected>
          }
        />
        <Route
          path='/events'
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <EventsPage />
            </Protected>
          }
        />
        <Route
          path='/events/create'
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <EventCreatePage />
            </Protected>
          }
        />
      </Routes>
    </Router>
  )
}
AppRoutes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
}

export default AppRoutes
