import api, { getResponseErrorData } from './api'

const signup = async (data: Object) => {
  try {
    const response = await api.post('signup_login/', data)
    console.info(response)
    return response.data
  } catch (error) {
    return getResponseErrorData(error).data
  }
}

const sendPhoneOTP = async (data : Object) => {
  try{
    const response = await api.post('send_phone_otp/',data)
    console.info(response);
    return response.data  
  } catch(error) {
    return getResponseErrorData(error).data
  }
}

const sendEmailOTP = async (data : Object) => {
  try{
    const response = await api.post('send_email_otp/',data)
    console.info(response);
    return response.data  
  } catch(error) {
    return getResponseErrorData(error).data
  }
}

const verifyPhoneOTP = async (data : Object) => {
  try{
    const response = await api.post('verify_phone_otp/',data)
    console.info(response);
    return response.data  
  } catch(error) {
    return getResponseErrorData(error).data
  }
}

const verifyEmailOTP = async (data : Object) => {
  try{
    const response = await api.post('verify_email_otp/',data)
    console.info(response);
    return response.data  
  } catch(error) {
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


export { login, signup,sendPhoneOTP,sendEmailOTP,verifyEmailOTP,verifyPhoneOTP }

