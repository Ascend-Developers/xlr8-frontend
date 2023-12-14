import { startCase, forEach } from 'lodash'

const getBreadcrumbs = (pathname) => {
  const urlPath = pathname.split('/')
  const [, ...usablePath] = urlPath

  const breadCrumbs = [
    {
      name: 'Home',
      route: '/home',
    },
  ]
  let fullTrailPath = '/'

  forEach(usablePath, (path, i) => {
    fullTrailPath += `${path + (i !== usablePath.length - 1 ? '/' : '')}`
    if (fullTrailPath !== '/dashboard')
      breadCrumbs.push({
        name: startCase(path),
        route: fullTrailPath,
      })
  })

  // In case of edit path remove the id before edit
  if (pathname.includes('edit')) {
    breadCrumbs.splice(breadCrumbs.length - 2, 1)
  }
  if (pathname.includes('provider-rate-history')) {
    breadCrumbs.splice(breadCrumbs.length - 2, 1)
  }

  return breadCrumbs
}
const getActionButtonProps = (label, handleClick) => [
  {
    label,
    handleClick,
    classes: 'primary-btn record-btn',
  },
]

export { getBreadcrumbs, getActionButtonProps }
