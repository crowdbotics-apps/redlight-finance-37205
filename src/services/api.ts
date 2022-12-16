import axios from 'axios'
import { getGlobalOptions } from '@options'
import { getItem } from '../util'

const gOptions = getGlobalOptions()
// const BASE_URL = gOptions.url
const BASE_URL = "https://redlight-finance-37205-staging.botics.co/api/v1/"

const api = axios.create({
  baseURL: BASE_URL,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
})

const apiMultipart = axios.create({
  baseURL: BASE_URL,
  headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data' }
})

const onRequest = async config => {
  const key = await getItem('token')
  if (key) {
    config.headers.authorization = `Token ${key}`
  }
  return config
}

api.interceptors.request.use(onRequest)

apiMultipart.interceptors.request.use(onRequest)

// api.interceptors.response.use(
//   response => {
//     if (response.status === 401) {
//       alert('You are not authorized')
//     }
//     return response
//   },
//   error => {
//     if (error.response && error.response.data) {
//       return Promise.reject(error.response.data)
//     }
//     return Promise.reject(error.message)
//   }
// )

//handle axios response error
export const getResponseErrorData = error => {
  let errorData = { status: -1, data: '' }
  if (error && error.response && error.response.status) {
    const response = error.response
    if (response.data) {
      errorData = { status: response.status, data: response.data }
    } else {
      errorData = { status: response.status, data: error.message }
    }
  } else {
    errorData = { data: error.message, status: error.response.status }
  }
  {
    __DEV__ && console.log('--RESPONSE-ERROR--', errorData)
  }
  return errorData
}

export { apiMultipart }

export default api
