import CustomDatePicker from 'components/common/custom-datepicker/CustomDatepicker'
import Input from 'components/common/input/Input'
import CustomModal from 'components/common/modal/CustomModal'
import { agendaSchema } from 'constants/Events'
import { ErrorMessage, Form, Formik } from 'formik'
import moment from 'moment'
import PropTypes from 'prop-types'

import React from 'react'

function AgendaModal({ handleCloseModal, initialValues, formik, index }) {
  return (
    <CustomModal
      size='sm'
      show
      onHide={handleCloseModal}
      heading={`${index !== undefined ? 'Edit' : 'Add'} Agenda`}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={agendaSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (index !== undefined) {
            const currentAgendas = formik.values.agendas.slice()
            currentAgendas[index] = values
            formik.setFieldValue('agendas', currentAgendas)
          } else {
            formik.setFieldValue('agendas', [...formik.values.agendas, values])
          }
          setSubmitting(false)
          handleCloseModal()
        }}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form>
            <div className='row'>
              <div className='col-md-6'>
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

              <div className='col-md-6 pt-2'>
                <CustomDatePicker
                  name='date'
                  label='Date'
                  selected={values.date ? new Date(moment(values.date)) : ''}
                  onDateChange={(date) => setFieldValue('date', date)}
                />
                <ErrorMessage
                  className='error-text'
                  component='p'
                  name='date'
                />
              </div>
              <div className='col-md-12'>
                <div className='field-wrapper'>
                  <Input
                    name='description'
                    handleChange={handleChange}
                    placeholder='Descirption'
                    label='Descirption*'
                    value={values.description}
                    type='textarea'
                  />
                  <ErrorMessage
                    className='error-text'
                    component='p'
                    name='description'
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
                  Add User
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </CustomModal>
  )
}

const agendaShape = PropTypes.shape({
  title: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  description: PropTypes.string,
})
AgendaModal.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  formik: PropTypes.shape({
    handleChange: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    values: PropTypes.object.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    errors: PropTypes.object,
    setFieldValue: PropTypes.func.isRequired,
    setFieldError: PropTypes.func.isRequired,
    validateForm: PropTypes.func.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  initialValues: agendaShape.isRequired,
}

export default AgendaModal