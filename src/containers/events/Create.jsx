import Input from 'components/common/input/Input'
import Stepper from 'components/common/stepper/Stepper'
import { eventInitialValues } from 'constants/Events'
import { ErrorMessage, Formik } from 'formik'
import React, { useState } from 'react'

function Create() {
  const [currentStep, setCurrentStep] = useState(1)
  return (
    <div className='user-main'>
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
        <Formik initialValues={eventInitialValues}>
          {({ handleChange, values, handleSubmit, setFieldValue }) => (
            <div className='row'>
              <div className='col-md-6'>
                <Input
                  name='name'
                  handleChange={handleChange}
                  placeholder='Event Name'
                  label='Event Name'
                />
                <ErrorMessage
                  className='error-text'
                  component='p'
                  name='name'
                />
              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Create
