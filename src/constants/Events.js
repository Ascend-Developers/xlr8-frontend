import * as yup from 'yup'

const locationSchema = yup.object().shape({
  longitude: yup.string(),
  latitude: yup.string(),
  mapUrl: yup.string().required('Location is required'),
  address: yup.string(),
})

const eventFirstStepValidation = yup.object().shape({
  name: yup.string().required('Required *'),
  photo: yup.mixed(),
  description: yup.string().required('Required *'),
  subHeading: yup.string().required('Required *'),
  startDate: yup.date().required().nullable(),
  endDate: yup.date().required().nullable(),
  // separatedByDays: yup.boolean().required().nullable(),
  location: locationSchema,
})

const agendaSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  startDate: yup.mixed().required('Date is required'),
  endDate: yup.mixed().required('Date is required'),
  description: yup.string().required('Description is required'),
})
const speakerSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  designation: yup.string().required('Designation is required'),
  image: yup.mixed().required('Photo is required'),
  description: yup.string(),
})

const eventSecondStepValidation = yup.object().shape({
  agenda: yup.array().of(agendaSchema).min(1, 'Please add at least one agenda'),
  speakers: yup
    .array()
    .of(speakerSchema)
    .min(1, 'Please add at least one speaker'),
  // gallery: yup.mixed().required('Required *'),
})

const eventInitialValues = {
  name: '',
  photo: [],
  subHeading: '',
  description: '',
  startDate: null,
  endDate: null,
  separatedByDays: false,
  location: {
    mapUrl: '',
    longitude: '',
    latitude: '',
    address: '',
  },
  agenda: [],
  speakers: [],
  gallery: [],
}
const agenda = {
  title: '',
  startDate: '',
  endDate: '',
  description: '',
}
const speaker = {
  name: '',
  designation: '',
  image: '',
  description: '',
}
export {
  eventFirstStepValidation,
  eventSecondStepValidation,
  eventInitialValues,
  agenda,
  agendaSchema,
  speakerSchema,
  speaker,
}
