import * as yup from 'yup'

const userValidationSchema = yup.object().shape({
  name: yup.string().required('Required *'),
  gender: yup.string().required('Required *'),
  email: yup.string().email().required('Required *'),
  phone: yup.number().required('Required *'),
  company: yup.number(),
  field_id: yup.string(),
})

const userInitialValues = {
  name: '',
  gender: '',
  email: '',
  phone: '',
  company: '',
  field_id: '',
}

const GENDERS = [
  {
    value: 'MALE',
    label: 'Male',
  },
  {
    value: 'FEMALE',
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
export { userValidationSchema, userInitialValues, GENDERS, FIELDS }
