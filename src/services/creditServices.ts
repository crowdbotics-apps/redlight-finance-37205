import api, { getResponseErrorData } from './api'

const getUserDetailsByPhone = async (phoneNumber) => {
    try {
      const encodedPhoneNumber = encodeURIComponent(phoneNumber)
      const response = await api.get(`/user_detail/?phone_number=${encodedPhoneNumber}`)
      return response.data
    } catch (error) {
      return getResponseErrorData(error)
    }
}

const getUserDetailsByEmail = async (email) => {
  try {
    const response = await api.get(`/user_detail/?email=${email}`)
    return response.data
  } catch (error) {
    return getResponseErrorData(error)
  }
}

const getUserDetailsByPublicAddress = async (publicAddress) => {
  try {
    const response = await api.get(`/user_detail/?public_address=${publicAddress}`)
    return response.data
  } catch (error) {
    return getResponseErrorData(error)
  }
}

const sendCredit = async (data: any) => {
    try {
      const response = await api.post('send_credit/', data)
      return response
    } catch (error) {
      return getResponseErrorData(error)
    }
}

const moveCredit = async (data: any) => {
    try {
      const response = await api.post('move_credit/', data)
      return response
    } catch (error) {
      return getResponseErrorData(error)
    }
  }

  export {getUserDetailsByPhone,getUserDetailsByEmail,getUserDetailsByPublicAddress,
            sendCredit,moveCredit}