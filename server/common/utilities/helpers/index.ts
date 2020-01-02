export const createQueryString = (searchObj = {}) => {
  let result = '?'

  Object.keys(searchObj).forEach(key => {
    if (searchObj[key]) {
      result += `${key}=${searchObj[key]}&`
    }
  })
  return result.slice(0, -1)
}

export const isRouterReached = (identifire: string) => {
  return (req, res, next) => {
    console.log(`Reached to ${identifire}`)
    next()
  }
}