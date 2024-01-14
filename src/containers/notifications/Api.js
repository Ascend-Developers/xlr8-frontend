const getNotifications = () => ({
  data: [{ _id: '11', title: 'Get Ready', body: 'Description will be her' }],
  Total: 1,
  LastPage: 1,
})

const createNotification = (values) => {
  console.log('values', values)
}
const updateNotificatio = (values) => {
  console.log('values ', values)
}
const deleteNotificatin = (values) => {
  console.log('values', values)
}
export {
  getNotifications,
  createNotification,
  updateNotificatio,
  deleteNotificatin,
}
