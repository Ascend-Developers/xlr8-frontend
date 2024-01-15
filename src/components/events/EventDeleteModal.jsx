import CustomModal from 'components/common/modal/CustomModal'
import { ReactComponent as AlertDangerImg } from 'assets/images/alert-danger.svg'
import PropTypes from 'prop-types'

import React from 'react'

function EventDelete({ handleCloseModal, handleDeleteUser }) {
  return (
    <CustomModal size='sm' show onHide={handleCloseModal} heading={` `}>
      <div className='event-delete-modal'>
        <AlertDangerImg />
        <p className='heading-h4 mt-4'>Are you sure?</p>
        <p className='mt-4 text-center'>
          Deleting this object is immediate and permanent. Are you sure you want
          to delete this?
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
            onClick={handleDeleteUser}
          >
            Delete Event
          </button>
        </div>
      </div>
    </CustomModal>
  )
}
EventDelete.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  handleDeleteUser: PropTypes.func.isRequired,
}

export default EventDelete
