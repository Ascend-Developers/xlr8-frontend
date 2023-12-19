import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import {
  resetPasswordInitialValues,
  resetPasswordSchema,
} from 'constants/SignIn'
import 'containers/sigin-in/SignIn.scss'

function ResetPasswordForm({ resetPasswordFormSubmitHandler }) {
  // Function to handle form submission
  const handleSubmit = async (values, { setErrors, setSubmitting }) => {
    resetPasswordFormSubmitHandler(values, setErrors, setSubmitting)
  }

  return (
    <div className='signin-container'>
      <div className='signin-form'>
        <h2>Reset Password</h2>
        <Formik
          initialValues={resetPasswordInitialValues}
          validationSchema={resetPasswordSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className='input-group'>
              <FontAwesomeIcon icon={faLock} className='icon' />
              <Field
                type='password'
                name='newPassword'
                placeholder='Password'
              />
            </div>
            <ErrorMessage
              name='newPassword'
              component='p'
              className='error-message'
            />
            <div className='input-group'>
              <FontAwesomeIcon icon={faLock} className='icon' />
              <Field
                type='password'
                name='confirmPassword'
                placeholder='Confirm Password'
              />
            </div>
            <ErrorMessage
              name='confirmPassword'
              component='p'
              className='error-message'
            />

            <button type='submit' className='login-button'>
              Reset
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
ResetPasswordForm.propTypes = {
  resetPasswordFormSubmitHandler: PropTypes.func.isRequired,
}

export default ResetPasswordForm
