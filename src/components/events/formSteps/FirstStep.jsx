/* eslint-disable react/jsx-props-no-spreading */
import Input from 'components/common/input/Input'
import { ErrorMessage, useFormikContext } from 'formik'
import { useDropzone } from 'react-dropzone'

import React, { useCallback } from 'react'
import CustomDatePicker from 'components/common/custom-datepicker/CustomDatepicker'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { CloudArrowUp } from 'phosphor-react'

function FirstStep() {
  const navigate = useNavigate()
  const formik = useFormikContext()

  const onDrop = useCallback(
    (files) => {
      formik.setFieldValue('photo', [...formik.values.photo, ...files])
    },
    [formik.values?.photo]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/svg+xml, image/png, image/jpeg, image/gif', // Specify accepted file types
    maxSize: 800 * 400,
  })
  const handleCancel = () => {
    navigate('/events')
  }
  return (
    <div className='row'>
      <div className='col-md-6'>
        <Input
          name='name'
          handleChange={formik.handleChange}
          placeholder='Event Name'
          label='Event Name'
        />
        <ErrorMessage className='error-text' component='p' name='name' />
      </div>
      <div className='col-md-1' />
      <div className='col-md-4'>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div className='image-upload'>
            <CloudArrowUp size={32} />
            <p>
              Click to upload or drag and drop <br />
              <span>SVG, PNG, JPG or GIF (max. 800x400px)</span>
            </p>
          </div>
        </div>
        <ErrorMessage className='error-text' component='p' name='photo' />
        <ul>
          {formik.values?.photo.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      </div>
      <div className='col-md-12'>
        <Input
          name='description'
          handleChange={formik.handleChange}
          placeholder='Event Description'
          label='Event Description'
        />
        <ErrorMessage className='error-text' component='p' name='description' />
      </div>
      <div className='col-md-12 mt-5'>
        <p className='heading-lg'>Location & Time</p>
      </div>

      <div className='col-md-2'>
        <CustomDatePicker
          name='date_time_from'
          label='Date From'
          selected={
            formik.values.date_time_from
              ? new Date(moment(formik.values.date_time_from))
              : ''
          }
          onDateChange={(date) => formik.setFieldValue('date_time_from', date)}
        />
        <ErrorMessage
          className='error-text'
          component='p'
          name='date_time_from'
        />
      </div>
      <div className='col-md-3'>
        <CustomDatePicker
          name='date_time_to'
          label='Date To'
          selected={
            formik.values.date_time_to
              ? new Date(moment(formik.values.date_time_to))
              : ''
          }
          onDateChange={(date) => formik.setFieldValue('date_time_to', date)}
        />
        <ErrorMessage
          className='error-text'
          component='p'
          name='date_time_to'
        />
      </div>
      <div className='col-md-6' />
      <div className='col-md-2'>
        <Input
          name='location'
          handleChange={formik.handleChange}
          placeholder='Location'
          label='Location'
        />
        <ErrorMessage className='error-text' component='p' name='location' />
      </div>
      <div className='col-md-5'>
        <Input
          name='map_url'
          handleChange={formik.handleChange}
          placeholder='URL'
          label='Google Map Pin Url'
        />
        <ErrorMessage className='error-text' component='p' name='map_url' />
      </div>

      <div className='col-md-12 d-flex justify-content-end gap-4 mt-2 mb-4'>
        <button
          type='button'
          className='secondary-btn record-btn'
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type='submit' className='primary-btn record-btn'>
          Next
        </button>
      </div>
    </div>
  )
}

export default FirstStep
