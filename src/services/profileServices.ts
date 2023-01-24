import api, { getResponseErrorData,apiMultipart } from './api'


const uploadPhoto = async (imageFile:any) => {
    try {
      const formData = new FormData();
      let splitedArray = imageFile.split('/')
      let fileName = splitedArray.pop()
      formData.append('image', {
        uri: imageFile,
        name: fileName,
        type: 'image/jpeg'
      });
      const response = await apiMultipart.patch(`user_profile/`,formData)
      return response.data
    } catch (error) {
      return getResponseErrorData(error).data
    }
}

export {uploadPhoto}