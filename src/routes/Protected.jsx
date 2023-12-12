import Layout from 'components/layout/Layout'
import React from 'react'
import { Navigate } from 'react-router-dom'

function Protected({ isLoggedIn = true, children }) {
  if (!isLoggedIn) {
    return <Navigate to='/' replace />
  }

  return <Layout>{children}</Layout>
}

export default Protected
