import api, { getResponseErrorData } from './api'

const signup = async (data: any) => {
  try {
    const response = await api.post('/users/signup/', data)
    console.info(response)
    return response.data
  } catch (error) {
    return getResponseErrorData(error).data
  }
}

const login = async (data: any) => {
  try {
    const response = await api.post('login/', data)
    return response.data
  } catch (error) {
    return getResponseErrorData(error).data
  }
}

export { login, signup }
