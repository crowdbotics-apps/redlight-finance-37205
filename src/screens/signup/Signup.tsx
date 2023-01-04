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
import { Strings } from '../../util/Strings';

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
                    setError(Strings.EMAIL_CANT_BE_EMPTY)
                    return false
            }
            else{
                if(mobileNumber)
                    return true
                else
                    setError(Strings.MOBILE_CANT_BE_EMPTY)
                    return false
            }
        }
        else if(firstName === ''){
            setError(Strings.FIRST_NAME_CANT_BE_EMPTY)
            return false
        }
        else if(lastName === ''){
            setError(Strings.LAST_NAME_CANT_BE_EMPTY)
            return false
        }
        else if(userName === ''){
            setError(Strings.USERNAME_CANT_BE_EMPTY)
            return false
        }
        else if(password === ''){
            setError(Strings.PASSWORD_CANT_BE_EMPTY)
            return false
        }
        setError(Strings.INPUT_FIELD_IS_EMPTY);
        return false
    }

    const handleNames = () =>{
        if(isValidName(firstName) && isValidName(lastName)){
            if(middleName !== ''){
                if(isValidName(middleName)){
                    return true
                }else{
                    setError(Strings.NAME_MUST_CONTAIN_ALPHABETS_ONLY)
                    return false;
                }
            }
            return true
        }
        else{
            setError(Strings.NAME_MUST_CONTAIN_ALPHABETS_ONLY)
            return false;
        }
    }

    const handleSamePassword = () =>{
        if(password && confirmPassword && password === confirmPassword){
            return true
        }
        else{
            setError(Strings.PASSWORD_AND_CONFIRM_PASSWORD_ARE_NOT_SAME);
            return false
        }
    }

    const handleUsername = () =>{
        if(isValidUsername(userName)){
            return true
        }
        else{
            setError(Strings.USERNAME_MUST_CONATIN_APLHABETS_NUMBERS_AND_UNDERSCORES);
            return false
        }
    }

    const handlePassword = ()=>{
        if (isValidPassword(password)){
            return true
        }
        else{
            setError(Strings.PASSWORD_SHOULD_BE_8_CHARACTERS_LONG)
            return false
        }
    }

    const handleEmail = () =>{
        if(isValidEmail(email)){
            return true
        }
        else{
            setError(Strings.EMAIL_ADDRESS_IS_NOT_VALID)
            return false
        }
    }

    const handleMobileNumber = () =>{
        if(isValidMobile(mobileNumber)){
            return true;
        }
        else{
            setError(Strings.MOBILE_MUST_BE_OF_10_DIGITS)
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
                        if(response.message === Strings.EMAIL_SEND_SUCCESSFULLY){
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
                        if(response.message === Strings.OTP_SENT_SUCCESSFULLY){
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
                    <Text style={styles.headingText}>{Strings.REGISTER_NEW_ACCOUNT}</Text>
 
                    <CustomInput
                        label = {Strings.FIRST_NAME}
                        value={firstName}
                        onChangeText = {setFirstName}
                        placeholder = "Firstname"
                    />
                    <CustomInput
                        label = {Strings.MIDDLE_NAME}
                        value={middleName}
                        onChangeText = {setMiddleName}
                        placeholder = "Middlename"
                    />
                    <CustomInput
                        label = {Strings.LAST_NAME}
                        value={lastName}
                        onChangeText = {setLastName}
                        placeholder = "Lastname"
                    />
                    { mode === 1 ? <CustomInput
                        label = {Strings.EMAIL}
                        value={email}
                        onChangeText = {setEmail}
                        placeholder = "Email"
                        containerStyle={{marginBottom : 8}}
                    /> : 
                    <CustomInput
                        label = {Strings.MOBILE_PHONE}
                        value={mobileNumber}
                        onChangeText = {setMobileNumber}
                        placeholder = "Mobile number"
                        keyboardType= "number-pad"
                        containerStyle={{marginBottom : 8}}
                    />
                    }
                    <TouchableOpacity onPress = {modeChangeHandler}>
                        <Text style={styles.text}>{mode === 1 ? Strings.USE_MOBILE_NUMBER_INSTEAD : Strings.USE_EMAIL_INSTEAD}</Text>
                    </TouchableOpacity>

                     <CustomInput
                        label = {Strings.USER_NAME}
                        value={userName}
                        onChangeText = {setUserName}
                        placeholder = "Username"
                    />
                    <CustomInput
                        label = {Strings.PASSWORD}
                        value={password}
                        onChangeText = {setPassword}
                        isIconVisible = {true}
                        secureTextEntry = {true}
                        placeholder = {Strings.PASSWORD}
                        isRightIconVisible={true}
                    />
                    <CustomInput
                        label = {Strings.CONFIRM_PASSWORD}
                        value={confirmPassword}
                        onChangeText = {setConfirmPassword}
                        isIconVisible = {true}
                        secureTextEntry = {true}
                        placeholder = {Strings.CONFIRM_PASSWORD}
                        isRightIconVisible={true}
                    />

                    <TouchableOpacity style={{marginTop : 10}}>
                        <Text 
                            style={styles.agreementText}
                        >
                            {Strings.END_USER_LINCENSE_AND_AGREEMENTS}
                        </Text>
                    </TouchableOpacity>

                    <CheckBox
                        style={{flex: 1,marginVertical : 5}}
                        onClick={()=>setIsCheckboxChecked(!isCheckboxChecked)}
                        isChecked={isCheckboxChecked}
                        checkedCheckBoxColor = {Colors.RedBaron}
                        uncheckedCheckBoxColor = {Colors.Gray78}
                        rightText={Strings.I_AGREE_TO_TERMS_AND_PRIVACY_POLICY}
                        rightTextStyle = {styles.checkboxTextStyle}
                    />

                    <PrimaryButton
                        isLoading={isLoading}
                        disabled = {!isCheckboxChecked}
                        text = {Strings.SIGN_UP}
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
