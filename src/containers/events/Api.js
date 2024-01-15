import {
  EVENTS_CREATE_ENDPOINT,
  EVENTS_DELETE_ENDPOINT,
  EVENTS_ENDPOINT,
  EVENTS_SHOW_ENDPOINT,
  EVENTS_UPDATE_ENDPOINT,
} from 'constants/EndPoints'
import { get, post } from 'services/network'

export const getEvents = async (page, perPage, search) => {
  try {
    const response = await get(
      `${EVENTS_ENDPOINT}?perPage=${perPage}&page=${page}&search=${search}`,
      true
    )
    return response
  } catch (error) {
    console.error(error)
    return error
  }
}

export const createEvent = async (values) => {
  try {
    const response = await post(EVENTS_CREATE_ENDPOINT, values, true)
    return response
  } catch (error) {
    console.error(error)
    return error
  }
}
export const updateEvent = async (values, id) => {
  try {
    const response = await post(`${EVENTS_UPDATE_ENDPOINT}/${id}`, values, true)
    return response
  } catch (error) {
    console.error(error)
    return error
  }
}
export const showEvent = async (id) => {
  try {
    const response = await get(`${EVENTS_SHOW_ENDPOINT}/${id}`, true)
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
export const deleteEvent = async (id) => {
  try {
    const response = await post(`${EVENTS_DELETE_ENDPOINT}/${id}`, null, true)
    return response
  } catch (error) {
    console.error(error)
    return error
  }
}
