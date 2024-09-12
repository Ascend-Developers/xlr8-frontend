/* eslint-disable no-underscore-dangle */
import TableWrapper from 'components/common/table-wrapper/TableWrapper'
import {
  DEBOUNCE_DELAY,
  alertTypes,
  initialMetaForTable,
} from 'constants/Common'
import { deleteEvent, getEvents } from 'containers/events/Api'
import React, { useEffect, useState } from 'react'
import { getActionButtonProps } from 'utils/common'
import { PencilSimple, Trash } from 'phosphor-react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import CustomToast from 'components/common/custom-toast/CustomToast'
import EventDelete from './EventDeleteModal'

let timeout
function EventsListing() {
  const [eventsList, setEventsList] = useState([])
  const [loading, setLoading] = useState(false)
  const [meta, setMeta] = useState({ ...initialMetaForTable })
  const [refresh, setRefresh] = useState(false)
  const [isEventDeleteModalVisible, setIsEventDeleteModalVisible] =
    useState(false)
  const [selectedEvent, setSelectedEvent] = useState()

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

  const handleCloseEventDeleteModal = () => {
    setIsEventDeleteModalVisible(false)
    setSelectedEvent()
  }
  const handleOpenDeleteEventModal = () => {
    setIsEventDeleteModalVisible(true)
  }
  const handleDeleteEvent = async () => {
    // eslint-disable-next-line no-underscore-dangle
    console.log(selectedEvent)
    const result = await deleteEvent(selectedEvent._id)
    if (result?.status === 200) {
      toast(
        <CustomToast
          variant={alertTypes.SUCCESS}
          message={result?.statusText || 'Event Deleted Successfully!'}
        />
      )
      handleRefresh()
      handleCloseEventDeleteModal()
    } else {
      toast(
        <CustomToast
          variant={alertTypes.DANGER}
          message={result?.response?.data?.error}
        />
      )
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [refresh])

  return (
    <div className='event-main'>
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
                        <div className='icon-otr' aria-label='Edit User'>
                          <PencilSimple
                            size={18}
                            className='primary-color'
                            onClick={() => {
                              navigate(`/events/${item._id}/edit`)
                            }}
                          />
                        </div>
                        <div className='icon-otr' aria-label='Delete User'>
                          <Trash
                            size={18}
                            className='danger-color'
                            onClick={() => {
                              setSelectedEvent(item)
                              handleOpenDeleteEventModal()
                            }}
                          />
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
      {isEventDeleteModalVisible && (
        <EventDelete
          handleDeleteUser={handleDeleteEvent}
          handleCloseModal={handleCloseEventDeleteModal}
        />
      )}
    </div>
  )
}

export default EventsListing
