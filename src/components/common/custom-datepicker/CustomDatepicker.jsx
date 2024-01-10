/* eslint-disable react/jsx-props-no-spreading */
// CustomDatePicker.js

import React from 'react'
import Input from 'components/common/input/Input'
import DatePicker from 'react-datepicker'
import PropTypes from 'prop-types'
import { CaretLeft, CaretRight } from 'phosphor-react'
import 'react-datepicker/dist/react-datepicker.css'

import './CustomDatepicker.scss'

function CustomDatePicker({
  name = 'Date',
  label = 'Date',
  selected,
  minDate = null,
  onDateChange,
  dateFormat = 'MM/dd/yyyy',
  showTimeSelect = false,

  ...rest
}) {
  return (
    <DatePicker
      width='100%'
      selected={selected}
      showTimeSelect={showTimeSelect} // Add this prop
      timeFormat='HH:mm' // Specify your desired time format
      renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => (
        <div className='d-flex justify-content-between align-items-center'>
          <div
            role='button'
            tabIndex={0}
            aria-label='Previous Month'
            className='datepicker__navigation react-datepicker__navigation--previous'
            onClick={decreaseMonth}
            onKeyDown={(event) => {
              if (event.key === '' || event.key === ' ') {
                event.preventDefault()
              }
            }}
          >
            <CaretLeft size={18} />
          </div>
          <span className='react-datepicker__current-month'>
            {monthDate.toLocaleString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
          <div
            role='button'
            tabIndex={-1}
            aria-label='Next Month'
            className='datepicker__navigation react-datepicker__navigation--next'
            onClick={increaseMonth}
            onKeyDown={(event) => {
              if (event.key === '' || event.key === ' ') {
                event.preventDefault()
              }
            }}
          >
            <CaretRight size={18} />
          </div>
        </div>
      )}
      minDate={minDate}
      onChange={onDateChange}
      placeholderText='MM/DD/YYYY'
      dateFormat={dateFormat}
      customInput={
        <Input
          name={name}
          label={label !== null ? label : false}
          type='text'
          {...rest}
        />
      }
    />
  )
}

CustomDatePicker.propTypes = {
  name: PropTypes.string,
  showTimeSelect: PropTypes.bool,
  label: PropTypes.string,
  dateFormat: PropTypes.string,
  selected: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  onDateChange: PropTypes.func.isRequired,
}

CustomDatePicker.defaultProps = {
  name: 'Date',
  label: 'Date',
  selected: null,
  minDate: null,
  showTimeSelect: false,
  dateFormat: 'MM/dd/yyyy',
}

export default CustomDatePicker
