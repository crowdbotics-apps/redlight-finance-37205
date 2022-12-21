import AsyncStorage from "@react-native-async-storage/async-storage"

export const setItem = async (key, value) => {
    return await AsyncStorage.setItem(key, value)
  }
  
  export const getItem = async key => {
    return await AsyncStorage.getItem(key)
  }
  
  export const removeItem = async key => {
    return await AsyncStorage.removeItem(key)
  }

export const isValidName = (name : string) =>{
    const NameRegex = /^[A-Za-z]+$/
    if(name.match(NameRegex)){
        return true
    }
    else{
        return false
    }
}

export const isValidUsername = (username : string) =>{
    if(/^[a-zA-Z0-9_]+$/.test(username)){
        return true
    }
    else{
        return false
    }
}

export const isValidPassword = (password :string) => {
    if (/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)){
        return true
    }
    else{
        return false
    }
}

export const isValidEmail = (email : string) =>{
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(email.toLowerCase().match(emailRegex)){
        return true
    }
    else{
        return false
    }
}

export const isValidMobile = (mobile :string ) => {
    if(mobile.substring(3,).length === 10 && /^\d+$/.test(mobile.substring(1,)) && mobile.charAt(0) === '+'){
        return true;
    }
    else{
        return false
    }
}