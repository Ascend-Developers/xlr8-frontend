import React from 'react'
import InputMask from 'react-input-mask'

import './input.scss'
/* eslint-disable */

function Input({
  className,
  handleChange,
  type,
  name,
  value,
  placeholder,
  Icon,
  label,
  ...rest
}) {
  const saudiPhoneMask = '+966 99 999 9999'

  return (
    <div className={`${className || ''} input-otr`}>
      <label htmlFor='email' className='input-label'>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          onChange={handleChange}
          name={name}
          className='theme-input input w-100'
          value={value}
          placeholder={placeholder}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
        />
      ) : type === 'tel' ? (
        <InputMask
          mask={saudiPhoneMask}
          maskChar=''
          onChange={handleChange}
          name={name}
          className='theme-input input w-100'
          value={value}
          placeholder={placeholder}
          {...rest}
        />
      ) : (
        <>
          <input
            onChange={handleChange}
            name={name}
            className='theme-input input w-100'
            value={value}
            type={type}
            placeholder={placeholder}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
          />
          {Icon && <Icon className='search-icon ms-1 opacity-50' size={24} />}
        </>
      )}
    </div>
  )
}

export default Input
