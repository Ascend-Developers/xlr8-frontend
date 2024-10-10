import React from 'react'
import Input from 'components/common/input/Input'
import CustomModal from 'components/common/modal/CustomModal'
import CustomDatePicker from 'components/common/custom-datepicker/CustomDatepicker'
import {
  notificationInitialValues,
  notificationValidationSchema,
} from 'constants/Notifications'
import { ErrorMessage, Formik, Form } from 'formik'
import PropTypes from 'prop-types'
// import moment from 'moment'

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
        enableReinitialize
        onSubmit={(values, { resetForm }) => {
          console.log(selectedNotification)
          console.log(values)
          if (selectedNotification) {
            handleUpdateNotification(values)
          } else handleSaveNotification(values)
          resetForm()
        }}
      >
        {({ handleChange, values, setFieldValue, errors }) => {
          console.log('errors are ', errors)
          return (
            <Form className='form-main'>
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

                <div className='col-md-12'>
                  <div className='field-wrapper'>
                    <CustomDatePicker
                      name='dateTime'
                      showTimeSelect
                      label='Date From'
                      selected={
                        values.dateTime ? new Date(values.dateTime) : ''
                      }
                      onDateChange={(date) => setFieldValue('dateTime', date)}
                      dateFormat='MM dd, yyyy hh:mm:ss a'
                    />

                    <ErrorMessage
                      className='error-text'
                      component='p'
                      name='dateTime'
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
            </Form>
          )
        }}
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
