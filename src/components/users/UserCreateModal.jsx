import React from 'react'
import { USER_TYPE } from 'constants/Users'
import Input from 'components/common/input/Input'
import SelectComponent from 'components/common/select/SelectComponent'
import { ErrorMessage } from 'formik'
import PropTypes from 'prop-types'

function UserCreateModal({
  handleCloseModal,
  //   selectedUser,
  handleChange,
  values,
  handleSubmit,
  setFieldValue,
}) {
  return (
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
            <ErrorMessage className='error-text' component='p' name='name' />
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
            <ErrorMessage className='error-text' component='p' name='email' />
          </div>
        </div>
        <div className='col-md-6'>
          <div className='field-wrapper'>
            <Input
              name='password'
              handleChange={handleChange}
              placeholder='Password'
              label='Password *'
              type='password'
            />
            <ErrorMessage
              className='error-text'
              component='p'
              name='password'
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
            <ErrorMessage className='error-text' component='p' name='company' />
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
            />
            <ErrorMessage className='error-text' component='p' name='phone' />
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
          <div className='field-wrapper'>
            <Input
              name='managerName'
              handleChange={handleChange}
              placeholder='Your Manager Name'
              label='Your Manager Name *'
              value={values.managerName}
            />
            <ErrorMessage
              className='error-text'
              component='p'
              name='managerName'
            />
          </div>
        </div>
        <div className='col-md-6'>
          <div className='field-wrapper'>
            <Input
              name='managerPhoneNumber'
              handleChange={handleChange}
              placeholder='Your Manager Phone Number'
              label='Your Manager Phone Number *'
              value={values.managerPhoneNumber}
            />
            <ErrorMessage
              className='error-text'
              component='p'
              name='managerPhoneNumber'
            />
          </div>
        </div>
        <div className='col-md-6'>
          <div className='field-wrapper mt-3'>
            <p
              htmlFor='Type'
              style={{ fontWeight: '700', color: '#0a0a0a' }}
              className='input-label'
            >
              Type *
            </p>
            <SelectComponent
              name='type'
              options={USER_TYPE}
              selectedValue={values.type}
              placeholder='Select'
              handleChange={(obj) => {
                setFieldValue('type', obj.value)
              }}
            />
            <ErrorMessage className='error-text' component='p' name='type' />
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
  )
}

UserCreateModal.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  //  selectedUser: PropTypes.objectOf.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.arrayOf.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
}

export default UserCreateModal
