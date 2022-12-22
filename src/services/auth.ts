import { Alert } from 'react-native'
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

const sendPhoneOTP = async (data: Object) => {
  try {
    const response = await api.post('send_phone_otp/', data)
    console.info(response);
    return response.data
  } catch (error) {
    return getResponseErrorData(error).data
  }
}

const sendEmailOTP = async (data: Object) => {
  try {
    const response = await api.post('send_email_otp/', data)
    console.info(response);
    return response.data
  } catch (error) {
    return getResponseErrorData(error).data
  }
}

const verifyPhoneOTP = async (data: Object) => {
  try {
    const response = await api.post('verify_phone_otp/', data)
    console.info(response);
    return response.data
  } catch (error) {
    return getResponseErrorData(error).data
  }
}

const verifyEmailOTP = async (data: Object) => {
  try {
    const response = await api.post('verify_email_otp/', data)
    console.info(response);
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

const forgotPasswordSendEmailOtp = async (data: any) => {
  try {
    const response = await api.post('forgot_password/send_email_otp/', data)
    if(response.status == 202){
      return response.data
    }
  } catch (error) {
    Alert.alert(getResponseErrorData(error).data['message'])
    return getResponseErrorData(error).data
  }
}

const forgotPasswordSendPhoneOtp = async (data: any) => {
  try {
    const response = await api.post('forgot_password/send_phone_otp/', data)
    return response.data
  } catch (error) {
    Alert.alert(getResponseErrorData(error).data['message'])
    return getResponseErrorData(error).data
  }
}

const forgotPasswordVerifyEmailOtp = async (data: any) => {
  try {
    const response = await api.post('/forgot_password/verify_email_otp/', data)
    return response.data
  } catch (error) {
    return getResponseErrorData(error);
    
  }
  }
const forgotPasswordVerifyPhonelOtp = async (data: any) => {
  try {
    const response = await api.post('/forgot_password/verify_phone_otp/', data)
    return response.data
  } catch (error) {
    error = getResponseErrorData(error)
    if(error.status===400){
      Alert.alert(error.data.message)
    }
  }
}
const resetPassword = async (data: any) => {
  try {
    const response = await api.post('forgot_password/reset_password/', data)
    return response.data
  } catch (error) {
    return getResponseErrorData(error)
  }
}

export { login, signup, sendPhoneOTP, sendEmailOTP, verifyEmailOTP, verifyPhoneOTP, forgotPasswordSendEmailOtp, forgotPasswordSendPhoneOtp, resetPassword, forgotPasswordVerifyEmailOtp, forgotPasswordVerifyPhonelOtp }
