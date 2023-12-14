import React from 'react'
import PropTypes from 'prop-types'
import './Check.scss'

function Check({ label, handleChange, value, name, checked }) {
  return (
    <div className='form-check'>
      <input
        className='form-check-input'
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        type='checkbox'
        checked={checked || value}
      />
      <label className='form-check-label heading-sm' htmlFor={name}>
        {label}
      </label>
    </div>
  )
}

Check.propTypes = {
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
}
Check.defaultProps = {
  value: '', // Provide an appropriate default value based on your use case
  checked: false, // Provide a default value for checked if needed
}

export default Check
