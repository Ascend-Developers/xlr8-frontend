/* eslint-disable prefer-destructuring */
import axios from 'axios'
import { LOGIN_PATH } from 'constants/RoutePaths'
import {
  getAccessToken,
  removeAccessToken,
  removeUserInfoFromStorage,
} from 'utils/common'

const getIdFromUrl = () => {
  const urlPath = window.location.pathname
  const pathSegments = urlPath.split('/').filter((segment) => segment) // Remove empty segments

  if (pathSegments.length > 1 && pathSegments[0] === 'eventsattended') {
    return pathSegments[1]
  }

  return null
}

const navigateToLogin = (id) => {
  removeAccessToken()
  removeUserInfoFromStorage()
  if (id) {
    window.location.href = `/?eventsattended=${id}`
  } else window.location.href = LOGIN_PATH
}

const hookRequestInterceptorsWithAxiosInstance = (instance) =>
  instance.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
  )

const hookResponseInterceptorsWithAxiosInstance = (instance) =>
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const { response } = error
      if (response && response.status === 401) {
        const id = getIdFromUrl()
        navigateToLogin(id)
      }
      return Promise.reject(error)
    }
  )

function getAxios(tokenizeInstance, accessToken = null, fullPath = null) {
  const baseURL = fullPath ? '' : process.env.REACT_APP_API_URL

  const instance = axios.create({
    baseURL,
  })

  // Hooking a request interceptor
  hookRequestInterceptorsWithAxiosInstance(instance)

  // Hooking a response interceptor
  hookResponseInterceptorsWithAxiosInstance(instance)

  if (tokenizeInstance) {
    const bearer = accessToken || getAccessToken()

    if (bearer) {
      instance.defaults.headers.common.Authorization = `Bearer ${bearer}`
    }
  }

  return instance
}

export const get = (
  url,
  tokenizeInstance = false,
  accessToken = null,
  fullPath = null,
  config = {}
) =>
  getAxios(tokenizeInstance, accessToken, fullPath)
    .get(fullPath || url, config)
    .then((res) => res.data)

export const post = (url, data, tokenizeInstance = false, fullPath = null) =>
  getAxios(tokenizeInstance, null, fullPath)
    .post(fullPath || url, data)
    .then((res) => res.data)

export const deleteApi = (
  url,
  tokenizeInstance = false,
  accessToken = null,
  fullPath = null
) =>
  getAxios(tokenizeInstance, accessToken, fullPath)
    .delete(fullPath || url)
    .then((res) => res.data)

export const put = (url, data, tokenizeInstance = false, fullPath = null) =>
  getAxios(tokenizeInstance, null, fullPath)
    .put(fullPath || url, data)
    .then((res) => res.data)
