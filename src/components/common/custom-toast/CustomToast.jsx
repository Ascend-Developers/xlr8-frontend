import React from 'react'
import CustomAlert from 'components/common/custom-alert/CustomAlert'
import PropTypes from 'prop-types'
import 'react-toastify/dist/ReactToastify.css'
import './Toast.scss'

function CustomToast({ closeToast, toastProps, variant, message }) {
  return (
    <CustomAlert
      variant={variant}
      toastProps={toastProps}
      closeAlert={closeToast}
    >
      {message}
    </CustomAlert>
  )
}
CustomToast.propTypes = {
  closeToast: PropTypes.func.isRequired,
  toastProps: PropTypes.shape({
    hideProgressBar: PropTypes.bool,
    closeButton: PropTypes.bool,
    position: PropTypes.string,
    autoClose: PropTypes.number,
    limit: PropTypes.number,
    closeOnClick: PropTypes.func,
  }),
  variant: PropTypes.string,
  message: PropTypes.node.isRequired,
}
CustomToast.defaultProps = {
  toastProps: {},
  variant: 'default',
}

export default CustomToast
