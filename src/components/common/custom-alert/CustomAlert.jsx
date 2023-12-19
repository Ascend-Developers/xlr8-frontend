import React from 'react'
import PropTypes from 'prop-types'
import { alertIcons, alertTypes } from 'constants/Common'
import { Alert } from 'react-bootstrap'
import './Alert.scss'

function CustomAlert({ variant = alertTypes.PRIMARY, closeAlert, children }) {
  return (
    <Alert variant={variant} onClose={closeAlert} dismissible>
      <div className='d-flex'>
        <div>{alertIcons[variant]}</div>
        <div className='px-3'>{children}</div>
      </div>
    </Alert>
  )
}

CustomAlert.propTypes = {
  variant: PropTypes.oneOf(Object.values(alertTypes)),
  closeAlert: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}
CustomAlert.defaultProps = {
  variant: alertTypes.PRIMARY,
}

export default CustomAlert
