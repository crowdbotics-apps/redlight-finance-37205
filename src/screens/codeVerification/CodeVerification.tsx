import React, { useState, useRef } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, Alert, Platform } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { useNavigation } from '@react-navigation/native'
import RBSheet from 'react-native-raw-bottom-sheet';
import styles from './styles'
import Images from '../../assets/Images'
import Header from '../../components/Header'
import Circle from '../../components/Circle'
import PrimaryButton from '../../components/PrimaryButton'
import BottomSheetContainer from './BottomsheetContainer';
import { Colors } from '../../theme/Colors'
import { sendEmailOTP, sendPhoneOTP, verifyEmailOTP, verifyPhoneOTP, signup, forgotPasswordVerifyEmailOtp, forgotPasswordVerifyPhonelOtp } from '../../services/auth'
import { Strings } from '../../util/Strings';

const CodeVerification = ({ route }) => {
    const { mode ,screen} = route.params
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isDisable, setIsDisable] = useState<boolean>(false)
    const [code, setCode] = useState<string>('')

    const refRBSheet = useRef();
    const navigation = useNavigation();

    const isDisabled = () => {
        if (code.length === 6) {
            return false
        }
        else {
            return true
        }
    }

    const moveToHome = () =>{
        refRBSheet.current.close() 
        navigation.navigate('DashboardNavigaton')
    }

    const resendHandler = () => {
        setIsDisable(true)
        if (mode === 1) {
            const { email } = route.params
            const data = {
                email: email
            }
            sendEmailOTP(data).then(response => {
                    if(response.message === Strings.EMAIL_SEND_SUCCESSFULLY){
                      setIsDisable(false)
                       Alert.alert(Strings.OTP_SENT_SUCCESSFULLY," ",
                            [
                                { text: "OK", onPress: () => console.log("OK Pressed") }
                            ]
                        )
                    }
                })
                .catch(error => {
                    setIsDisable(false)
                    console.log(error.response);
                })
        }
        else {
            const { phone_number } = route.params.user_profile
            const data = {
                phone_number: phone_number.substring(3,),
                country_code: phone_number.substring(0,3),
            }
            sendPhoneOTP(data).then(
                response =>{
                    if(response.message === Strings.OTP_SENT_SUCCESSFULLY){
                        setIsDisable(false)
                        Alert.alert(Strings.OTP_SENT_SUCCESSFULLY," ",
                            [
                                { text: "OK", onPress: () => console.log("OK Pressed") }
                            ]
                        )
                    }
                })
                .catch(error => {
                    setIsDisable(false)
                    console.log(error.response);
                })
        }
    }


    const verifyHandler = () => {
        setIsLoading(true)
        if (mode === 1) {
            const { email } = route.params
            const data = {
                email: email,
                otp: code
            }
            verifyEmailOTP(data).then(response =>{
                    if(response.status === 400){
                        Alert.alert(response?.data?.message)
                        return;
                    }
                    if(response.status === 202){
                        setIsLoading(false)
                        setCode('')
                        const user = { ...route.params }
                        delete user.mode
                        delete user.screen
                        signup(user).then(response => {
                            if(response?.email){
                                Alert.alert(response?.email[0])
                                return;
                            }
                            refRBSheet.current.open()
                        })
                            .catch(error => {
                                console.log(error.response);
                            })
                    }
                })
                .catch(error => {
                    setIsLoading(false)
                    console.log(error.response);
                })
        }
        else {
            const {phone_number } = route.params.user_profile
            const data = {
                phone_number: phone_number.substring(3,),
                country_code: phone_number.substring(0,3),
                otp: code
            }
            verifyPhoneOTP(data).then(response =>{
                    if(response.status === 400){
                        Alert.alert(response?.data?.message)
                        return;
                    }
                    if(response.status === 202){
                        setIsLoading(false)
                        setCode('')
                        const user = { ...route.params }
                        delete user.mode
                        delete user.screen
                        signup(user).then(response => {
        
                            if(response?.user_profile?.phone_number){
                                Alert.alert(response?.user_profile?.phone_number[0])
                                return;
                            }
                            refRBSheet.current.open()
                        })
                        .catch(error => {
                            console.log(error.response);
                        })     
                    }
                })
                .catch(error => {
                    setIsLoading(false)
                    console.log(error.response);
                })
        }
    }

    const verifyForgotPasswordHandler = () => {
        if (mode === 1) {
            const { email } = route.params
            const data = {
                email: email,
                otp: code
            }
            forgotPasswordVerifyEmailOtp(data).then(
                response => {
                    if(response?.status === 400){
                        Alert.alert(response.data?.message)
                        return
                    } 
                        console.log('res', response, 'data', data)
                        setIsLoading(false)
                        setCode("")
                        navigation.navigate('SetNewPasswordScreen', response)
                })
                .catch(error => {
                    console.log(error.response);
                });
        }
        else {
            const { country_code, phone_number } = route.params
            const data = {
                country_code: country_code,
                phone_number: phone_number,
                otp: code
            }
            forgotPasswordVerifyPhonelOtp(data).then(
                response => {
                    if (response?.status === 'success') {
                        console.log('res', response, 'data', data)
                        setIsLoading(false)
                        setCode("")
                        navigation.navigate('SetNewPasswordScreen', response)
                    }
                }
            ).catch(error => {
                console.log(error.response);
            });
        }
    }

    return (
        <View style={{ marginTop: -10 }}>
            <ImageBackground source={Images.Background} resizeMode="cover" style={styles.image}>
                <Header onPress={() => navigation.goBack()} isBackIconVisible={true} />

                <KeyboardAwareScrollView
                    style={styles.body}
                    contentContainerStyle={{ paddingBottom: 10 }}
                    extraScrollHeight={100}
                    bounces={false}
                    enableAutomaticScroll={true}
                >
                    <Circle sourceImage={Images.Verification} CircleStyle={styles.circle} />

                    <Text style={styles.headingText}>{Strings.CODE_VERIFICATION}</Text>

                    <Text
                        style={styles.subText}
                    >
                     {mode === 1 ? Strings.WE_SENT_YOU_AN_EMAIL : Strings.PLEASE_ENTER_6_DIGIT_CODE_TO_YOUR_PHONE}
                    </Text>

                    <OTPInputView
                        style={{ width: '100%', height: 150 }}
                        pinCount={6}
                        code={code}
                        onCodeChanged={newCode => setCode(newCode)}
                        autoFocusOnLoad
                        codeInputFieldStyle={styles.textInput}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    />

                    <View style={styles.resendContainer}>
                        <Text style={styles.text}>{Strings.DIDNT_RECEIVE_YOUR_CODE}</Text>
                        <TouchableOpacity 
                            onPress={resendHandler}
                            disabled={isDisable}
                        >
                            <Text style={[
                                styles.text,
                                { color: isDisable ? Colors.white : Colors.lightRed }]
                            }>
                                Resend {mode === 1 ? 'Email' : 'OTP'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <PrimaryButton
                        isLoading={isLoading}
                        disabled={isDisabled()}
                        text="Verify"
                        onPress={screen === 'signup' ? verifyHandler : verifyForgotPasswordHandler}
                        style={{ marginTop: Platform.OS === 'ios' ? '30%' : '25%' }}
                        btnStyle={{}}
                    />

                </KeyboardAwareScrollView>
            </ImageBackground>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={false}
                closeOnPressMask={false}
                height={450}
                customStyles={{
                    wrapper: {
                        //    backgroundColor  : "transparent"     
                    },
                    container: {
                        backgroundColor: Colors.aubergine,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        paddingHorizontal: 30
                    }
                }}
            >
                <BottomSheetContainer onPress={moveToHome} />
            </RBSheet>
        </View>
    )
}

export default CodeVerification
