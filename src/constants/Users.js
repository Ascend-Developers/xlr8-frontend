import * as yup from 'yup'

const userValidationSchema = yup.object().shape({
  firstName: yup.string().required('Required *'),
  lastName: yup.string().required('Required *'),
  name: yup.string().required('Required *'),
  company: yup.string().required('Required *'),
  jobTitle: yup.string().required('Required *'),
  phone: yup.string().required('Required *'),
  email: yup.string().email().required('Required *'),
  workLocation: yup.string().required('Required *'),
  emergencyContactName: yup.string().required('Required *'),
  emergencyContactRelationship: yup.string().required('Required *'),
  emergencyContactPhoneNumber: yup.string().required('Required *'),
  managerName: yup.string().required('Required *'),
  managerPhoneNumber: yup.string().required('Required *'),
  // status: yup.string().required('Required *'),
  type: yup.string().required('Required *'),
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
  firstName: '',
  lastName: '',
  name: '',
  company: '',
  jobTitle: '',
  phone: '',
  email: '',
  workLocation: '',
  emergencyContactName: '',
  emergencyContactRelationship: '',
  emergencyContactPhoneNumber: '',
  managerName: '',
  managerPhoneNumber: '',
  status: '',
  password: '',
  type: '',
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
const USER_TYPE = [
  {
    value: 'admin',
    label: 'Admin',
  },
  {
    value: 'user',
    label: 'User',
  },
]
export {
  userValidationSchema,
  userInitialValues,
  GENDERS,
  FIELDS,
  USER_STATUS,
  USER_TYPE,
}
