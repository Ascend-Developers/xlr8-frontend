/* eslint-disable prefer-destructuring */
import React, { useEffect, useState } from 'react'
import Stepper from 'components/common/stepper/Stepper'
import { Form, Formik } from 'formik'
import {
  eventFirstStepValidation,
  eventInitialValues,
  eventSecondStepValidation,
} from 'constants/Events'
// import { createEvent } from 'containers/events/Api'
import { createEvent, showEvent, updateEvent } from 'containers/events/Api'
import { toast } from 'react-toastify'
import CustomToast from 'components/common/custom-toast/CustomToast'
import { alertTypes } from 'constants/Common'
import { useNavigate, useParams } from 'react-router-dom'
import FirstStep from './formSteps/FirstStep'
import SecondStep from './formSteps/SecondStep'

function EventCreate() {
  const { id } = useParams()
  const [currentStep, setCurrentStep] = useState(1)
  const [initialValues, setInitialValues] = useState(eventInitialValues)
  const navigate = useNavigate()
  const handleCreateEvent = async (values) => {
    const mapUrl = values.location.map_url
    let latitude = ''
    let longitude = ''
    const match = mapUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/)

    if (match) {
      latitude = match[1]
      longitude = match[2]
    }
    const payload = {
      ...values,
      location: { ...values.location, latitude, longitude },
      gallery: values.gallery.map((item) => ({ imageUrl: item, vidUrl: '' })),
    }
    let result
    if (id) {
      result = await updateEvent(payload, id)
    } else result = await createEvent(payload)
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
  const fetchEvent = async () => {
    const result = await showEvent(id)
    if (result?.status === 200 && result?.Event) {
      const { Event } = result
      setInitialValues({
        ...Event,
        gallery: Event.gallery?.map((item) => item.vidUrl) || Event.gallery,
      })
    }
  }
  useEffect(() => {
    if (id) {
      fetchEvent()
    }
  }, [id])
  return (
    <div className='event-main'>
      <div className='container-fluid'>
        <div className='heading-section pt-4 mb-4'>
          <p>Event {id ? 'Edit' : 'Create'}</p>
          <div className='events-step'>
            <Stepper currentStep={currentStep} />
          </div>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={
            currentStep === 1
              ? eventFirstStepValidation
              : eventSecondStepValidation
          }
          enableReinitialize
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
              <SecondStep setCurrentStep={setCurrentStep} id={id} />
            )}
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default EventCreate
