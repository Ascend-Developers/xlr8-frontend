import React from 'react'
import Select from 'react-select'
import { isArray } from 'lodash'
import Check from 'components/common/check/Check'
import PropTypes from 'prop-types'
import './select.scss'

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#F3F3F3' : 'white',
    color: state.isSelected ? '#00598B' : '#636363',
    padding: '6px 28px',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '28px',
  }),
  control: () => ({
    display: 'flex',
    // none of react-select's styles are passed to <Control />
    width: '100%',
    background: 'rgba(15, 15, 15, 0.05)',
    // border: '1px solid #00598B',
    borderRadius: '8px',
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '7px 28px',

    // none of react-select's styles are passed to <Control />
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none',
  }),
  indicatorsContainer: (provided, state, isFocused) => ({
    ...provided,
    padding: '0px 28px',
    transform: isFocused ? '90deg' : '180deg',
    svg: {
      width: '24px',
      height: '24px',
    },
  }),
  menu: (provided) => ({
    ...provided,
    padding: '8px 0',
    background: '#FFFFFF',
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
    borderRadius: '16px',
    zIndex: 100,
  }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = 'opacity 300ms'

    return { ...provided, opacity, transition }
  },
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#00598B',
    color: '#ffffff',
    borderRadius: '5px',
    padding: '3px 6px',
  }),
  multiValueLabel: (provided) => ({ ...provided, color: '#ffffff' }),
  multiValueRemove: (provided) => ({ ...provided, background: 'transparent' }),
}

// eslint-disable-next-line react/prop-types
function CustomOptionComponent({ innerProps, innerRef, children }) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div ref={innerRef} {...innerProps}>
      {children}
    </div>
  )
}

CustomOptionComponent.propTypes = {
  // eslint-disable-next-line react/require-default-props, react/forbid-prop-types
  innerProps: PropTypes.object,
  label: PropTypes.node,
  isSelected: PropTypes.bool,
}
CustomOptionComponent.defaultProps = {
  label: '',
  isSelected: false,
}

function SelectComponent({
  options,
  selectedValue,
  handleChange,
  placeholder,
  ...rest
}) {
  let value
  if (isArray(selectedValue)) {
    value = selectedValue
  } else {
    value = options.find((item) => item.value === selectedValue) || ''
  }
  return (
    <div className='select'>
      <Select
        value={value}
        options={options}
        width='200px'
        styles={customStyles}
        onChange={handleChange}
        placeholder={placeholder}
        closeMenuOnSelect={!rest.isMulti}
        hideSelectedOptions={!rest.isMulti}
        components={
          rest.isMulti
            ? {
                // eslint-disable-next-line react/no-unstable-nested-components, react/prop-types, no-shadow
                Option: ({ children, ...rest }) => (
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  <CustomOptionComponent {...rest}>
                    <div className='px-4 py-2 d-flex align-items-center'>
                      <Check checked={rest.isSelected} name='check' />
                      {children}
                    </div>
                  </CustomOptionComponent>
                ),
              }
            : {}
        }
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
    </div>
  )
}

SelectComponent.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node,
      // eslint-disable-next-line react/forbid-prop-types
      value: PropTypes.any,
    })
  ).isRequired,
  selectedValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.number),
  ]),
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  // Add any additional PropTypes for the rest of the props if needed
  isMulti: PropTypes.bool,
}

SelectComponent.defaultProps = {
  selectedValue: '', // Provide a default value based on your use case
  placeholder: '',
  isMulti: false,
}

export default SelectComponent
