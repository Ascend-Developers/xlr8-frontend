import React, { useState } from 'react'
import Stepper from 'components/common/stepper/Stepper'
import { Form, Formik } from 'formik'
import {
  eventFirstStepValidation,
  eventInitialValues,
  eventSecondStepValidation,
} from 'constants/Events'
import SecondStep from './formSteps/SecondStep'
import FirstStep from './formSteps/FirstStep'

function EventCreate() {
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <div className='event-main'>
      <div className='container-fluid'>
        <div className='heading-section'>
          <p>test</p>
          <div className='events-step'>
            <Stepper
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
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
            // Handle submission logic here based on the current step
            if (currentStep === 1) {
              // Additional logic for the first step
              console.log('Submitting first step:', values)
            } else {
              // Additional logic for the second step
              console.log('Submitting second step:', values)
            }

            // Example: Move to the next step
            setCurrentStep(currentStep + 1)

            // Reset submitting state
            setSubmitting(false)
          }}
        >
          <Form>{currentStep === 1 ? <FirstStep /> : <SecondStep />}</Form>
        </Formik>
      </div>
    </div>
  )
}

export default EventCreate
