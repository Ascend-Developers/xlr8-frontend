/* eslint-disable react/jsx-props-no-spreading */
import Input from 'components/common/input/Input'
import { ErrorMessage, useFormikContext } from 'formik'
import { useDropzone } from 'react-dropzone'

import React, { useCallback } from 'react'
import CustomDatePicker from 'components/common/custom-datepicker/CustomDatepicker'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { CloudArrowUp } from 'phosphor-react'
import MapViewWrapper from 'components/common/map-view/MapView'
import { minioSingleFileUpload } from 'containers/events/Api'
import { toast } from 'react-toastify'
import CustomToast from 'components/common/custom-toast/CustomToast'
import { alertTypes } from 'constants/Common'

function FirstStep() {
  const navigate = useNavigate()
  const formik = useFormikContext()

  const handleFileUpload = async (file) => {
    const formData = new FormData()
    formData.append('file', file, 'file')
    formData.append('project', 'xler')

    const result = await minioSingleFileUpload(formData)
    if (result?.message) {
      if (result?.paths)
        formik.setFieldValue('photo', [...formik.values.photo, result.paths])

      toast(
        <CustomToast
          variant={alertTypes.SUCCESS}
          message={result?.message || 'Successfully!'}
        />
      )
    } else {
      toast(
        <CustomToast
          variant={alertTypes.DANGER}
          message={result?.response?.data?.error}
        />
      )
    }
  }

  const onDrop = useCallback(
    (files) => {
      if (files.length > 0) {
        const uploadedFiles = Array.from(files)
        uploadedFiles.forEach((file) => {
          handleFileUpload(file)
        })
      }
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
            <li key={file}>{file}</li>
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

      <div className='col-md-4'>
        <CustomDatePicker
          name='startDate'
          label='Date From'
          selected={
            formik.values.startDate
              ? new Date(moment(formik.values.startDate))
              : ''
          }
          onDateChange={(date) => formik.setFieldValue('startDate', date)}
        />
        <ErrorMessage className='error-text' component='p' name='startDate' />
      </div>
      <div className='col-md-4'>
        <CustomDatePicker
          name='endDate'
          label='Date To'
          selected={
            formik.values.endDate ? new Date(moment(formik.values.endDate)) : ''
          }
          onDateChange={(date) => formik.setFieldValue('endDate', date)}
        />
        <ErrorMessage className='error-text' component='p' name='endDate' />
      </div>
      <div className='col-md-4'>
        <Input
          name='location.address'
          handleChange={formik.handleChange}
          placeholder='Address'
          label='Address'
        />
        <ErrorMessage
          className='error-text'
          component='p'
          name='location.address'
        />
      </div>
      <div className='col-md-12'>
        <MapViewWrapper
          value={formik.values?.location?.map_url || ''}
          name='location.map_url'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label='Location'
          placeholder='Google Map'
          formik={formik}
        />
        <ErrorMessage
          className='error-text'
          component='p'
          name='location.map_url'
        />
      </div>

      <div className='col-md-12 d-flex justify-content-end gap-4 mt-5 mb-4'>
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
