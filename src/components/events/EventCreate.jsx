/* eslint-disable prefer-destructuring */
import React, { useState } from 'react'
import Stepper from 'components/common/stepper/Stepper'
import { Form, Formik } from 'formik'
import {
  eventFirstStepValidation,
  eventInitialValues,
  eventSecondStepValidation,
} from 'constants/Events'
// import { createEvent } from 'containers/events/Api'
import { createEvent } from 'containers/events/Api'
import { toast } from 'react-toastify'
import CustomToast from 'components/common/custom-toast/CustomToast'
import { alertTypes } from 'constants/Common'
import { useNavigate } from 'react-router-dom'
import FirstStep from './formSteps/FirstStep'
import SecondStep from './formSteps/SecondStep'

function EventCreate() {
  const [currentStep, setCurrentStep] = useState(1)
  const navigate = useNavigate()
  const handleCreateEvent = async (values) => {
    const mapUrl = values.location.map_url
    let latitude = ''
    let longitude = ''
    const match = mapUrl.match(/q=([-+]?\d*\.?\d+),([-+]?\d*\.?\d+)/)

    if (match) {
      latitude = match[1]
      longitude = match[2]
    }
    const payload = {
      ...values,
      location: { ...values.location, latitude, longitude },
      gallery: values.gallery.map((item) => ({ imageUrl: '', vidUrl: item })),
    }
    const result = await createEvent(payload)
    if (result?.status === 200) {
      toast(
        <CustomToast
          variant={alertTypes.SUCCESS}
          message={result?.statusText || 'Event Created Successfully!'}
        />
      )
      navigate('/events')
    } else {
      toast(
        <CustomToast
          variant={alertTypes.DANGER}
          message={result?.response?.data?.error}
        />
      )
    }
  }
  return (
    <div className='event-main'>
      <div className='container-fluid'>
        <div className='heading-section pt-4 mb-4'>
          <p>Event Create</p>
          <div className='events-step'>
            <Stepper currentStep={currentStep} />
          </div>
        </div>
        <Formik
          initialValues={eventInitialValues}
          validationSchema={
            currentStep === 1
              ? eventFirstStepValidation
              : eventSecondStepValidation
          }
          onSubmit={(values, { setSubmitting }) => {
            if (currentStep === 1) {
              setCurrentStep(currentStep + 1)
            } else if (currentStep === 2) {
              handleCreateEvent(values)
            }
            setSubmitting(false)
          }}
        >
          <Form>
            {currentStep === 1 ? (
              <FirstStep />
            ) : (
              <SecondStep setCurrentStep={setCurrentStep} />
            )}
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default EventCreate
