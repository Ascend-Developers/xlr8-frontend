import React from 'react'
import Input from 'components/common/input/Input'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import PropTypes from 'prop-types'

import './CustomDatepicker.scss'
import { CaretLeft, CaretRight } from 'phosphor-react'

function CustomDatePicker({
  name = 'Date',
  label = 'Date',
  selected,
  minDate = null,
  onDateChange,
  ...rest
}) {
  const setDateHandler = (date) => {
    let formattedDate = ''
    if (date) {
      formattedDate = moment(date).format('MM/DD/YYYY')
    }
    onDateChange(formattedDate)
  }

  return (
    <DatePicker
      width='100%'
      selected={selected}
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
      onChange={setDateHandler}
      placeholderText='2022-02-01'
      customInput={
        <Input
          name={name}
          label={label !== null ? label : false}
          type='text'
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
        />
      }
    />
  )
}

CustomDatePicker.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  selected: PropTypes.instanceOf(Date), // Assuming `selected` is a Date object
  minDate: PropTypes.instanceOf(Date),
  onDateChange: PropTypes.func.isRequired,
}

CustomDatePicker.defaultProps = {
  name: 'Date',
  label: 'Date',
  selected: null,
  minDate: null,
}

export default CustomDatePicker
