import TableWrapper from 'components/common/table-wrapper/TableWrapper'
import { DEBOUNCE_DELAY, initialMetaForTable } from 'constants/Common'
import { getEvents } from 'containers/events/Api'
import React, { useEffect, useState } from 'react'
import { getActionButtonProps } from 'utils/common'
import { PencilSimple, Trash } from 'phosphor-react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

let timeout
function EventsListing() {
  const [eventsList, setEventsList] = useState([])
  const [loading, setLoading] = useState(false)
  const [meta, setMeta] = useState({ ...initialMetaForTable })
  const [refresh, setRefresh] = useState(false)
  const navigate = useNavigate()
  const handleRefresh = () => {
    setRefresh((pre) => !pre)
  }
  const handleSetPerPage = (obj) => {
    setMeta((pre) => ({ ...pre, perPage: obj.value }))
    handleRefresh()
  }
  const debounceFn = (callback, delay) => {
    clearTimeout(timeout)
    timeout = setTimeout(callback, delay)
  }
  const handleSetSearchQuery = (value) => {
    setMeta((pre) => ({ ...pre, search: value }))
    debounceFn(handleRefresh, DEBOUNCE_DELAY)
  }
  const handlePageChange = (value) => {
    setMeta((pre) => ({ ...pre, page: value }))
    handleRefresh()
  }

  const fetchEvents = async () => {
    const result = await getEvents(meta.page, meta.perPage, meta.search)
    if (result?.LastPage && result?.Total) {
      const resultMeta = result
      setMeta((pre) => ({
        ...pre,
        totalCount: resultMeta.Total,
        totalPages: resultMeta.LastPage,
      }))
    }
    if (result?.data) {
      const { data } = result
      setEventsList(data)
    }
    setLoading(false)
  }
  const handleAddEvent = () => {
    navigate('/events/create')
  }
  useEffect(() => {
    fetchEvents()
  }, [refresh])

  return (
    <div className='user-main'>
      <div className='container-fluid'>
        <TableWrapper
          setPerPage={handleSetPerPage}
          setSearchQuery={handleSetSearchQuery}
          searchValue={meta.search}
          totalListCount={meta.totalCount}
          pageSize={meta.perPage}
          currentPage={meta.page}
          onPageChange={handlePageChange}
          actionButtons={[...getActionButtonProps('Add Event', handleAddEvent)]}
        >
          {loading ? (
            <p style={{ textAlign: 'center' }}>Loading</p>
          ) : (
            <table className='table table-main'>
              <thead>
                <tr>
                  <th scope='col'>
                    <div className='header-text-otr'>
                      <p
                        className='table-name heading-xsb'
                        aria-label='User index Column'
                      >
                        #
                      </p>
                    </div>
                  </th>
                  <th scope='col'>
                    <div className='header-text-otr'>
                      <p
                        className='table-name heading-xsb'
                        aria-label='User Name Column'
                      >
                        Event Name
                      </p>
                    </div>
                  </th>
                  <th scope='col'>
                    <div className='header-text-otr'>
                      <p
                        className='table-name heading-xsb'
                        aria-label='User Name Column'
                      >
                        Description
                      </p>
                    </div>
                  </th>

                  <th scope='col'>
                    <div className='header-text-otr'>
                      <p
                        className='table-name heading-xsb'
                        aria-label='User Gender Name Column'
                      >
                        Location
                      </p>
                    </div>
                  </th>
                  <th scope='col'>
                    <div className='header-text-otr'>
                      <p
                        className='table-name heading-xsb'
                        aria-label='User Email Name Column'
                      >
                        Date
                      </p>
                    </div>
                  </th>

                  <th scope='col' className='action-column'>
                    <div className='header-text-otr'>
                      <p
                        className='table-name heading-xsb'
                        aria-label='User Action Name Column'
                      >
                        Actions
                      </p>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {eventsList?.map((item, index) => (
                  <tr key={item.id}>
                    <th scope='col'>
                      <div className='header-text-otr'>
                        <p
                          className='table-name heading-xsb'
                          aria-label='User Table Data Column'
                        >
                          {index + 1}
                        </p>
                      </div>
                    </th>
                    <td>
                      <div className='table-text-otr'>
                        <p className='table-text-black' title={item.name}>
                          {item.name}
                        </p>
                      </div>
                    </td>
                    <td className='max-width-500'>
                      <div className='table-text '>
                        <p
                          className='table-text-black'
                          title={item.description}
                        >
                          {item.description}
                        </p>
                      </div>
                    </td>

                    <td>
                      <div className='table-text-otr'>
                        <p
                          className='table-text-black'
                          title={item?.location?.address}
                        >
                          {item?.location?.address}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className='table-text-otr'>
                        <p
                          className='table-text-black'
                          title={moment(item?.startDate).format('LL')}
                        >
                          {moment(item?.startDate).format('LL')}
                        </p>
                      </div>
                    </td>

                    <td className='action-column'>
                      <div className='table-icon-otr'>
                        <div
                          className='icon-otr'
                          onClick={(e) => {
                            console.log(e)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              console.log('Enter key or Spacebar pressed')
                            }
                          }}
                          role='button'
                          tabIndex={0}
                          aria-label='Edit User'
                        >
                          <PencilSimple size={18} onClick={() => {}} />
                        </div>
                        <div
                          className='icon-otr'
                          onClick={(e) => {
                            console.log(e)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              console.log('Enter key or Spacebar pressed')
                            }
                          }}
                          role='button'
                          tabIndex={0}
                          aria-label='Delete User'
                        >
                          <Trash size={18} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </TableWrapper>
      </div>
    </div>
  )
}

export default EventsListing
