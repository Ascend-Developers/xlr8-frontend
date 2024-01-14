/* eslint-disable jsx-a11y/label-has-associated-control */
import TableWrapper from 'components/common/table-wrapper/TableWrapper'
import { alertTypes, initialMetaForTable } from 'constants/Common'
import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import { PencilSimple, Trash } from 'phosphor-react'
import { getActionButtonProps } from 'utils/common'

import { toast } from 'react-toastify'
import CustomToast from 'components/common/custom-toast/CustomToast'
import {
  createNotification,
  deleteNotificatin,
  getNotifications,
  updateNotificatio,
} from 'containers/notifications/Api'
import ConfirmationModal from './ConfirmationModal'
import NotificationModal from './NotificationModal'

let timeout
const DEBOUNCE_DELAY = 700
function NotificationsListing() {
  //   const navigate = useNavigate()
  const [notificationsList, setNotificationsList] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [meta, setMeta] = React.useState(initialMetaForTable)
  const [isNotificationModalVisible, setNotificationModalVisible] =
    React.useState(false)
  const [refresh, setRefresh] = React.useState(false)
  const [selectedNotification, setSelectedNotification] = useState()
  const [
    isNotificationConfirmationModalVisible,
    setNotificationConfirmationModalVisible,
  ] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

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
  const handleCloseModal = () => {
    setNotificationModalVisible(false)
    setSelectedNotification()
  }
  const handleOpenModal = () => {
    setNotificationModalVisible(true)
  }
  const fetchNotifications = async () => {
    const result = await getNotifications(meta.page, meta.perPage, meta.search)
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
      setNotificationsList(data)
    }
    setLoading(false)
  }

  const handleCreateNotification = async (values) => {
    const result = await createNotification(values)
    if (result?.status === 200) {
      toast(
        <CustomToast
          variant={alertTypes.SUCCESS}
          message={result?.statusText || 'Notification Created Successfully!'}
        />
      )
      handleRefresh()
      handleCloseModal()
    } else {
      toast(
        <CustomToast
          variant={alertTypes.DANGER}
          message={result?.response?.data?.error}
        />
      )
    }
  }

  const handleUpdateNotification = async (values) => {
    const result = await updateNotificatio(values)
    if (result?.status === 200) {
      toast(
        <CustomToast
          variant={alertTypes.SUCCESS}
          message={result?.statusText || 'Noification Updated Successfully!'}
        />
      )
      handleCloseModal()
      handleRefresh()
    } else {
      toast(
        <CustomToast
          variant={alertTypes.DANGER}
          message={result?.response?.data?.error}
        />
      )
    }
  }

  const handleCloseNotificationConfirmationModal = () => {
    setNotificationConfirmationModalVisible(false)
    setSelectedNotification()
    setIsDeleting(false)
  }
  const handleOpenNotificationConfirmationModal = () => {
    setNotificationConfirmationModalVisible(true)
  }
  const handleDeleteNotification = async () => {
    // eslint-disable-next-line no-underscore-dangle
    const result = await deleteNotificatin(selectedNotification._id)
    if (result?.status === 200) {
      toast(
        <CustomToast
          variant={alertTypes.SUCCESS}
          message={result?.statusText || 'Notification Deleted Successfully!'}
        />
      )
      handleRefresh()
      handleCloseNotificationConfirmationModal()
    } else {
      toast(
        <CustomToast
          variant={alertTypes.DANGER}
          message={result?.response?.data?.error}
        />
      )
    }
  }
  const handleConfirmNotification = () => {}

  useEffect(() => {
    fetchNotifications()
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
          actionButtons={[
            ...getActionButtonProps('Add Notification', () => {
              handleOpenModal()
            }),
          ]}
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
                        Notification Title{' '}
                      </p>
                    </div>
                  </th>
                  <th scope='col'>
                    <div className='header-text-otr'>
                      <p
                        className='table-name heading-xsb'
                        aria-label='User Name Column'
                      >
                        Notification Body
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
                {notificationsList?.map((item, index) => (
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
                        <p className='table-text-black' title={item.title}>
                          {item.title}
                        </p>
                      </div>
                    </td>

                    <td>
                      <div className='table-text-otr'>
                        <p className='table-text-black' title={item.body}>
                          {item.body}
                        </p>
                      </div>
                    </td>

                    <td className='action-column'>
                      <div className='table-icon-otr'>
                        <button
                          type='button'
                          className='action-btn-sm record-btn'
                          onClick={() => {
                            setSelectedNotification(item)
                            handleOpenNotificationConfirmationModal()
                          }}
                        >
                          Trigger
                        </button>
                        <div
                          className='icon-otr'
                          role='button'
                          tabIndex={0}
                          aria-label='Edit User'
                        >
                          <PencilSimple
                            className='primary-color'
                            size={18}
                            onClick={() => {
                              setSelectedNotification(item)
                              handleOpenModal()
                            }}
                          />
                        </div>
                        <div
                          className='icon-otr'
                          role='button'
                          tabIndex={0}
                          aria-label='Delete User'
                        >
                          <Trash
                            className='danger-color'
                            size={18}
                            onClick={() => {
                              setIsDeleting(true)
                              setSelectedNotification(item)
                              handleOpenNotificationConfirmationModal()
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
      {isNotificationConfirmationModalVisible && (
        <ConfirmationModal
          handleConfirmNotification={
            isDeleting ? handleDeleteNotification : handleConfirmNotification
          }
          handleCloseModal={handleCloseNotificationConfirmationModal}
          isDeleting={isDeleting}
          selectedNotification={selectedNotification}
        />
      )}
      {isNotificationModalVisible && (
        <NotificationModal
          handleCloseModal={handleCloseModal}
          selectedNotification={selectedNotification}
          handleSaveNotification={handleCreateNotification}
          handleUpdateNotification={handleUpdateNotification}
        />
      )}
    </div>
  )
}

export default NotificationsListing
