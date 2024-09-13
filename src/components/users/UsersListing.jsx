/* eslint-disable jsx-a11y/label-has-associated-control */
import TableWrapper from 'components/common/table-wrapper/TableWrapper'
import { alertTypes, initialMetaForTable } from 'constants/Common'
import React, { useCallback, useEffect, useRef, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import { PencilSimple, Trash } from 'phosphor-react'
import { getActionButtonProps } from 'utils/common'
import CustomModal from 'components/common/modal/CustomModal'
import { ErrorMessage, Formik } from 'formik'
import {
  USER_TYPE,
  FIELDS,
  GENDERS,
  USER_STATUS,
  userInitialValues,
  userValidationSchema,
} from 'constants/Users'
import Input from 'components/common/input/Input'
import SelectComponent from 'components/common/select/SelectComponent'
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

let timeout
const DEBOUNCE_DELAY = 700
function UsersListing() {
  //   const navigate = useNavigate()
  const [usersList, setUsersList] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [meta, setMeta] = React.useState(initialMetaForTable)
  const [isUserModalVisible, setUserModalVisible] = React.useState(false)
  const [refresh, setRefresh] = React.useState(false)
  const [selectedUser, setSelectedUser] = useState()
  const [isUserDeleteModalVisible, setDeleteUserModalVisible] = useState(false)
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
              <form className='form-main' onSubmit={handleSubmit}>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='field-wrapper'>
                      <Input
                        name='firstName'
                        handleChange={handleChange}
                        placeholder='First Name'
                        label='First Name*'
                        value={values.firstName}
                      />
                      <ErrorMessage
                        className='error-text'
                        component='p'
                        name='firstName'
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='field-wrapper'>
                      <Input
                        name='lastName'
                        handleChange={handleChange}
                        placeholder='Last Name'
                        label='Last Name*'
                        value={values.lastName}
                      />
                      <ErrorMessage
                        className='error-text'
                        component='p'
                        name='lastName'
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='field-wrapper'>
                      <Input
                        name='name'
                        handleChange={handleChange}
                        placeholder='Preferred name for name tag'
                        label='Preferred name for name tag*'
                        value={values.name}
                      />
                      <ErrorMessage
                        className='error-text'
                        component='p'
                        name='name'
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='field-wrapper'>
                      <Input
                        name='email'
                        handleChange={handleChange}
                        placeholder='Email'
                        label='Email *'
                        value={values.email}
                      />
                      <ErrorMessage
                        className='error-text'
                        component='p'
                        name='email'
                      />
                    </div>
                  </div>
                  {!selectedUser && (
                    <div className='col-md-6'>
                      <div className='field-wrapper'>
                        <Input
                          name='password'
                          handleChange={handleChange}
                          placeholder='Password'
                          label='Password *'
                          value={values?.password}
                          type='password'
                        />
                        <ErrorMessage
                          className='error-text'
                          component='p'
                          name='password'
                        />
                      </div>
                    </div>
                  )}
                  <div className='col-md-6'>
                    <div className='field-wrapper mt-3'>
                      <label htmlFor='gender' className='input-label'>
                        Gender *
                      </label>
                      <SelectComponent
                        name='gender'
                        options={GENDERS}
                        selectedValue={values.gender}
                        placeholder='Select'
                        handleChange={(obj) => {
                          setFieldValue('gender', obj.value)
                        }}
                      />
                      <ErrorMessage
                        className='error-text'
                        component='p'
                        name='gender'
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='field-wrapper'>
                      <Input
                        name='company'
                        handleChange={handleChange}
                        placeholder='Company'
                        label='Company (Optional)'
                        value={values.company}
                      />
                      <ErrorMessage
                        className='error-text'
                        component='p'
                        name='company'
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='field-wrapper'>
                      <Input
                        name='jobTitle'
                        handleChange={handleChange}
                        placeholder='Job Title'
                        label='Job Title *'
                        value={values.jobTitle}
                      />
                      <ErrorMessage
                        className='error-text'
                        component='p'
                        name='jobTitle'
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='field-wrapper'>
                      <Input
                        name='phone'
                        handleChange={handleChange}
                        placeholder='Phone'
                        label='Phone Number *'
                        value={values.phone}
                        type='tel'
                      />
                      <ErrorMessage
                        className='error-text'
                        component='p'
                        name='phone'
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='field-wrapper'>
                      <Input
                        name='workLocation'
                        handleChange={handleChange}
                        placeholder='Work Location'
                        label='Work Location *'
                        value={values.workLocation}
                      />
                      <ErrorMessage
                        className='error-text'
                        component='p'
                        name='workLocation'
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='field-wrapper'>
                      <Input
                        name='emergencyContactName'
                        handleChange={handleChange}
                        placeholder='Emergency Contact Name'
                        label='Emergency Contact Name *'
                        value={values.emergencyContactName}
                      />
                      <ErrorMessage
                        className='error-text'
                        component='p'
                        name='emergencyContactName'
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='field-wrapper'>
                      <Input
                        name='emergencyContactPhoneNumber'
                        handleChange={handleChange}
                        placeholder='Emergency Contact Phone Number'
                        label='Emergency Contact Phone Number *'
                        value={values.emergencyContactPhoneNumber}
                        type='tel'
                      />
                      <ErrorMessage
                        className='error-text'
                        component='p'
                        name='emergencyContactPhoneNumber'
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='field-wrapper'>
                      <Input
                        name='emergencyContactRelationship'
                        handleChange={handleChange}
                        placeholder='Emergency Contact Relationship'
                        label='Emergency Contact Relationship *'
                        value={values.emergencyContactRelationship}
                      />
                      <ErrorMessage
                        className='error-text'
                        component='p'
                        name='emergencyContactRelationship'
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='field-wrapper mt-3'>
                      <label htmlFor='gender' className='input-label'>
                        Field *
                      </label>
                      <SelectComponent
                        name='field'
                        options={FIELDS}
                        selectedValue={values.field}
                        placeholder='Select'
                        handleChange={(obj) => {
                          setFieldValue('field', obj.value)
                        }}
                      />
                      <ErrorMessage
                        className='error-text'
                        component='p'
                        name='field'
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='field-wrapper mt-3'>
                      <label htmlFor='type' className='input-label'>
                        User Type *
                      </label>
                      <SelectComponent
                        name='type'
                        options={USER_TYPE}
                        selectedValue={values.type}
                        placeholder='Select'
                        handleChange={(obj) => {
                          setFieldValue('type', obj.value)
                        }}
                      />
                      <ErrorMessage
                        className='error-text'
                        component='p'
                        name='type'
                      />
                    </div>
                  </div>
                  <div className='col-md-12 d-flex justify-content-end gap-4 mt-2'>
                    <button
                      type='button'
                      className='secondary-btn record-btn'
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </button>
                    <button type='submit' className='primary-btn record-btn'>
                      Add User
                    </button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </CustomModal>
      )}
    </div>
  )
}

export default UsersListing
