import CustomToast from 'components/common/custom-toast/CustomToast'
import ResetPasswordForm from 'components/sign-in/ResetPasswordForm'
import { alertTypes } from 'constants/Common'
import { resetUserPassword } from 'containers/sigin-in/Api'
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAccessToken } from 'utils/common'

function ResetPassword() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const resetPasswordToken = searchParams.get('token')
  useEffect(() => {
    if (getAccessToken()) {
      navigate('/users')
    }
  }, [])
  const passwordResetFormHandler = async (values, setErrors, setSubmitting) => {
    setSubmitting(true)
    const updatedValues = {
      ...values,
      token: resetPasswordToken || values.reset_password_token,
    }
    try {
      const result = await resetUserPassword(updatedValues, setErrors)
      setSubmitting(false)
      if (result?.status === 200) {
        toast(
          <CustomToast
            variant={alertTypes.SUCCESS}
            message={result?.statusText || 'Reset Successfully!'}
          />
        )
        navigate('/')
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
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <ResetPasswordForm
        resetPasswordFormSubmitHandler={passwordResetFormHandler}
      />
    </div>
  )
}

export default ResetPassword
