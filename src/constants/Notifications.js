import * as yup from 'yup'

const notificationValidationSchema = yup.object().shape({
  title: yup.string().required('Required *'),
  body: yup.string().required('Required *'),
})

const notificationInitialValues = {
  title: '',
  body: '',
}

export { notificationInitialValues, notificationValidationSchema }
