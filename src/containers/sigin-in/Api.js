import { GRANT_TYPE } from 'constants/Common'
import {
  AUTH_ENDPOINT,
  FORGOT_PASSWORD_ENDPOINT,
  RESET_PASSWORD_ENDPOINT,
} from 'constants/EndPoints'
import { post } from 'services/network'

export const getAuthToken = ({ email, password }) => {
  const data = {
    device_type: 'web',
    grant_type: GRANT_TYPE,
    email,
    password,
  }

  return post(AUTH_ENDPOINT, data)
}

export const forgetUserPassword = async (values) => {
  try {
    const response = await post(FORGOT_PASSWORD_ENDPOINT, values, true)
    return response
  } catch (error) {
    // if (error?.response?.data) {
    //   setErrors(error?.response?.data.errors)
    // }
    console.log(error)
    console.error(error)
    return error
  }
}

export const resetUserPassword = async (values, setErrors) => {
  try {
    const response = await post(RESET_PASSWORD_ENDPOINT, values, true)
    console.log('Password has been reset successfully')
    return response
  } catch (error) {
    if (error?.response?.data) {
      setErrors(error?.response?.data.errors)
    }
    console.log(error)
    console.error(error)
    return error
  }
}
