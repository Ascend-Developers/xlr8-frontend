/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react'
import { ErrorMessage, useFormikContext } from 'formik'

import { CloudArrowDown, PencilSimple, Trash } from 'phosphor-react'
import { agenda, speaker } from 'constants/Events'
import { useDropzone } from 'react-dropzone'
import PropTypes from 'prop-types'
import { minioSingleFileUpload } from 'containers/events/Api'
import { toast } from 'react-toastify'
import CustomToast from 'components/common/custom-toast/CustomToast'
import { alertTypes } from 'constants/Common'
import moment from 'moment'
import SpeakerModal from './SpeakerModal'
import SpeakerTable from './SpeakerTable'
import AgendaModal from './AgendaModal'

function SecondStep({ setCurrentStep, id }) {
  const formik = useFormikContext()
  const [agendaModal, setAgendaModal] = useState(false)
  const [agendaModalInitialValues, setAgendaModalInitialValues] =
    useState(agenda)
  const [speakerModal, setSpeakerModal] = useState(false)
  const [agendaCurrentIndex, setAgendaCurrentIndex] = useState(undefined)
  const [speakerModalInitialValues, setSpeakerModalInitialValues] =
    useState(speaker)

  const handleOpenAgendaModal = () => {
    setAgendaModal(true)
  }

  const handleCloseAgendaModal = () => {
    setAgendaModal(false)
    setAgendaModalInitialValues(agenda)
    setAgendaCurrentIndex(undefined)
  }

  const handleOpenSpeakerModal = () => {
    setSpeakerModal(true)
  }
  const handleCloseSpeakerModal = () => {
    setSpeakerModal(false)
    setSpeakerModalInitialValues(speaker)
    setAgendaCurrentIndex(undefined)
  }
  const handlePrevious = () => {
    setCurrentStep(1)
  }
  const handleFileUpload = async (file) => {
    const formData = new FormData()
    formData.append('file', file, 'file')
    formData.append('project', 'xler')

    const result = await minioSingleFileUpload(formData)
    if (result?.message) {
      if (result?.paths)
        formik.setFieldValue('gallery', [
          ...formik.values.gallery,
          result.paths,
        ])

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
    [formik.values?.gallery, handleFileUpload]
  )
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'video/*, image/svg+xml, image/png, image/jpeg, image/gif',
  })
  return (
    <div className='row'>
      <div className='container-fluid'>
        <div className='table-otr'>
          <table className='table table-main'>
            <thead>
              <tr>
                <th scope='col'>
                  <div className='header-text-otr'>
                    <p
                      className='table-name heading-xsb'
                      aria-label='User index Column'
                    >
                      Title
                    </p>
                  </div>
                </th>
                <th scope='col'>
                  <div className='header-text-otr'>
                    <p
                      className='table-name heading-xsb'
                      aria-label='User Name Column'
                    >
                      Description
                    </p>
                  </div>
                </th>
                <th scope='col'>
                  <div className='header-text-otr'>
                    <p
                      className='table-name heading-xsb'
                      aria-label='User Name Column'
                    >
                      Start Date
                    </p>
                  </div>
                </th>
                <th scope='col'>
                  <div className='header-text-otr'>
                    <p
                      className='table-name heading-xsb'
                      aria-label='User Name Column'
                    >
                      End Date
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
              {formik.values.agenda?.map((item, index) => (
                <tr key={item._id}>
                  <th scope='col'>
                    <div className='header-text-otr'>
                      <p
                        className='table-name heading-xsb'
                        aria-label='User Table Data Column'
                      >
                        {item.title}
                      </p>
                    </div>
                  </th>
                  <td>
                    <div className='table-text-otr'>
                      <p className='table-text-black' title={item.description}>
                        {item.description}
                      </p>
                    </div>
                  </td>

                  <td>
                    <div className='table-text-otr'>
                      {item.startDate && (
                        <p className='table-text-black'>
                          {moment(item.startDate).format('MMMM D, YYYY h:mm a')}
                        </p>
                      )}
                    </div>
                  </td>

                  <td>
                    <div className='table-text-otr'>
                      {item.endDate && (
                        <p className='table-text-black'>
                          {moment(item.endDate).format('MMMM D, YYYY h:mm a')}
                        </p>
                      )}
                    </div>
                  </td>

                  <td className='action-column'>
                    <div className='table-icon-otr'>
                      <div
                        className='icon-otr'
                        role='button'
                        tabIndex={0}
                        aria-label='Edit User'
                      >
                        <PencilSimple
                          className='primary-color'
                          size={18}
                          onClick={() => {
                            setAgendaCurrentIndex(index)
                            setAgendaModalInitialValues(item)
                            handleOpenAgendaModal()
                          }}
                        />
                      </div>
                      <div
                        className='icon-otr'
                        role='button'
                        tabIndex={0}
                        aria-label='Delete User'
                      >
                        <Trash
                          className='danger-color'
                          size={18}
                          onClick={() => {
                            const updatedAgenda = [...formik.values.agenda]
                            updatedAgenda.splice(index, 1) // Remove the item at the specified index
                            formik.setFieldValue('agenda', updatedAgenda)
                          }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={5}>
                  <div className='table-text-otr d-flex flex-column align-items-center'>
                    <button
                      type='button'
                      className='primary-btn mt-4 mb-2'
                      onClick={handleOpenAgendaModal}
                    >
                      Add Agenda
                    </button>
                    <ErrorMessage
                      className='error-text'
                      component='p'
                      name='agenda'
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className='container-fluid'>
        <SpeakerTable
          formik={formik}
          handleOpenSpeakerModal={handleOpenSpeakerModal}
          setSpeakerModalInitialValues={setSpeakerModalInitialValues}
          setCurrentIndex={setAgendaCurrentIndex}
          handleCloseSpeakerModal={handleCloseSpeakerModal}
        />
      </div>
      <div className='col-md-12 mt-5'>
        <p className='heading-smb'>Gallery</p>
      </div>

      <div className='col-md-12'>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div className='image-upload-gallery'>
            <CloudArrowDown size={32} />
            <p>
              Click to upload or drag and drop <br />
              <span>SVG, PNG, JPG or GIF (max. 800x400px)</span>
            </p>
          </div>
        </div>
        <ErrorMessage className='error-text' component='p' name='gallery' />
        <ul>
          {formik.values?.gallery.map((file) => (
            <li key={file}>{file}</li>
          ))}
        </ul>
      </div>

      {agendaModal && (
        <AgendaModal
          handleCloseModal={handleCloseAgendaModal}
          formik={formik}
          index={agendaCurrentIndex}
          initialValues={agendaModalInitialValues}
        />
      )}
      {speakerModal && (
        <SpeakerModal
          handleCloseModal={handleCloseSpeakerModal}
          formik={formik}
          index={agendaCurrentIndex}
          initialValues={speakerModalInitialValues}
        />
      )}
      <div className='col-md-12 d-flex justify-content-end gap-4 mt-5 mb-4'>
        <button
          type='button'
          className='secondary-btn record-btn'
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button type='submit' className='primary-btn record-btn'>
          {id ? 'Update' : 'Create'}
        </button>
      </div>
    </div>
  )
}
SecondStep.propTypes = {
  setCurrentStep: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
}
export default SecondStep
