/* eslint-disable no-underscore-dangle */
import React from 'react'
import { PencilSimple, Trash } from 'phosphor-react'

import PropTypes from 'prop-types'
import { isArray } from 'lodash'

function SpeakerTable({
  formik,
  handleOpenSpeakerModal,
  setSpeakerModalInitialValues,
  setCurrentIndex,
  handleCloseSpeakerModal,
}) {
  return (
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
                  Profile Picture
                </p>
              </div>
            </th>
            <th scope='col'>
              <div className='header-text-otr'>
                <p
                  className='table-name heading-xsb'
                  aria-label='User Name Column'
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
                  Designation
                </p>
              </div>
            </th>
            <th scope='col'>
              <div className='header-text-otr'>
                <p
                  className='table-name heading-xsb'
                  aria-label='User Company Column'
                >
                  Topic
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
          {formik.values.speakers?.map((item, index) => (
            <tr key={`${item._id}image`}>
              <th scope='col'>
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
                    <div className='profile-otr' title={item.name?.toString()}>
                      <div className='named-avatar'>{item?.name || '-'}</div>
                    </div>
                  )}
                </div>
              </th>
              <td>
                <div className='table-text-otr'>
                  <p className='table-text-black' title={item.name?.toString()}>
                    {item?.name || '-'}
                  </p>
                </div>
              </td>

              <td>
                <div className='table-text-otr'>
                  <p
                    className='table-text-black'
                    title={item.designation?.toString()}
                  >
                    {item?.designation || '-'}
                  </p>
                </div>
              </td>
              <td>
                <div className='table-text-otr'>
                  <p
                    className='table-text-black'
                    title={item.topic?.toString()}
                  >
                    {item?.topic || '-'}
                  </p>
                </div>
              </td>

              <td className='action-column'>
                <div className='table-icon-otr'>
                  <div
                    className='icon-otr'
                    role='button'
                    tabIndex={0}
                    aria-label='Edit Speaker'
                  >
                    <PencilSimple
                      className='primary-color'
                      size={18}
                      onClick={() => {
                        setCurrentIndex(index)
                        setSpeakerModalInitialValues(item)
                        handleOpenSpeakerModal()
                      }}
                    />
                  </div>
                  <div
                    className='icon-otr'
                    role='button'
                    tabIndex={0}
                    aria-label='Delete Speaker'
                  >
                    <Trash
                      className='danger-color'
                      size={18}
                      onClick={() => {
                        const updatedAgenda = [...formik.values.speakers]
                        updatedAgenda.splice(index, 1) // Remove the item at the specified index
                        formik.setFieldValue('speakers', updatedAgenda)
                        handleCloseSpeakerModal()
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
                  onClick={handleOpenSpeakerModal}
                >
                  Add Speaker
                </button>
                <p className='error-text'>
                  {!isArray(formik?.errors?.speakers) &&
                    formik?.errors?.speakers}
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

SpeakerTable.propTypes = {
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
  handleOpenSpeakerModal: PropTypes.func.isRequired,
  setSpeakerModalInitialValues: PropTypes.func.isRequired,
  setCurrentIndex: PropTypes.func.isRequired,
  handleCloseSpeakerModal: PropTypes.func.isRequired,
}
export default SpeakerTable
