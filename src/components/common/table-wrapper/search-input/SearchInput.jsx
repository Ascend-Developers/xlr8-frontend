import React from 'react'
import { MagnifyingGlass } from 'phosphor-react'
import Input from 'components/common/input/Input'
import PropTypes from 'prop-types'

function SearchInput({ handleChange, value, placeholder }) {
  return (
    <div className='search-input-otr'>
      <div className='search-otr-wrapper'>
        <Input
          Icon={MagnifyingGlass}
          type='search'
          name='search'
          value={value}
          onChange={(e) => {
            e.preventDefault()
            const targetValue = e.target.value || ''
            console.log('value is ', targetValue)
            handleChange(targetValue)
          }}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}

SearchInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
}

SearchInput.defaultProps = {
  placeholder: '', // Provide a default value for the placeholder
}

export default SearchInput
