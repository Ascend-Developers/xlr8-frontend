import React from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import HomePage from '../containers/home/HomePage'

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Guest Routes */}
        <Route path='/' element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
