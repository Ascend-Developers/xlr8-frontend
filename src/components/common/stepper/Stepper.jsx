import React from 'react'
import PropTypes from 'prop-types'
import './Stepper.scss'

function Stepper({ currentStep }) {
  return (
    <div className='custom-stepper'>
      <div className={`stepper-button ${currentStep === 1 && 'active'}`}>
        <span>1</span>
      </div>
      <div className='stepper-horizontal-line'>
        <div
          className={`active-section width-${
            currentStep === 1 ? 'half' : 'full'
          }`}
        />
      </div>
      <div
        className={`stepper-button ${currentStep === 2 && 'active'}`}
        role='button'
        tabIndex={-1}
      >
        <span>2</span>
      </div>
    </div>
  )
}

Stepper.propTypes = {
  currentStep: PropTypes.number.isRequired,
}

export default Stepper
