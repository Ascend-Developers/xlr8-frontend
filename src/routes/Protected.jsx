import Layout from 'components/layout/Layout'
import React from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

function Protected({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to='/' replace />
  }

  return <Layout>{children}</Layout>
}
Protected.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}
export default Protected
