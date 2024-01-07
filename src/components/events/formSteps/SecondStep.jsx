import React, { useState } from 'react'
import { useFormikContext } from 'formik'

import { PencilSimple, Trash } from 'phosphor-react'
import { agenda, speaker } from 'constants/Events'
import AgendaModal from './AgendaModal'
import SpeakerTable from './SpeakerTable'
import SpeakerModal from './SpeakerModal'

function SecondStep() {
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
                      Date
                    </p>
                  </div>
                </th>
                <th scope='col'>
                  <div className='header-text-otr'>
                    <p
                      className='table-name heading-xsb'
                      aria-label='User Company Column'
                    >
                      Time
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
              {formik.values.agendas?.map((item, index) => (
                <tr key={item.id}>
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
                      <p className='table-text-black' title={item.name}>
                        {item.description}
                      </p>
                    </div>
                  </td>

                  <td>
                    <div className='table-text-otr'>
                      <p className='table-text-black' title={item.name}>
                        {item.date}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className='table-text-otr'>
                      <p className='table-text-black' title={item.company}>
                        {item.date}
                      </p>
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
                            handleCloseAgendaModal()
                          }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={5}>
                  <div className='table-text-otr d-flex justify-content-center'>
                    <button
                      type='button'
                      className='primary-btn m'
                      onClick={handleOpenAgendaModal}
                    >
                      Add Agenda
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <SpeakerTable
          formik={formik}
          handleOpenSpeakerModal={handleOpenSpeakerModal}
          setSpeakerModalInitialValues={setSpeakerModalInitialValues}
          setCurrentIndex={setAgendaCurrentIndex}
          handleCloseSpeakerModal={handleCloseSpeakerModal}
        />
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
    </div>
  )
}
export default SecondStep
