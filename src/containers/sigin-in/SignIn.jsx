import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getAccessToken,
  setAccessToken,
  setUserInfoInStorage,
  useQuery,
} from 'utils/common'
import ForgotPasswordForm from 'components/sign-in/ForgotForm'
import SignInForm from 'components/sign-in/SignInForm'
import { toast } from 'react-toastify'
import CustomToast from 'components/common/custom-toast/CustomToast'
import { alertTypes } from 'constants/Common'
import { getAuthToken } from './Api'

function SignIn() {
  const query = useQuery()
  const navigate = useNavigate()
  const shouldResetPassword = query.get('reset')

  const loginFormSubmitHandler = async (values, setSubmitting) => {
    setSubmitting(true)
    try {
      const response = await getAuthToken(values)

      if (response.status === 200) {
        toast(
          <CustomToast
            variant={alertTypes.SUCCESS}
            message={response?.statusText || 'SignIn Successfully!'}
          />
        )

        setAccessToken(response.User.token)
        setUserInfoInStorage(response.User)
        setTimeout(() => {
          // navigate('/users')
          window.location.reload()
        }, 2000)
      }
    } catch (error) {
      toast(
        <CustomToast
          variant={alertTypes.DANGER}
          message={error?.response?.statusText}
        />
      )
      console.log(error)
    }
    setSubmitting(false)
  }
  useEffect(() => {
    if (getAccessToken()) {
      navigate('/users')
    }
  }, [])
  return (
    <div className='sigin-background'>
      {shouldResetPassword ? (
        <ForgotPasswordForm />
      ) : (
        <SignInForm loginFormSubmitHandler={loginFormSubmitHandler} />
      )}
    </div>
  )
}
export default SignIn
