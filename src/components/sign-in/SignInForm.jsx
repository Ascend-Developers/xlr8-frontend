import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import Logo from 'assets/images/Logo.png'
import PropTypes from 'prop-types'
import { SignInInitialValues, signInValidationSchema } from 'constants/SignIn'
import 'containers/sigin-in/SignIn.scss'

function SignInForm({ loginFormSubmitHandler }) {
  // Function to handle form submission
  const handleSubmit = async (values, { setErrors, setSubmitting }) => {
    loginFormSubmitHandler(values, setErrors, setSubmitting)
  }

  return (
    <div className='signin-container'>
      <img className='app-icon' src={Logo} alt='app logo' />
      <div className='signin-form'>
        <Formik
          initialValues={SignInInitialValues}
          validationSchema={signInValidationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className='input-group'>
              <FontAwesomeIcon icon={faEnvelope} className='icon' />
              <Field type='email' name='email' placeholder='Email' />
            </div>
            <ErrorMessage
              name='email'
              component='div'
              className='error-message'
            />

            <div className='input-group'>
              <FontAwesomeIcon icon={faLock} className='icon' />
              <Field type='password' name='password' placeholder='Password' />
            </div>
            <ErrorMessage
              name='password'
              component='div'
              className='error-message'
            />

            <div className='forgot-password'>
              <a href='/?reset=1'>Forgot Password?</a>
            </div>
            <button type='submit' className='login-button'>
              Login
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
SignInForm.propTypes = {
  loginFormSubmitHandler: PropTypes.func.isRequired,
}

export default SignInForm
