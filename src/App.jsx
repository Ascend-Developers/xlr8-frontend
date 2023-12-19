/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { ToastContainer } from 'react-toastify'
import { toastContainerProps } from 'constants/Common'
import { checkUserLoggedInStatus } from 'utils/common'
import AppRoutes from './routes'
import './App.scss'

function App() {
  return (
    <>
      <AppRoutes isLoggedIn={checkUserLoggedInStatus()} />
      <ToastContainer {...toastContainerProps} />
    </>
  )
}

export default App
