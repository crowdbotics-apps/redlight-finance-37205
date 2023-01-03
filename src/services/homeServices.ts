import api, { getResponseErrorData } from './api'

const getAllWallets = async () => {
    try {
      const response = await api.get('wallets/')
      return response.data
    } catch (error) {
      return getResponseErrorData(error).data
    }
}

const getWalletQR = async (walletId : number) => {
    try {
      const response = await api.get(`wallet_qr_code/${walletId}/`)
      return response.data
    } catch (error) {
      return getResponseErrorData(error).data
    }
}


export {getAllWallets,getWalletQR}