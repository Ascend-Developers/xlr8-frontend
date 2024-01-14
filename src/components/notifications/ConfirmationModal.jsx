import CustomModal from 'components/common/modal/CustomModal'
import { ReactComponent as AlertDangerImg } from 'assets/images/alert-danger.svg'
import PropTypes from 'prop-types'

import React from 'react'

function ConfirmationModal({
  handleCloseModal,
  handleConfirmNotification,
  isDeleting,
  selectedNotification,
}) {
  return (
    <CustomModal size='sm' show onHide={handleCloseModal} heading={` `}>
      <div className='notification-confirmation-modal'>
        <AlertDangerImg />
        <p className='heading-h4 mt-4'>Are you sure?</p>
        <p className='mt-4 text-center'>
          {isDeleting ? (
            ' Deleting this object is immediate and permanent. Are you sure you want to delete this?'
          ) : (
            <p className='text-center'>
              To Trigger this notification for all users!
              <br />
              {selectedNotification.body}
            </p>
          )}
        </p>
        <div className='col-md-12 d-flex justify-content-center gap-4 mt-2'>
          <button
            type='button'
            className='secondary-btn record-btn'
            onClick={handleCloseModal}
          >
            Cancel
          </button>
          <button
            type='button'
            className='danger-btn record-btn'
            onClick={handleConfirmNotification}
          >
            Confirm
          </button>
        </div>
      </div>
    </CustomModal>
  )
}
ConfirmationModal.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  handleConfirmNotification: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  selectedNotification: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }),
}

ConfirmationModal.defaultProps = {
  selectedNotification: null,
}

export default ConfirmationModal
