import React,{useState,useRef} from 'react'
import {View,Text,ImageBackground,TouchableOpacity,Alert, Platform} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { useNavigation } from '@react-navigation/native'
import RBSheet from 'react-native-raw-bottom-sheet';
import styles from './styles'
import Images from '../../assets/Images'
import Header from '../../components/Header'
import Circle  from '../../components/Circle'
import PrimaryButton from '../../components/PrimaryButton'
import BottomSheetContainer from './BottomsheetContainer';
import { Colors } from '../../theme/Colors'
import { sendEmailOTP,sendPhoneOTP,verifyEmailOTP,verifyPhoneOTP,signup } from '../../services/auth'

const CodeVerification = ({route})=>{
    const [code,setCode] = useState<string>('')
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [isDisable,setIsDisable] = useState<boolean>(false)
    const {mode} = route.params   

    const refRBSheet = useRef();
    const navigation = useNavigation();
    
    const isDisabled = ()=>{
        if(code.length === 6){
            return false
        }
        else{
            return true
        }
    }

    const resendHandler = ()=>{
        setIsDisable(true)
        if(mode === 1){
            const {email} = route.params
            const data = {
                email : email
            }
            sendEmailOTP(data).then(
                response =>{
                    if(response.message === 'Email Send Successfully'){
                      setIsDisable(false)
                       Alert.alert('OTP sent successfully!!'," ",
                            [
                                { text: "OK", onPress: () => console.log("OK Pressed") } 
                            ]
                       )
                    }
            })
            .catch(error=>{
                setIsDisable(false)
                console.log(error.response); 
            })
        }
        else{
            const {phone_number} = route.params.user_profile
            const data = {
                phone_number: phone_number.substring(3,),
                country_code: phone_number.substring(0,3)
            }
            sendPhoneOTP(data).then(
                response =>{
                    if(response.message === 'OTP Send Successfully'){
                        setIsDisable(false)
                        Alert.alert('OTP sent successfully!!'," ",
                            [
                                { text: "OK", onPress: () => console.log("OK Pressed") } 
                            ]
                       )
                    }
            })
            .catch(error=>{
                setIsDisable(false)
                console.log(error.response); 
            })
        }
    }

    const verifyHandler = ()=>{
        setIsLoading(true)
        if(mode === 1){
            const {email} = route.params
            const data = {
                email : email,
                otp : code
            }
            verifyEmailOTP(data).then(
                response =>{
                    if(response.message === 'OTP Verification successful'){
                        setIsLoading(false)
                        setCode('')
                        const user = {...route.params}
                        delete user.mode
                        signup(user).then(response=>{
                            refRBSheet.current.open()
                        })
                        .catch(error=>{
                            console.log(error.response); 
                        })   
                    }
            })
            .catch(error=>{
                setIsLoading(false)
                console.log(error.response); 
            })
        }
        else{
            const {phone_number} = route.params.user_profile
            const data = {
                phone_number: phone_number.substring(3,),
                country_code: phone_number.substring(0,3),
                otp : code
            }
            verifyPhoneOTP(data).then(
                response =>{
                    if(response.message === 'OTP Verification Successful'){
                        setIsLoading(false)
                        setCode('')
                        const user = {...route.params}
                        delete user.mode
                        signup(user).then(response=>{
                            refRBSheet.current.open()
                        })
                        .catch(error=>{
                            console.log(error.response); 
                        })   
                    }
            })
            .catch(error=>{
                setIsLoading(false)
                console.log(error.response); 
            })
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
                    bounces = {false}
                    enableAutomaticScroll = {true}
                >
                    <Circle sourceImage={Images.Verification} CircleStyle={styles.circle}/>

                    <Text style={styles.headingText}>Code verification</Text>

                    <Text 
                        style={styles.subText}
                    >
                       We sent you an {mode === 1 ? 'Email' : 'OTP .'} Please enter the 6 - digit code below
                    </Text>

                    <OTPInputView
                        style={{width: '100%', height: 150}}
                        pinCount={6}
                        code={code} 
                        onCodeChanged = {newCode => setCode(newCode)}
                        autoFocusOnLoad
                        codeInputFieldStyle={styles.textInput}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    />

                    <View style={styles.resendContainer}>
                        <Text style={styles.text}>Didn’t receive your code?</Text>
                        <TouchableOpacity 
                            onPress={resendHandler}
                            disabled = {isDisable}
                        >
                            <Text style={[
                                styles.text,
                                {color : isDisable ? Colors.white : Colors.lightRed}]
                            }>
                                Resend {mode === 1 ? 'Email' : 'OTP'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <PrimaryButton
                        isLoading={isLoading}
                        disabled = {isDisabled()}
                        text = "Verify"
                        onPress = {verifyHandler}
                        style={{marginTop : Platform.OS === 'ios' ? '30%' : '25%'}}
                        btnStyle = {{}}
                    />

                </KeyboardAwareScrollView>
            </ImageBackground>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={false}
                closeOnPressMask={false}
                height = {450}
                customStyles={{
                wrapper: {
                //    backgroundColor  : "transparent"     
                },
                container : {
                    backgroundColor : Colors.aubergine,
                    borderTopLeftRadius : 20,
                    borderTopRightRadius : 20,
                    paddingHorizontal : 30
                }
                }}
              >
               <BottomSheetContainer onPress={()=>{refRBSheet.current.close()}}/>
            </RBSheet>
        </View>
    )
}

export default CodeVerification
