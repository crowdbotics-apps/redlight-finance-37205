import React,{useState,useRef} from 'react'
import {View,Text,ImageBackground,TextInput,TouchableOpacity,Alert, Platform} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
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
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [isDisable,setIsDisable] = useState<boolean>(false)
    const {mode} = route.params   
    const [pin1,setPin1] = useState<string>()
    const [pin2,setPin2] = useState<string>()
    const [pin3,setPin3] = useState<string>()
    const [pin4,setPin4] = useState<string>()
    const [pin5,setPin5] = useState<string>()
    const [pin6,setPin6] = useState<string>()

    const pin1ref = useRef();
    const pin2ref = useRef();
    const pin3ref = useRef();
    const pin4ref = useRef();
    const pin5ref = useRef();
    const pin6ref = useRef();
    const refRBSheet = useRef();
    const navigation = useNavigation();
    
    const isDisabled = ()=>{
        if( pin1 && pin2 && pin3 && pin4 && pin5 && pin6){
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
                otp : pin1 + pin2 + pin3 + pin4 + pin5 + pin6
            }
            verifyEmailOTP(data).then(
                response =>{
                    if(response.message === 'OTP Verification successful'){
                        setIsLoading(false)
                        setPin1('')
                        setPin2('')
                        setPin3('')
                        setPin4('')
                        setPin5('')
                        setPin6('')
                        pin1ref.current.focus()
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
                otp : pin1 + pin2 + pin3 + pin4 + pin5 + pin6
            }
            verifyPhoneOTP(data).then(
                response =>{
                    if(response.message === 'OTP Verification Successful'){
                        setIsLoading(false)
                        setPin1('')
                        setPin2('')
                        setPin3('')
                        setPin4('')
                        setPin5('')
                        setPin6('')
                        pin1ref.current.focus()
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

                    <View 
                        style={styles.textInputContainer} 
                    >
                        <TextInput
                            ref = {pin1ref}
                            style={styles.textInput}
                            onChangeText={(newPin)=>{
                                setPin1(newPin)
                                if(pin1 !== '' )
                                    pin2ref.current.focus()
                            }}
                            value={pin1}
                            maxLength={1}
                            selectionColor = {Colors.white}
                            caretHidden = {true}
                            keyboardType = "number-pad"
                        />
                        <TextInput
                            ref = {pin2ref}
                            style={styles.textInput}
                            onChangeText={(newPin)=>{
                                setPin2(newPin)
                                if(pin2 !== '')
                                    pin3ref.current.focus()
                            }}
                            value={pin2}
                            maxLength={1}
                            selectionColor = {Colors.white}
                            caretHidden={true}
                            keyboardType = "number-pad"
                        />
                        <TextInput
                            ref = {pin3ref}
                            style={styles.textInput}
                            onChangeText={(newPin)=>{
                                setPin3(newPin)
                                if(pin3 !== '')
                                    pin4ref.current.focus()
                            }}
                            value={pin3}
                            maxLength={1}
                            selectionColor = {Colors.white}
                            caretHidden={true}
                            keyboardType = "number-pad"
                        />
                        <TextInput
                            ref = {pin4ref}
                            style={styles.textInput}
                            onChangeText={(newPin)=>{
                                setPin4(newPin)
                                if(pin4 !== '')
                                    pin5ref.current.focus()
                            }}
                            value={pin4}
                            maxLength={1}
                            selectionColor = {Colors.white}
                            caretHidden={true}
                            keyboardType = "number-pad"
                        />
                        <TextInput
                            ref = {pin5ref}
                            style={styles.textInput}
                            onChangeText={(newPin)=>{
                                setPin5(newPin)
                                if(pin5 !== '')
                                    pin6ref.current.focus()
                            }}
                            value={pin5}
                            maxLength={1}
                            selectionColor = {Colors.white}
                            caretHidden={true}
                            keyboardType = "number-pad"
                        />
                        <TextInput
                            ref = {pin6ref}
                            style={styles.textInput}
                            onChangeText={(newPin)=>setPin6(newPin)}
                            value={pin6}
                            maxLength={1}
                            selectionColor = {Colors.white}
                            caretHidden={true}
                            keyboardType = "number-pad"
                        />

                    </View>

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
