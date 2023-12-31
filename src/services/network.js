/* eslint-disable prefer-destructuring */
import axios from 'axios'
import { LOGIN_PATH } from 'constants/RoutePaths'
import {
  getAccessToken,
  removeAccessToken,
  removeUserInfoFromStorage,
} from 'utils/common'

const navigateToLogin = () => {
  removeAccessToken()
  removeUserInfoFromStorage()
  window.location.href = LOGIN_PATH
}

const hookRequestInterceptorsWithAxiosInstance = (instance) =>
  instance.interceptors.request.use(
    // Any status code that lie within the range of 2xx cause this function to trigger
    (config) => config
  )

const hookResponseInterceptorsWithAxiosInstance = (instance) =>
  instance.interceptors.response.use(
    // Any status code that lie within the range of 2xx cause this function to trigger
    (response) => response,
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    (error) => {
      const { response } = error
      if (response && response.status === 401) {
        // Handle 401 unauthorized error, e.g., redirect to login route
        navigateToLogin()
      }
      return Promise.reject(error)
    }
  )

function getAxios(tokenizeInstance, accessToken = null) {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  // Hooking a request interceptor
  hookRequestInterceptorsWithAxiosInstance(instance)

  // Hooking a response interceptor
  hookResponseInterceptorsWithAxiosInstance(instance)

  if (tokenizeInstance) {
    const bearer = accessToken || getAccessToken()

    if (bearer)
      instance.defaults.headers.common.Authorization = `Bearer ${bearer}`
  }

  return instance
}

export const get = (
  url,
  tokenizeInstance = false,

  accessToken = null
) =>
  getAxios(tokenizeInstance, accessToken)
    .get(url)
    .then((res) => res.data)

export const post = (url, data, tokenizeInstance = false) =>
  getAxios(tokenizeInstance)
    .post(url, data)
    .then((res) => res.data)

export const deleteApi = (
  url,
  tokenizeInstance = false,

  accessToken = null
) =>
  getAxios(tokenizeInstance, accessToken)
    .delete(url)
    .then((res) => res.data)

export const put = (url, data, tokenizeInstance = false) =>
  getAxios(tokenizeInstance)
    .put(url, data)
    .then((res) => res.data)
