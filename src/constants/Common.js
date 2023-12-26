import { ReactComponent as AlertPrimaryImg } from 'assets/images/alert-primary.svg'
import { ReactComponent as AlertSecondaryImg } from 'assets/images/alert-secondary.svg'
import { ReactComponent as AlertInfoImg } from 'assets/images/alert-info.svg'
import { ReactComponent as AlertSuccessImg } from 'assets/images/alert-success.svg'
import { ReactComponent as AlertDangerImg } from 'assets/images/alert-danger.svg'
import { ReactComponent as AlertWarningImg } from 'assets/images/alert-warning.svg'
import React from 'react'

const BASE_URL = process.env.REACT_APP_API_URL
const GRANT_TYPE = 'password'

const DEBOUNCE_DELAY = 700
const initialMetaForTable = {
  page: 1,
  perPage: 20,
  search: '',
}

const fakeUsersData = [
  {
    _id: '1',
    userName: 'User Name',
    gender: 'Male',
    email: 'test@test.com',
    phoneNumber: '+92333546435',
    company: 'Tesla',
  },
  {
    _id: '2',
    userName: 'User Name',
    gender: 'Male',
    email: 'test@test.com',
    phoneNumber: '+92333546435',
    company: 'Tesla',
  },
]

const toastContainerProps = {
  hideProgressBar: true,
  closeButton: false,
  autoClose: 5000,
  limit: 2,
  position: 'bottom-right',
  closeOnClick: false,
}

const alertTypes = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  DANGER: 'danger',
}

const alertIcons = {
  // eslint-disable-next-line react/jsx-filename-extension
  [alertTypes.INFO]: <AlertInfoImg />,
  [alertTypes.DANGER]: <AlertDangerImg />,
  [alertTypes.WARNING]: <AlertWarningImg />,
  [alertTypes.SUCCESS]: <AlertSuccessImg />,
  [alertTypes.PRIMARY]: <AlertPrimaryImg />,
  [alertTypes.SECONDARY]: <AlertSecondaryImg />,
}

export {
  initialMetaForTable,
  fakeUsersData,
  BASE_URL,
  GRANT_TYPE,
  toastContainerProps,
  alertTypes,
  alertIcons,
  DEBOUNCE_DELAY,
}
