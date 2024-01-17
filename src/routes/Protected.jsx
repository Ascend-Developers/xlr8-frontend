import Layout from 'components/layout/Layout'
import React from 'react'
import { Navigate, useParams, useMatch } from 'react-router-dom'
import PropTypes from 'prop-types'

function Protected({ isLoggedIn, children }) {
  const match = useMatch('/eventsattended/:QRToken')
  const { id } = useParams()

  if (!isLoggedIn) {
    if (match) {
      return <Navigate to={`/?eventsattended=${id}`} replace />
    }
    return <Navigate to='/' replace />
  }
  if (match) return children
  return <Layout>{children}</Layout>
}
Protected.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}
export default Protected
