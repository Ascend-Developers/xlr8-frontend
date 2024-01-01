import * as yup from 'yup'

const userValidationSchema = yup.object().shape({
  name: yup.string().required('Required *'),
  gender: yup.string().required('Required *'),
  email: yup.string().email().required('Required *'),
  phone: yup.number().required('Required *'),
  company: yup.string(),
  field: yup.string(),
  password: yup.string().test({
    name: 'conditionalPassword',
    test(value) {
      // Access the original object being validated
      const obj = this.parent

      // Check if _id is not present and password is empty
      // eslint-disable-next-line no-underscore-dangle
      if (!obj._id && !value) {
        return this.createError({
          path: 'password',
          message: 'Password is required when _id is not present',
        })
      }

      return true
    },
  }),
})

const userInitialValues = {
  name: '',
  gender: '',
  email: '',
  phone: '',
  company: '',
  field: '',
  password: '',
}

const GENDERS = [
  {
    value: 'Male',
    label: 'Male',
  },
  {
    value: 'Female',
    label: 'Female',
  },
]
const FIELDS = [
  {
    value: 'FIELD-1',
    label: 'Field 1',
  },
  {
    value: 'FIELD-2',
    label: 'Field 2',
  },
]
const USER_STATUS = [
  {
    value: 'pending',
    label: 'Pending',
  },
  {
    value: 'approved',
    label: 'Approve',
  },
  {
    value: 'rejected',
    label: 'Reject',
  },
]
export { userValidationSchema, userInitialValues, GENDERS, FIELDS, USER_STATUS }
