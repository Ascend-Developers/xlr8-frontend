/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react'
import Input from 'components/common/input/Input'
import CustomModal from 'components/common/modal/CustomModal'
import { speakerSchema } from 'constants/Events'
import { Form, useFormik } from 'formik'
import PropTypes from 'prop-types'
import { useDropzone } from 'react-dropzone'
import { CloudArrowUp } from 'phosphor-react'
import { minioSingleFileUpload } from 'containers/events/Api'
import { toast } from 'react-toastify'
import CustomToast from 'components/common/custom-toast/CustomToast'
import { alertTypes } from 'constants/Common'

function SpeakerModal({ handleCloseModal, initialValues, formik, index }) {
  const speakerFormik = useFormik({
    initialValues,
    validationSchema: speakerSchema,
    onSubmit: (values, { setSubmitting }) => {
      if (index !== undefined) {
        const currentSpaker = formik.values.speakers.slice()
        currentSpaker[index] = values
        formik.setFieldValue('speakers', currentSpaker)
      } else {
        formik.setFieldValue('speakers', [...formik.values.speakers, values])
      }
      setSubmitting(false)
      handleCloseModal()
    },
  })
  const handleFileUpload = async (file) => {
    const formData = new FormData()
    formData.append('file', file, 'file')
    formData.append('project', 'xler')

    const result = await minioSingleFileUpload(formData)
    if (result?.message) {
      if (result?.paths) speakerFormik.setFieldValue('photo', [result.paths])

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
    [speakerFormik.values.photo]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/svg+xml, image/png, image/jpeg, image/gif', // Specify accepted file types
    maxSize: 800 * 400,
  })

  return (
    <CustomModal
      size='sm'
      show
      onHide={handleCloseModal}
      heading={`${index !== undefined ? 'Edit' : 'Add'} Speaker`}
    >
      <Form>
        <div className='row'>
          <div className='col-md-6'>
            <div className='field-wrapper'>
              <Input
                name='name'
                handleChange={speakerFormik.handleChange}
                placeholder='Speaker Name'
                label='Name*'
                value={speakerFormik.values.name}
              />
              <p className='error-text'>{speakerFormik?.errors?.name || ''}</p>
            </div>
          </div>

          <div className='col-md-6'>
            <div className='field-wrapper'>
              <Input
                name='designation'
                handleChange={speakerFormik.handleChange}
                placeholder='Designation'
                label='Designation*'
                value={speakerFormik.values.designation}
              />
              <p className='error-text'>
                {speakerFormik?.errors?.designation || ''}
              </p>
            </div>
          </div>

          <div className='col-md-6'>
            <span className='input-label d-inline-block mt-4'>Photo</span>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className='speaker-upload-image'>
                <CloudArrowUp size={32} />
                <p>Chose Photo</p>
              </div>
            </div>
            <p className='error-text'>{speakerFormik?.errors?.photo || ''}</p>
            <ul>
              {speakerFormik?.values?.photo?.map((file) => (
                <li key={file}>{file}</li>
              ))}
            </ul>
          </div>
          <div className='col-md-6'>
            <div className='field-wrapper'>
              <Input
                name='topic'
                handleChange={speakerFormik.handleChange}
                placeholder='Descirption'
                label='Topic*'
                value={speakerFormik.values.topic}
              />
              <p className='error-text'>{speakerFormik?.errors?.topic || ''}</p>
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
            <button
              type='button'
              className='primary-btn record-btn'
              onClick={speakerFormik.handleSubmit}
            >
              Add Speaker
            </button>
          </div>
        </div>
      </Form>
    </CustomModal>
  )
}

const speakerShape = PropTypes.shape({
  name: PropTypes.string,
  designation: PropTypes.instanceOf(Date),
  photo: PropTypes.Array,
  topic: PropTypes.string,
})
SpeakerModal.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  formik: PropTypes.shape({
    handleChange: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    values: PropTypes.object.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    errors: PropTypes.object,
    setFieldValue: PropTypes.func.isRequired,
    setFieldError: PropTypes.func.isRequired,
    validateForm: PropTypes.func.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  initialValues: speakerShape.isRequired,
}

export default SpeakerModal
