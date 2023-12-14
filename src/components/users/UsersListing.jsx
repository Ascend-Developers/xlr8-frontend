/* eslint-disable jsx-a11y/label-has-associated-control */
import TableWrapper from 'components/common/table-wrapper/TableWrapper'
import { fakeUsersData, initialMetaForTable } from 'constants/Common'
import React, { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
import { PencilSimple, Trash } from 'phosphor-react'
import { getActionButtonProps } from 'utils/common'
import CustomModal from 'components/common/modal/CustomModal'
import { ErrorMessage, Formik } from 'formik'
import {
  FIELDS,
  GENDERS,
  userInitialValues,
  userValidationSchema,
} from 'constants/Users'
import Input from 'components/common/input/Input'
import SelectComponent from 'components/common/select/SelectComponent'

let timeout
const DEBOUNCE_DELAY = 700
function UsersListing() {
  //   const navigate = useNavigate()
  const [usersList, setUsersList] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [meta, setMeta] = React.useState(initialMetaForTable)
  const [totalCount, setTotalCount] = React.useState(0)
  const [isUserModalVisible, setUserModalVisible] = React.useState(false)
  const [refresh, setRefresh] = React.useState(false)

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
    console.log('value is-----------', value)
    setMeta((pre) => ({ ...pre, search: value }))
    debounceFn(handleRefresh, DEBOUNCE_DELAY)
  }
  const handlePageChange = (value) => {
    setMeta((pre) => ({ ...pre, page: value }))
    handleRefresh()
  }
  const handleCloseModal = () => {
    setUserModalVisible(false)
  }
  const handleOpenModal = () => {
    setUserModalVisible(true)
  }
  useEffect(() => {
    setLoading(false)
    setUsersList(fakeUsersData)
    setTotalCount(100)
  }, [refresh])
  return (
    <div className='user-main'>
      <div className='container-fluid'>
        <TableWrapper
          setPerPage={handleSetPerPage}
          setSearchQuery={handleSetSearchQuery}
          searchValue={meta.search}
          totalListCount={totalCount}
          pageSize={meta.perPage}
          currentPage={meta.page}
          onPageChange={handlePageChange}
          actionButtons={[
            {
              label: 'Export',
              handleClick: () => {},
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
                      <div className='profile-otr' title={item.userName}>
                        <div className='named-avatar'>{item.userName}</div>
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
                        <p className='table-text-black' title={item.gender}>
                          {item.gender}
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
                        <p
                          className='table-text-black'
                          title={item.phoneNumber}
                        >
                          {item.phoneNumber}
                        </p>
                      </div>
                    </td>

                    <td className='action-column'>
                      <div className='table-icon-otr'>
                        <div
                          className='icon-otr'
                          onClick={(e) => {
                            console.log(e)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              console.log('Enter key or Spacebar pressed')
                            }
                          }}
                          role='button'
                          tabIndex={0}
                          aria-label='Edit User'
                        >
                          <PencilSimple size={18} />
                        </div>
                        <div
                          className='icon-otr'
                          onClick={(e) => {
                            console.log(e)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              console.log('Enter key or Spacebar pressed')
                            }
                          }}
                          role='button'
                          tabIndex={0}
                          aria-label='Delete User'
                        >
                          <Trash size={18} />
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
      {isUserModalVisible && (
        <CustomModal
          size='md'
          show
          onHide={handleCloseModal}
          heading='Create User'
        >
          <Formik
            initialValues={userInitialValues}
            validationSchema={userValidationSchema}
            onSubmit={(values) => {
              console.log('form values are', values)
            }}
          >
            {({ handleChange, values, handleSubmit, setFieldValue }) => (
              <form className='form-main' onSubmit={handleSubmit}>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='field-wrapper'>
                      <Input
                        name='name'
                        handleChange={handleChange}
                        placeholder='Full Name'
                        label='Full Name*'
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
                  <div className='col-md-6'>
                    <div className='field-wrapper'>
                      <Input
                        name='phone'
                        handleChange={handleChange}
                        placeholder='Phone'
                        label='Phone Number *'
                        value={values.phone}
                        type='number'
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
                        name='company'
                        handleChange={handleChange}
                        placeholder='Company'
                        label='Company (Optional)'
                        value={values.company}
                      />
                      <ErrorMessage
                        className='error-text'
                        component='p'
                        name='comapny'
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='field-wrapper mt-3'>
                      <label htmlFor='gender' className='input-label'>
                        Field *
                      </label>
                      <SelectComponent
                        name='field_id'
                        options={FIELDS}
                        selectedValue={values.field_id}
                        placeholder='Select'
                        handleChange={(obj) => {
                          setFieldValue('field_id', obj.value)
                        }}
                      />
                      <ErrorMessage
                        className='error-text'
                        component='p'
                        name='field_id'
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
