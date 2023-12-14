import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { X } from 'phosphor-react'
import PropTypes from 'prop-types'

import './CustomModal.scss'

// Default Modal is in lg size
function CustomModal({
  size = 'lg',
  show,
  onHide,
  heading,
  children,
  bsModalProps,
}) {
  return (
    <Modal
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...bsModalProps}
      show={show}
      onHide={onHide}
      size={size}
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <h5 className='modal-heading heading-smb'>{heading}</h5>
        <Button onClick={onHide} className='close-icon-otr'>
          <X size={24} />
        </Button>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  )
}

CustomModal.propTypes = {
  size: PropTypes.oneOf(['lg', 'sm']), // Specify allowed sizes
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  bsModalProps: PropTypes.object, // Additional props for react-bootstrap Modal
}
CustomModal.defaultProps = {
  size: 'lg', // Provide a default value for the size prop
  bsModalProps: {},
}
export default CustomModal
