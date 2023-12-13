import TableWrapper from 'components/common/table-wrapper/TableWrapper'
import { fakeUsersData, initialMetaForTable } from 'constants/Common'
import React, { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
import { PencilSimple, Trash } from 'phosphor-react'

let timeout
const DEBOUNCE_DELAY = 700
function UsersListing() {
  //   const navigate = useNavigate()
  const [usersList, setUsersList] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [meta, setMeta] = React.useState(initialMetaForTable)
  const [totalCount, setTotalCount] = React.useState(0)

  const [refresh, setRefresh] = React.useState(false)

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
    console.log('value is-----------', value)
    setMeta((pre) => ({ ...pre, search: value }))
    debounceFn(handleRefresh, DEBOUNCE_DELAY)
  }
  const handlePageChange = (value) => {
    setMeta((pre) => ({ ...pre, page: value }))
    handleRefresh()
  }

  useEffect(() => {
    setLoading(false)
    setUsersList(fakeUsersData)
    setTotalCount(100)
  }, [refresh])
  return (
    <div className='user-main'>
      <div className='container-fluid'>
        <TableWrapper
          setPerPage={handleSetPerPage}
          setSearchQuery={handleSetSearchQuery}
          searchValue={meta.search}
          totalListCount={totalCount}
          pageSize={meta.perPage}
          currentPage={meta.page}
          onPageChange={handlePageChange}
          //   actionButtons={[
          //       ...getActionButtonProps('Add User', () =>
          //         navigate(USER_CREATE_PATH)
          //       ),
          //       ...getActionButtonProps('Export', () => {
          //         exportRef.current.link.click()
          //       }),
          //     ]
          //   }
        >
          {loading ? (
            <p style={{ textAlign: 'center' }}>Loading</p>
          ) : (
            <table className='table'>
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
                        User Name
                      </p>
                    </div>
                  </th>
                  <th scope='col'>
                    <div className='header-text-otr'>
                      <p
                        className='table-name heading-xsb'
                        aria-label='User Company Column'
                      >
                        Company
                      </p>
                    </div>
                  </th>
                  <th scope='col'>
                    <div className='header-text-otr'>
                      <p
                        className='table-name heading-xsb'
                        aria-label='User Gender Name Column'
                      >
                        Gender
                      </p>
                    </div>
                  </th>
                  <th scope='col'>
                    <div className='header-text-otr'>
                      <p
                        className='table-name heading-xsb'
                        aria-label='User Email Name Column'
                      >
                        Email
                      </p>
                    </div>
                  </th>
                  <th scope='col'>
                    <div className='header-text-otr'>
                      <p
                        className='table-name heading-xsb'
                        aria-label='User Phone Name Column'
                      >
                        Phone Number
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
                {usersList?.map((item, index) => (
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
                      <div className='profile-otr' title={item.userName}>
                        <div className='named-avatar'>{item.userName}</div>
                        {item.userName}
                      </div>
                    </td>
                    <td>
                      <div className=''>
                        <p className='table-text' title={item.company}>
                          {item.company}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className='table-text-otr'>
                        <p className='table-text-black' title={item.gender}>
                          {item.gender}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className='table-text-otr'>
                        <p className='table-text-black' title={item.email}>
                          {item.email}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className='table-text-otr'>
                        <p
                          className='table-text-black'
                          title={item.phoneNumber}
                        >
                          {item.phoneNumber}
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
                        >
                          <PencilSimple size={24} />
                        </div>
                        <div className='icon-otr' onClick={() => {}}>
                          <Trash size={24} />
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

export default UsersListing
