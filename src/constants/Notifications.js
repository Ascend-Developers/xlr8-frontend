import * as yup from 'yup'

const notificationValidationSchema = yup.object().shape({
  title: yup.string().required('Required *'),
  body: yup.string().required('Required *'),
  dateTime: yup.string().required().nullable(),
  // time: yup.string().required().nullable(),
  status: yup.string(),
})

const notificationInitialValues = {
  title: '',
  body: '',
  dateTime: '',
  // time: '',
  status: '',
}

export { notificationInitialValues, notificationValidationSchema }
