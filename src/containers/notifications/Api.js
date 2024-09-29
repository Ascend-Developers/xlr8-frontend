import {
  NOTIFICATIONS_ENDPOINT,
  NOTIFICATIONS_CREATE_ENDPOINT,
  NOTIFICATIONS_UPDATE_ENDPOINT,
  NOTIFICATIONS_SHOW_ENDPOINT,
  NOTIFICATIONS_DELETE_ENDPOINT,
} from 'constants/EndPoints'
import { get, post } from 'services/network'

export const getNotifications = async (page, perPage, search) => {
  try {
    const response = await get(
      `${NOTIFICATIONS_ENDPOINT}?perPage=${perPage}&page=${page}&search=${search}`,
      true
    )
    return response
  } catch (error) {
    console.error(error)
    return error
  }
}

export const createNotification = async (values) => {
  try {
    const response = await post(NOTIFICATIONS_CREATE_ENDPOINT, values, true)
    return response
  } catch (error) {
    console.error(error)
    return error
  }
}
export const updateNotification = async (values, id) => {
  try {
    const response = await post(
      `${NOTIFICATIONS_UPDATE_ENDPOINT}/${id}`,
      values,
      true
    )
    return response
  } catch (error) {
    console.error(error)
    return error
  }
}
export const showNotification = async (id) => {
  try {
    const response = await get(`${NOTIFICATIONS_SHOW_ENDPOINT}/${id}`, true)
    return response
  } catch (error) {
    console.error(error)
    return error
  }
}

export const minioSingleFileUpload = async (file) => {
  try {
    const response = await post(
      '',
      file,
      false,
      'https://micro-helper.ascend.com.sa/minio/upload'
    )
    return response
  } catch (error) {
    console.error(error)
    return error
  }
}
export const deleteNotification = async (id) => {
  try {
    const response = await post(
      `${NOTIFICATIONS_DELETE_ENDPOINT}/${id}`,
      null,
      true
    )
    return response
  } catch (error) {
    console.error(error)
    return error
  }
}
