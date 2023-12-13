import React from 'react'
import PropTypes from 'prop-types'
import Pagination from './Pagination'
import SearchInput from './search-input/SearchInput'
import './TableWrapper.scss'

function TableWrapper({
  searchPlaceholder,
  searchValue,
  setSearchQuery,
  actionButtons,
  selectedItems,
  currentPage,
  pageSize,
  totalListCount,
  onPageChange,
  children,
}) {
  return (
    <div className='table-main'>
      <div className='table-head-content'>
        <div className='search-otr'>
          {selectedItems > 0 ? (
            <span className='selected-items-otr'>{`${selectedItems} items selected`}</span>
          ) : (
            <SearchInput
              placeholder={searchPlaceholder}
              value={searchValue}
              handleChange={setSearchQuery}
            />
          )}
          {actionButtons?.length > 0 &&
            actionButtons.map((item) => (
              <button
                key={item.label}
                type='button'
                className={item.classes}
                onClick={item.handleClick}
              >
                {item?.icon && item.icon}
                {item.label}
              </button>
            ))}
          {searchValue && (
            <p className='search-result'>
              {`Showing ${totalListCount} for `}
              <span className='search-value'>{searchValue}</span>
            </p>
          )}
        </div>
      </div>
      <div className='table-otr'>
        {children}
        <div className='footer-table'>
          <div className='d-flex align-items-center'>
            <div className='text-otr mx-3'>
              <p className='entity-text heading-xs'>
                {`Showing ${(currentPage - 1) * pageSize + 1} to ${
                  (currentPage - 1) * pageSize > totalListCount
                    ? totalListCount
                    : currentPage * pageSize
                } of ${totalListCount} Entries`}
              </p>
            </div>
          </div>
          <Pagination
            itemsCount={totalListCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  )
}

TableWrapper.propTypes = {
  searchPlaceholder: PropTypes.string,
  searchValue: PropTypes.string,
  setSearchQuery: PropTypes.func,
  actionButtons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      classes: PropTypes.string.isRequired,
      handleClick: PropTypes.func.isRequired,
      icon: PropTypes.element,
    })
  ),
  selectedItems: PropTypes.number,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  totalListCount: PropTypes.number,
  onPageChange: PropTypes.func,
  children: PropTypes.node,
}

TableWrapper.defaultProps = {
  searchPlaceholder: '',
  searchValue: '',
  setSearchQuery: () => {}, // Provide a default function if needed
  actionButtons: [],
  selectedItems: 0,
  currentPage: 1,
  pageSize: 10, // Adjust the default value based on your requirements
  totalListCount: 0,
  onPageChange: () => {}, // Provide a default function if needed
  children: null,
}

export default TableWrapper
