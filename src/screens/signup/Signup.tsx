import React,{useState} from 'react'
import {View,Text,ImageBackground,TouchableOpacity,Alert} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native'
import CheckBox from 'react-native-check-box'
import styles from './styles'
import Images from '../../assets/Images'
import Header from '../../components/Header'
import Circle  from '../../components/Circle'
import CustomInput  from '../../components/CustomInput'
import PrimaryButton from '../../components/PrimaryButton'
import {sendEmailOTP,sendPhoneOTP} from '../../services/auth'
import { isValidEmail,isValidPassword ,isValidUsername,isValidMobile,isValidName} from '../../util';
import { Colors } from '../../theme/Colors'

const Signup = ()=>{
    const[email,setEmail] = useState<string>('')
    const [mobileNumber,setMobileNumber] = useState<string>('')
    const [firstName,setFirstName] = useState<string>('')
    const [middleName,setMiddleName] = useState<string>('')
    const [lastName,setLastName] = useState<string>('')
    const [userName,setUserName] = useState<string>('')
    const [password,setPassword] = useState<string>('')
    const [confirmPassword,setConfirmPassword] = useState<string>('')
    const [isCheckboxChecked,setIsCheckboxChecked] = useState<boolean>(false)
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [mode,setMode] = useState<Number>(1)
    const [error,setError] = useState<string>('')

    const navigation = useNavigation();

    const modeChangeHandler = () =>{
        if(mode === 1)
            setMode(2)
        else 
            setMode(1)
    }

    const handleAllRequiredFields = ()=>{
        if(firstName && lastName && userName && password ){
            if(mode === 1){
                if(email)
                    return true
                else
                    setError("Email can't be empty!!")
                    return false
            }
            else{
                if(mobileNumber)
                    return true
                else
                    setError("Mobile number can't be empty!!")
                    return false
            }
        }
        else if(firstName === ''){
            setError("First name can't be empty!!")
            return false
        }
        else if(lastName === ''){
            setError("Last name can't be empty!!")
            return false
        }
        else if(userName === ''){
            setError("Username can't be empty!!")
            return false
        }
        else if(password === ''){
            setError("Password can't be empty!!")
            return false
        }
        setError('Input field is empty!!');
        return false
    }

    const handleNames = () =>{
        if(isValidName(firstName) && isValidName(lastName)){
            if(middleName !== ''){
                if(isValidName(middleName)){
                    return true
                }else{
                    setError('First,Middle and Last name must contain alphabets only!!')
                    return false;
                }
            }
            return true
        }
        else{
            setError('First,Middle and Last name must contain alphabets only!!')
            return false;
        }
    }

    const handleSamePassword = () =>{
        if(password && confirmPassword && password === confirmPassword){
            return true
        }
        else{
            setError('Password and confirm password are not same!!');
            return false
        }
    }

    const handleUsername = () =>{
        if(isValidUsername(userName)){
            return true
        }
        else{
            setError('Username can only contain alphabets,numbers and underscores.');
            return false
        }
    }

    const handlePassword = ()=>{
        if (isValidPassword(password)){
            return true
        }
        else{
            setError('Password should be 8 characters long.It must contain uppercase,lowercase,special characters and numbers.')
            return false
        }
    }

    const handleEmail = () =>{
        if(isValidEmail(email)){
            return true
        }
        else{
            setError('Email address is not valid!!')
            return false
        }
    }

    const handleMobileNumber = () =>{
        if(isValidMobile(mobileNumber)){
            return true;
        }
        else{
            setError('Mobile number must be of 10 digits.It must be preceded with country code. (e.g. "+91" for India)')
            return false
        }
    }

    const validDetails = ()=>{
        const isValid =  (handleAllRequiredFields() && handleNames() && handleSamePassword() && 
                           handleUsername() && handlePassword())
        if(mode === 1){
            return isValid && handleEmail();
        }
        else{
            return isValid && handleMobileNumber()
        }  
    }

    const signupHandler = ()=>{
        if(validDetails()){
            const userDetails = {
                first_name: firstName,
                last_name: lastName,
                user_profile: {
                    middle_name: middleName
                },
                password: password,
                username: userName,
                mode : mode
            }

            setIsLoading(true)
            if(mode === 1){
                userDetails.email = email   
                const data = {
                    email : email
                }
                sendEmailOTP(data).then(
                    response =>{ 
                        if(response.message === 'Email Send Successfully'){
                            setIsLoading(false)
                            setFirstName('')
                            setMiddleName('')
                            setLastName('')
                            setEmail('')
                            setUserName('')
                            setPassword('')
                            setConfirmPassword('')
                            setIsCheckboxChecked(false)
                            navigation.navigate('CodeVerificationScreen',userDetails)
                        }
                })
                .catch(error=>{
                    setIsLoading(false)
                    console.log(error.response); 
                })
            }
            else{
                userDetails.user_profile.phone_number = mobileNumber;
                const data = {
                    phone_number: mobileNumber.substring(3,),
                    country_code: mobileNumber.substring(0,3)
                }
                sendPhoneOTP(data).then(
                    response =>{
                        if(response.message === 'OTP Send Successfully'){
                            setIsLoading(false)
                            setFirstName('')
                            setMiddleName('')
                            setLastName('')
                            setMobileNumber('')
                            setUserName('')
                            setPassword('')
                            setConfirmPassword('')
                            setIsCheckboxChecked(false)
                            navigation.navigate('CodeVerificationScreen',userDetails)
                        }
                })
                .catch(error=>{
                    setIsLoading(false)
                    console.log(error.response); 
                })
            }
        }
        else{
            Alert.alert(error," ",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") } 
            ])
        }
    }
    
    return(
        <View style={{marginTop : -10}}>
            <ImageBackground source={Images.Background} resizeMode="cover" style={styles.image}>
                <Header onPress={()=>navigation.goBack()} isBackIconVisible={true}/>
                
                <KeyboardAwareScrollView 
                    style={styles.body} 
                    contentContainerStyle={{paddingBottom : 10}}
                    extraScrollHeight = {100}
                    enableAutomaticScroll = {true}
                >
                    <Circle sourceImage={Images.Laptop} CircleStyle={styles.circle}/>
                    <Text style={styles.headingText}>Register new account</Text>
 
                    <CustomInput
                        label = "First name"
                        value={firstName}
                        onChangeText = {setFirstName}
                        placeholder = "Firstname"
                    />
                    <CustomInput
                        label = "Middle name"
                        value={middleName}
                        onChangeText = {setMiddleName}
                        placeholder = "Middlename"
                    />
                    <CustomInput
                        label = "Last name"
                        value={lastName}
                        onChangeText = {setLastName}
                        placeholder = "Lastname"
                    />
                    { mode === 1 ? <CustomInput
                        label = "Email"
                        value={email}
                        onChangeText = {setEmail}
                        placeholder = "Email"
                        containerStyle={{marginBottom : 8}}
                    /> : 
                    <CustomInput
                        label = "Mobile phone"
                        value={mobileNumber}
                        onChangeText = {setMobileNumber}
                        placeholder = "Mobile number"
                        keyboardType= "number-pad"
                        containerStyle={{marginBottom : 8}}
                    />
                    }
                    <TouchableOpacity onPress = {modeChangeHandler}>
                        <Text style={styles.text}>Use {mode === 1 ? 'mobile number' : 'email'} instead?</Text>
                    </TouchableOpacity>

                     <CustomInput
                        label = "User name"
                        value={userName}
                        onChangeText = {setUserName}
                        placeholder = "Username"
                    />
                    <CustomInput
                        label = "Password"
                        value={password}
                        onChangeText = {setPassword}
                        isIconVisible = {true}
                        secureTextEntry = {true}
                        placeholder = "Password"
                        isRightIconVisible={true}
                    />
                    <CustomInput
                        label = "Confirm password"
                        value={confirmPassword}
                        onChangeText = {setConfirmPassword}
                        isIconVisible = {true}
                        secureTextEntry = {true}
                        placeholder = "Confirm Password"
                        isRightIconVisible={true}
                    />

                    <TouchableOpacity style={{marginTop : 10}}>
                        <Text 
                            style={styles.agreementText}
                        >
                            End User License and Agreements
                        </Text>
                    </TouchableOpacity>

                    <CheckBox
                        style={{flex: 1,marginVertical : 5}}
                        onClick={()=>setIsCheckboxChecked(!isCheckboxChecked)}
                        isChecked={isCheckboxChecked}
                        checkedCheckBoxColor = {Colors.RedBaron}
                        uncheckedCheckBoxColor = {Colors.Gray78}
                        rightText="I agree to the Terms and Conditions and Privacy Policy"
                        rightTextStyle = {styles.checkboxTextStyle}
                    />

                    <PrimaryButton
                        isLoading={isLoading}
                        disabled = {!isCheckboxChecked}
                        text = "Sign up"
                        onPress = {signupHandler}
                        style={{marginVertical : 20}}
                        btnStyle = {{}}
                    />
                </KeyboardAwareScrollView>
            </ImageBackground>
        </View>
    )
}

export default Signup
