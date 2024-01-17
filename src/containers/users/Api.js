import {
  USERS_CREATE_ENDPOINT,
  USERS_DELETE_ENDPOINT,
  USERS_ENDPOINT,
  USERS_SHOW_ENDPOINT,
  USERS_STATUS_ENDPOINT,
  USERS_UPLOAD_FILE_ENDPOINT,
} from 'constants/EndPoints'
import { get, post } from 'services/network'

export const getUsers = async (page, perPage, search) => {
  try {
    const response = await get(
      `${USERS_ENDPOINT}?perPage=${perPage}&page=${page}&search=${search}`,
      true
    )
    return response
  } catch (error) {
    console.error(error)
    return error
  }
}
export const showUser = async (id) => {
  try {
    const response = await get(`${USERS_SHOW_ENDPOINT}/${id}`, true)
    return response
  } catch (error) {
    console.error(error)
    return error
  }
}

export const createUser = async (values) => {
  try {
    const response = await post(USERS_CREATE_ENDPOINT, values, true)
    return response
  } catch (error) {
    console.error(error)
    return error
  }
}
export const UploadFile = async (value) => {
  try {
    const response = await post(USERS_UPLOAD_FILE_ENDPOINT, value, true)
    return response
  } catch (error) {
    console.error(error)
    return error
  }
}
export const userUpdate = async (values) => {
  const { _id } = values
  try {
    const response = await post(`${USERS_ENDPOINT}/update/${_id}`, values, true)
    return response
  } catch (error) {
    console.error(error)
    return error
  }
}

export const userStatusUpdate = async (values) => {
  try {
    const response = await post(USERS_STATUS_ENDPOINT, values, true)
    return response
  } catch (error) {
    console.error(error)
    return error
  }
}
export const deleteUser = async (id) => {
  try {
    const response = await post(`${USERS_DELETE_ENDPOINT}/${id}`, null, true)
    return response
  } catch (error) {
    console.error(error)
    return error
  }
}
