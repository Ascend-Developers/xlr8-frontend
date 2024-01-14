import React from 'react'
import Input from 'components/common/input/Input'
import CustomModal from 'components/common/modal/CustomModal'
import {
  notificationInitialValues,
  notificationValidationSchema,
} from 'constants/Notifications'
import { ErrorMessage, Formik } from 'formik'
import PropTypes from 'prop-types'

function NotificationModal({
  handleCloseModal,
  selectedNotification,
  handleSaveNotification,
  handleUpdateNotification,
}) {
  return (
    <CustomModal
      size='md'
      show
      onHide={handleCloseModal}
      heading={`${selectedNotification ? 'Edit' : 'Create'} Notification`}
    >
      <Formik
        initialValues={selectedNotification || notificationInitialValues}
        validationSchema={notificationValidationSchema}
        onSubmit={(values) => {
          if (selectedNotification) {
            handleUpdateNotification(values)
          } else handleSaveNotification(values)
        }}
      >
        {({ handleChange, values, handleSubmit }) => (
          <form className='form-main' onSubmit={handleSubmit}>
            <div className='row'>
              <div className='col-md-12'>
                <div className='field-wrapper'>
                  <Input
                    name='title'
                    handleChange={handleChange}
                    placeholder='Title'
                    label='Title*'
                    value={values.title}
                  />
                  <ErrorMessage
                    className='error-text'
                    component='p'
                    name='title'
                  />
                </div>
              </div>

              <div className='col-md-12'>
                <div className='field-wrapper'>
                  <Input
                    name='body'
                    handleChange={handleChange}
                    placeholder='Body'
                    label='Body*'
                    value={values.body}
                    type='textarea'
                  />
                  <ErrorMessage
                    className='error-text'
                    component='p'
                    name='body'
                  />
                </div>
              </div>

              <div className='col-md-12 d-flex justify-content-end gap-4 mt-2'>
                <button
                  type='button'
                  className='secondary-btn record-btn'
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button type='submit' className='primary-btn record-btn'>
                  Save
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </CustomModal>
  )
}

NotificationModal.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  selectedNotification: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }),
  handleSaveNotification: PropTypes.func.isRequired,
  handleUpdateNotification: PropTypes.func.isRequired,
}
NotificationModal.defaultProps = {
  selectedNotification: null,
}

export default NotificationModal
