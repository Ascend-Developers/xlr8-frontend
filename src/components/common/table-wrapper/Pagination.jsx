import React from 'react'
import { CaretRight, CaretLeft } from 'phosphor-react'
import PaginationComponent from 'rc-pagination'
/* eslint-disable */

function Pagination({ itemsCount, currentPage, onPageChange, pageSize }) {
  return (
    <div className='pagination-main'>
      <nav aria-label='...'>
        <ul className='pagination'>
          <PaginationComponent
            className='pagination'
            onChange={onPageChange}
            current={currentPage}
            total={itemsCount}
            pageSize={pageSize}
            showTitle={false}
            hideOnSinglePage
            showLessItems
            showSizeChanger={false}
            // eslint-disable-next-line react/no-unstable-nested-components
            itemRender={(_current, _type, element) => (
              <p className='page-link page-linkk-otr'>
                <span className='page-linkk heading-xsb'>{element}</span>
              </p>
            )}
            prevIcon={
              <p className='page-link icon-otr'>
                <CaretLeft size={20} />
              </p>
            }
            nextIcon={
              <p className='page-link icon-otr'>
                <CaretRight size={20} />
              </p>
            }
          />
        </ul>
      </nav>
    </div>
  )
}

export default Pagination
