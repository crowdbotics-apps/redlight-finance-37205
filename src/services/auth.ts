import { Alert } from 'react-native'
import { err } from 'react-native-svg/lib/typescript/xml'
import api, { getResponseErrorData } from './api'

const signup = async (data: Object) => {
  try {
    const response = await api.post('signup_login/', data)
    return response
  } catch (error) {
    return getResponseErrorData(error).data
  }
}

const sendPhoneOTP = async (data: Object) => {
  try {
    const response = await api.post('send_phone_otp/', data)
    return response.data
  } catch (error) {
    return getResponseErrorData(error).data
  }
}

const sendEmailOTP = async (data: Object) => {
  try {
    const response = await api.post('send_email_otp/', data)
    return response.data
  } catch (error) {
    return getResponseErrorData(error).data
  }
}

const verifyPhoneOTP = async (data : Object) => {
  try{
    const response = await api.post('verify_phone_otp/',data)
    return response 
  } catch(error) {
    return getResponseErrorData(error)
  }
}


const verifyEmailOTP = async (data : Object) => {
  try{
    const response = await api.post('verify_email_otp/',data)
    return response
  } catch(error) {
    return getResponseErrorData(error).data
  }
}

const login = async (data: any) => {
  try {
    const response = await api.post('login/', data)
    console.log(response.data)
    return response.data
  } catch (error) {
    return getResponseErrorData(error)
  }
}

const forgotPasswordSendEmailOtp = async (data: any) => {
  try {
    const response = await api.post('forgot_password/send_email_otp/', data)
    if (response.status == 202) {
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
    if (error.status === 400) {
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

const changePassword = async (data: any) => {
  try {
    const response = await api.put('change_password/', data)
    console.info(response);
    return response.data
  } catch (error) {
    return getResponseErrorData(error)
  }
}

const myProfile = async () => {
  try {
    const response = await api.get('/user_profile/')
    console.info(response);
    return response.data
  } catch (error) {
    return getResponseErrorData(error)
  }
}
const signOut = async () => {
  try {
    const response = await api.post('/logout/')
    console.info(response);
    return response
  } catch (error) {
    return getResponseErrorData(error)
  }
}
const deleteAccount = async (data: any) => {
  try {
    const response = await api.delete('/delete_account/', { data: data })
    return response
  } catch (error) {
    return getResponseErrorData(error)
  }
}
const getAllFIATWallets = async () => {
  try {
    const response = await api.get('/wallets/?wallet_type=2')
    return response
  } catch (error) {
    return getResponseErrorData(error)
  }
}

const editSubWallet = async (data: any, id: any) => {
  try {
    const response = await api.put(`/wallets/${id}/`, data)
    return response
  } catch (error) {
    return getResponseErrorData(error)
  }
}

const addSubWallet = async (data: any) => {
  try {
    const response = await api.post("/wallets/", data)
    return response
  } catch (error) {
    return getResponseErrorData(error)
  }
}

const deleteWallet = async (id: any) => {
  try {
    const response = await api.delete(`/wallets/${id}/`)
    return response
  } catch (error) {
    return getResponseErrorData(error)
  }
}

const transactionHistory = async () => {
  try {
    const response = await api.get("/transaction_history/")
    return response
  } catch (error) {
    return getResponseErrorData(error)
  }
}

export { login, signup, sendPhoneOTP, sendEmailOTP, verifyEmailOTP, verifyPhoneOTP, forgotPasswordSendEmailOtp, forgotPasswordSendPhoneOtp, resetPassword, forgotPasswordVerifyEmailOtp, forgotPasswordVerifyPhonelOtp, changePassword, myProfile, signOut, deleteAccount, getAllFIATWallets, addSubWallet, editSubWallet, deleteWallet, transactionHistory }

