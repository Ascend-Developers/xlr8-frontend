/* eslint-disable jsx-a11y/label-has-associated-control */
import TableWrapper from 'components/common/table-wrapper/TableWrapper'
import { alertTypes, initialMetaForTable } from 'constants/Common'
import React, { useCallback, useEffect, useRef, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import { PencilSimple, Trash } from 'phosphor-react'
import { getActionButtonProps } from 'utils/common'
import CustomModal from 'components/common/modal/CustomModal'
import { Formik } from 'formik'
// import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { post } from 'services/network'
import Modal from 'react-bootstrap/Modal'
import {
  USER_STATUS,
  userInitialValues,
  userValidationSchema,
} from 'constants/Users'
import {
  UploadFile,
  createUser,
  deleteUser,
  getUsers,
  userStatusUpdate,
  userUpdate,
} from 'containers/users/Api'
import { Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import CustomToast from 'components/common/custom-toast/CustomToast'
import { useDropzone } from 'react-dropzone'
import UserDelete from './UserDelete'
import UserCreateModal from './UserCreateModal'

let timeout
const DEBOUNCE_DELAY = 700
function UsersListing() {
  //   const navigate = useNavigate()
  const [usersList, setUsersList] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [meta, setMeta] = React.useState(initialMetaForTable)
  const [isUserModalVisible, setUserModalVisible] = React.useState(false)
  const [refresh, setRefresh] = React.useState(false)
  const [postContent, setPostContent] = React.useState(false)
  const [selectedUser, setSelectedUser] = useState()
  const [isUserDeleteModalVisible, setDeleteUserModalVisible] = useState(false)
  const [isPostContentModalVisible, setIsPostContentModalVisible] =
    useState(false)
  const inputRef = useRef(null)

  const handleRefresh = () => {
    setRefresh((pre) => !pre)
  }
  const handleSetPerPage = (obj) => {
    setMeta((pre) => ({ ...pre, perPage: obj.value }))
    handleRefresh()
  }
  const debounceFn = (callback, delay) => {
    clearTimeout(timeout)
    timeout = setTimeout(callback, delay)
  }
  const handleSetSearchQuery = (value) => {
    setMeta((pre) => ({ ...pre, search: value }))
    debounceFn(handleRefresh, DEBOUNCE_DELAY)
  }
  const handlePageChange = (value) => {
    setMeta((pre) => ({ ...pre, page: value }))
    handleRefresh()
  }
  const handleCloseModal = () => {
    setUserModalVisible(false)
    setSelectedUser()
  }
  const handleOpenModal = () => {
    setUserModalVisible(true)
  }
  const fetchUsers = async () => {
    const result = await getUsers(meta.page, meta.perPage, meta.search)
    if (result?.LastPage && result?.Total) {
      const resultMeta = result
      setMeta((pre) => ({
        ...pre,
        totalCount: resultMeta.Total,
        totalPages: resultMeta.LastPage,
      }))
    }
    if (result?.data) {
      const { data } = result
      setUsersList(data)
    }
    setLoading(false)
  }
  const handleUpdateUserStatus = async (id, status) => {
    const result = await userStatusUpdate({ userId: id, status })
    if (result?.status === 200) {
      toast(
        <CustomToast
          variant={alertTypes.SUCCESS}
          message={result?.statusText || 'User Updated Successfully!'}
        />
      )
      handleRefresh()
    } else {
      toast(
        <CustomToast
          variant={alertTypes.DANGER}
          message={result?.response?.data?.error}
        />
      )
    }
  }
  const handleCreateUser = async (values) => {
    const result = await createUser({
      ...values,
      phone: String(values.phone),
      type: 'user',
    })
    if (result?.status === 200) {
      toast(
        <CustomToast
          variant={alertTypes.SUCCESS}
          message={result?.statusText || 'User Created Successfully!'}
        />
      )
      handleRefresh()
      handleCloseModal()
    } else {
      toast(
        <CustomToast
          variant={alertTypes.DANGER}
          message={result?.response?.data?.error}
        />
      )
    }
  }

  const handleUpdateUser = async (values) => {
    const result = await userUpdate(values)
    if (result?.status === 200) {
      toast(
        <CustomToast
          variant={alertTypes.SUCCESS}
          message={result?.statusText || 'User Deleted Successfully!'}
        />
      )
      handleCloseModal()
      handleRefresh()
    } else {
      toast(
        <CustomToast
          variant={alertTypes.DANGER}
          message={result?.response?.data?.error}
        />
      )
    }
  }
  const handleCloseUserDeleteModal = () => {
    setDeleteUserModalVisible(false)
    setSelectedUser()
  }
  const handleOpenDeleteUserModal = () => {
    setDeleteUserModalVisible(true)
  }
  const handleDeleteUser = async () => {
    // eslint-disable-next-line no-underscore-dangle
    const result = await deleteUser(selectedUser._id)
    if (result?.status === 200) {
      toast(
        <CustomToast
          variant={alertTypes.SUCCESS}
          message={result?.statusText || 'User Deleted Successfully!'}
        />
      )
      handleRefresh()
      handleCloseUserDeleteModal()
    } else {
      toast(
        <CustomToast
          variant={alertTypes.DANGER}
          message={result?.response?.data?.error}
        />
      )
    }
  }
  const handleImportUsers = () => {
    inputRef.current.click()
  }
  const handleFileUpload = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    const result = await UploadFile(formData)
    if (result?.status === 200) {
      handleRefresh()
      toast(
        <CustomToast
          variant={alertTypes.SUCCESS}
          message={result?.statusText || 'Users Created Successfully!'}
        />
      )
      handleRefresh()
      handleCloseUserDeleteModal()
    } else {
      toast(
        <CustomToast
          variant={alertTypes.DANGER}
          message={result?.response?.data?.error}
        />
      )
    }
  }
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the accepted files (e.g., send them to the server)
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      console.log('file is ', file)
      handleFileUpload(file)
    }
  }, [])
  const { getInputProps } = useDropzone({ onDrop })

  const postContentModal = (value) => {
    setIsPostContentModalVisible(value)
  }

  const submitPostContent = async () => {
    const data = {
      postContent,
    }
    try {
      const response = await post(
        `${process.env.REACT_APP_API_URL}user/postContent`,
        data,
        true
      )

      console.log(response)
      setIsPostContentModalVisible(false)
      toast(
        <CustomToast variant={alertTypes.SUCCESS} message={response.message} />
      )
      return response
    } catch (error) {
      console.error(error)
      toast(
        <CustomToast variant={alertTypes.DANGER} message='error creating!' />
      )
      return false
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [refresh])
  return (
    <div className='user-main'>
      <input
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...getInputProps()}
        ref={inputRef}
        style={{ display: 'none' }} // Hide the input element
      />
      <div className='container-fluid'>
        <TableWrapper
          setPerPage={handleSetPerPage}
          setSearchQuery={handleSetSearchQuery}
          searchValue={meta.search}
          totalListCount={meta.totalCount}
          pageSize={meta.perPage}
          currentPage={meta.page}
          onPageChange={handlePageChange}
          actionButtons={[
            {
              label: 'Post Content',
              handleClick: postContentModal,
              classes: 'secondary-btn record-btn',
            },
            {
              label: 'Import Users',
              handleClick: handleImportUsers,
              classes: 'secondary-btn record-btn',
            },
            ...getActionButtonProps('Add User', () => {
              handleOpenModal()
            }),
          ]}
        >
          {loading ? (
            <p style={{ textAlign: 'center' }}>Loading</p>
          ) : (
            <table className='table table-main'>
              <thead>
                <tr>
                  <th scope='col'>
                    <div className='header-text-otr'>
                      <p
                        className='table-name heading-xsb'
                        aria-label='User index Column'
                      >
                        #
                      </p>
                    </div>
                  </th>
                  <th scope='col'>
                    <div className='header-text-otr'>
                      <p
                        className='table-name heading-xsb'
                        aria-label='User Name Column'
                      >
                        User Name
                      </p>
                    </div>
                  </th>
                  <th scope='col'>
                    <div className='header-text-otr'>
                      <p
                        className='table-name heading-xsb'
                        aria-label='User Name Column'
                      >
                        Photo
                      </p>
                    </div>
                  </th>
                  <th scope='col'>
                    <div className='header-text-otr'>
                      <p
                        className='table-name heading-xsb'
                        aria-label='User Company Column'
                      >
                        Company
                      </p>
                    </div>
                  </th>
                  <th scope='col'>
                    <div className='header-text-otr'>
                      <p
                        className='table-name heading-xsb'
                        aria-label='User Gender Name Column'
                      >
                        Gender
                      </p>
                    </div>
                  </th>
                  <th scope='col'>
                    <div className='header-text-otr'>
                      <p
                        className='table-name heading-xsb'
                        aria-label='User Email Name Column'
                      >
                        Email
                      </p>
                    </div>
                  </th>
                  <th scope='col'>
                    <div className='header-text-otr'>
                      <p
                        className='table-name heading-xsb'
                        aria-label='User Phone Name Column'
                      >
                        Phone Number
                      </p>
                    </div>
                  </th>
                  <th scope='col'>
                    <div className='header-text-otr'>
                      <p
                        className='table-name heading-xsb'
                        aria-label='User Phone Name Column'
                      >
                        Status
                      </p>
                    </div>
                  </th>
                  <th scope='col' className='action-column'>
                    <div className='header-text-otr'>
                      <p
                        className='table-name heading-xsb'
                        aria-label='User Action Name Column'
                      >
                        Actions
                      </p>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {usersList?.map((item, index) => (
                  <tr key={item.id}>
                    <th scope='col'>
                      <div className='header-text-otr'>
                        <p
                          className='table-name heading-xsb'
                          aria-label='User Table Data Column'
                        >
                          {index + 1}
                        </p>
                      </div>
                    </th>
                    <td>
                      <div className='table-text-otr'>
                        <p className='table-text-black' title={item.name}>
                          {item.name}
                        </p>
                      </div>
                    </td>
                    {/* <td>
                      <div className='profile-otr' title={item.userName}>
                        <div className='named-avatar'>{item.userName}</div>
                      </div>
                    </td> */}
                    <td>
                      <div className='table-text-otr'>
                        {item?.image ? (
                          <img
                            className='table-picture'
                            src={item.image}
                            alt='user-profile'
                            width='40px'
                            height='40px'
                          />
                        ) : (
                          <div className='profile-otr' title={item.userName}>
                            <div className='named-avatar'>{item.userName}</div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className='table-text-otr'>
                        <p className='table-text-black' title={item.company}>
                          {item.company}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className='table-text-otr'>
                        <p
                          className='table-text-black'
                          title={item.gender?.toUpperCase()}
                        >
                          {item.gender?.toUpperCase()}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className='table-text-otr'>
                        <p className='table-text-black' title={item.email}>
                          {item.email}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className='table-text-otr'>
                        <p className='table-text-black' title={item.phone}>
                          {item.phone}
                        </p>
                      </div>
                    </td>

                    <td>
                      <div className='table-text-otr'>
                        <Form.Select
                          size='sm'
                          value={item.status}
                          onChange={(e) => {
                            // eslint-disable-next-line no-underscore-dangle
                            handleUpdateUserStatus(item._id, e.target.value)
                          }}
                        >
                          {USER_STATUS.map((statusItem) => (
                            <option value={statusItem.value}>
                              {statusItem.label}
                            </option>
                          ))}
                        </Form.Select>
                      </div>
                    </td>

                    <td className='action-column'>
                      <div className='table-icon-otr'>
                        <div
                          className='icon-otr'
                          // onClick={(e) => {
                          //   console.log(e)
                          // }}
                          // onKeyDown={(e) => {
                          //   if (e.key === 'Enter' || e.key === ' ') {
                          //     console.log('Enter key or Spacebar pressed')
                          //   }
                          // }}
                          role='button'
                          tabIndex={0}
                          aria-label='Edit User'
                        >
                          <PencilSimple
                            className='primary-color'
                            size={18}
                            onClick={() => {
                              setSelectedUser(item)
                              handleOpenModal()
                            }}
                          />
                        </div>
                        <div
                          className='icon-otr'
                          // onClick={(e) => {
                          //   console.log(e)
                          // }}
                          // onKeyDown={(e) => {
                          //   if (e.key === 'Enter' || e.key === ' ') {
                          //     console.log('Enter key or Spacebar pressed')
                          //   }
                          // }}
                          role='button'
                          tabIndex={0}
                          aria-label='Delete User'
                        >
                          <Trash
                            className='danger-color'
                            size={18}
                            onClick={() => {
                              setSelectedUser(item)
                              handleOpenDeleteUserModal()
                            }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </TableWrapper>
      </div>
      {isUserDeleteModalVisible && (
        <UserDelete
          handleDeleteUser={handleDeleteUser}
          handleCloseModal={handleCloseUserDeleteModal}
        />
      )}

      {/* {isPostContentModalVisible && ( */}
      <Modal
        size='sm'
        show={isPostContentModalVisible}
        onHide={() => setIsPostContentModalVisible(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Post Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {' '}
          <Form.Control
            type='text'
            placeholder='Post Content'
            onInput={(e) => setPostContent(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className='border-0'
            // variant='secondary'
            style={{ backgroundColor: '#9B4A2E' }}
            onClick={() => submitPostContent()}
          >
            Submit
          </Button>
          {/* <Button variant='primary' onClick={handleClose}>
              Save Changes
            </Button> */}
        </Modal.Footer>
      </Modal>
      {/* )} */}

      {isUserModalVisible && (
        <CustomModal
          size='md'
          show
          onHide={handleCloseModal}
          heading={`${selectedUser ? 'Edit' : 'Create'} User`}
        >
          <Formik
            initialValues={selectedUser || userInitialValues}
            validationSchema={userValidationSchema}
            onSubmit={(values) => {
              if (selectedUser) {
                handleUpdateUser(values)
              } else handleCreateUser(values)
            }}
          >
            {({ handleChange, values, handleSubmit, setFieldValue }) => (
              <UserCreateModal
                handleCloseModal={handleCloseModal}
                selectedUser={selectedUser}
                handleChange={handleChange}
                values={values}
                handleSubmit={handleSubmit}
                setFieldValue={setFieldValue}
              />
            )}
          </Formik>
        </CustomModal>
      )}
    </div>
  )
}

export default UsersListing
