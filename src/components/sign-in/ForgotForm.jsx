import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { forgotInitialValues, forgotPasswordSchema } from 'constants/SignIn'
import { forgetUserPassword } from 'containers/sigin-in/Api'
import Logo from 'assets/images/Logo.png'
import 'containers/sigin-in/SignIn.scss'
import { toast } from 'react-toastify'
import CustomToast from 'components/common/custom-toast/CustomToast'
import { alertTypes } from 'constants/Common'

function ForgotPasswordForm() {
  const submitHandler = async (values, setErrors, setSubmitting) => {
    setSubmitting(true)
    try {
      const result = await forgetUserPassword(values, setErrors)
      if (result?.status === 200) {
        setSubmitting(false)
        toast(
          <CustomToast
            variant={alertTypes.SUCCESS}
            message={result?.statusText || 'SignIn Successfully!'}
          />
        )
      } else {
        toast(
          <CustomToast
            variant={alertTypes.DANGER}
            message={result?.response?.data?.error}
          />
        )
      }
    } catch (e) {
      console.log('error is', e)
      toast(
        <CustomToast variant={alertTypes.DANGER} message={e?.data?.error} />
      )
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <div className='signin-container'>
      <img className='app-icon' src={Logo} alt='app logo' />
      <div className='signin-form'>
        <Formik
          initialValues={forgotInitialValues}
          validationSchema={forgotPasswordSchema}
          onSubmit={(values, { setErrors, setSubmitting }) => {
            submitHandler(values, setErrors, setSubmitting)
          }}
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

            <button type='submit' className='login-button'>
              Forgot Password
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default ForgotPasswordForm
