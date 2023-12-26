import * as yup from 'yup'

const eventFirstStepValidation = yup.object().shape({
  name: yup.string().required('Required *'),
  photo: yup.mixed().required('Required *'),
  description: yup.string().required('Required *'),
  date_time_from: yup.date().required().nullable(),
  date_time_to: yup.date().required().nullable(),
  location: yup.string().required(),
  map_url: yup.string().required(),
})

const agendaSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  date: yup.date().required('Date is required'),
  description: yup.string().required('Description is required'),
})
const speakerSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  designation: yup.string().required('Designation is required'),
  photo: yup.mixed().required('Photo is required'),
  topic: yup.string().required('Topic is required'),
})

const eventSecondStepValidation = yup.object().shape({
  agendas: yup
    .array()
    .of(agendaSchema)
    .min(1, 'Please add at least one agenda'),
  speakers: yup
    .array()
    .of(speakerSchema)
    .min(1, 'Please add at least one speaker'),
})

const eventInitialValues = {
  name: '',
  photo: '',
  description: '',
  date_time_from: null,
  date_time_to: null,
  location: '',
  map_url: '',
  agendas: [],
  speakers: [],
}

export {
  eventFirstStepValidation,
  eventSecondStepValidation,
  eventInitialValues,
}
