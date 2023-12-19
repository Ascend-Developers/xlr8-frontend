import { startCase, forEach } from 'lodash'
import { useLocation } from 'react-router-dom'
import React from 'react'

const getBreadcrumbs = (pathname) => {
  const urlPath = pathname.split('/')
  const [, ...usablePath] = urlPath

  const breadCrumbs = [
    {
      name: 'Home',
      route: '/home',
    },
  ]
  let fullTrailPath = '/'

  forEach(usablePath, (path, i) => {
    fullTrailPath += `${path + (i !== usablePath.length - 1 ? '/' : '')}`
    if (fullTrailPath !== '/dashboard')
      breadCrumbs.push({
        name: startCase(path),
        route: fullTrailPath,
      })
  })

  // In case of edit path remove the id before edit
  if (pathname.includes('edit')) {
    breadCrumbs.splice(breadCrumbs.length - 2, 1)
  }
  if (pathname.includes('provider-rate-history')) {
    breadCrumbs.splice(breadCrumbs.length - 2, 1)
  }

  return breadCrumbs
}
const getActionButtonProps = (label, handleClick) => [
  {
    label,
    handleClick,
    classes: 'primary-btn record-btn',
  },
]

const getAccessToken = () => localStorage.getItem('access_token')
const setAccessToken = (accessToken) =>
  localStorage.setItem('access_token', accessToken)
const setUserInfoInStorage = (userInfo = {}) =>
  localStorage.setItem('uuInfo', JSON.stringify(userInfo))
function useQuery() {
  const { search } = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}
const checkUserLoggedInStatus = () => {
  if (getAccessToken()) {
    return true
  }

  return false
}
const removeAccessToken = () => {
  localStorage.removeItem('access_token')
}

const removeUserInfoFromStorage = () => {
  localStorage.removeItem('uuInfo')
}

export {
  getBreadcrumbs,
  getActionButtonProps,
  getAccessToken,
  setAccessToken,
  useQuery,
  checkUserLoggedInStatus,
  setUserInfoInStorage,
  removeAccessToken,
  removeUserInfoFromStorage,
}
