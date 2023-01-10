import { useNavigation } from "@react-navigation/core";
import React, { useRef, useState } from "react";
import { View, TextInput, StyleSheet, ImageBackground, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import Images from "../../assets/Images";
import Circle from "../../components/Circle";
import Header from "../../components/Header";
import styles from './styles';
import { Colors } from "../../theme/Colors";
import CustomInput from "../../components/CustomInput";
import PrimaryButton from "../../components/PrimaryButton";
import { forgotPasswordSendEmailOtp, forgotPasswordSendPhoneOtp } from "../../services/auth";
import PhoneInput from "react-native-phone-number-input";
import { Fonts } from "../../assets/fonts";
import { isValidMobile, isValidEmail } from "../../util";
import Icons from "../../assets/Icons";

const ForgotPassword = () => {

    const [selectedTab, setSelectedTab] = useState<Number>(1)
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState<string>();
    const [countryCode, setCountryCode] = useState<string>();
    const [mode, setmode] = useState<Number>(1);
    const phoneInput = useRef<PhoneInput>(null);
    const navigation = useNavigation();
    const tabChangeHandler = () => {
        if (selectedTab === 1)
            setSelectedTab(2)
        else
            setSelectedTab(1)
    }
    const handleContinue = () => {
        validate();
        if (selectedTab === 1) {
            const data = { country_code: countryCode, phone_number: phoneNumber, screen: "forgotPassword" }
            forgotPasswordSendPhoneOtp(data).then(response => {
                if (response.message === 'OTP Send Successfully') {
                    console.log('res', response, 'data', data)
                    setPhoneNumber("")
                    navigation.navigate('CodeVerificationScreen', data)
                }
            }).catch(error => {
                console.log(error.response);
            })
        }
        else {
            const data = { email: email, screen: "forgotPassword", mode: 1 }
            forgotPasswordSendEmailOtp(data).then((response) => {
                console.log('res', response, 'data', data)
                setEmail("")
                navigation.navigate('CodeVerificationScreen', data)
            }).catch(error => {

                console.log(error.response);
            })
        }
    }

    const validate = () => {
        if (selectedTab === 1) {
            if (phoneNumber === undefined || phoneNumber === "") {
                Alert.alert("Please Enter your correct Phone Number");
                return
            }
        }
        else {
            if (email === "" || email === undefined || !isValidEmail(email)) {
                Alert.alert("Please Enter your correct Email");
            }
        }
    }
    return (
        <View style={{ marginTop: -10 }}>
            <ImageBackground source={Images.Rectangle} resizeMode="cover" style={styles.image}>
                <Header onPress={() => navigation.goBack()} isBackIconVisible={true} />
                <ScrollView style={styles.body} >
                    <Circle sourceImage={Images.Laptop} CircleStyle={styles.circle} />
                    <Text style={styles.headingText}>Forgot Password?</Text>
                    <View style={styles.tabContainer}>
                        <TouchableOpacity
                            style={[styles.tab,
                            { borderTopStartRadius: 10, borderBottomLeftRadius: 10 },
                            { backgroundColor: selectedTab === 1 ? Colors.RedBaron : Colors.EerieBlack }]}
                            onPress={selectedTab !== 1 ? tabChangeHandler : undefined}
                        >
                            <View>
                                <Text style={styles.tabText}>Phone number</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.tab,
                            { borderTopRightRadius: 10, borderBottomRightRadius: 10 },
                            { backgroundColor: selectedTab === 2 ? Colors.RedBaron : Colors.EerieBlack }]}
                            onPress={selectedTab !== 2 ? tabChangeHandler : undefined}
                        >
                            <View>
                                <Text style={styles.tabText}>Email</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        {selectedTab === 1 ? <Text style={styles.upperText}>Phone Number</Text> : null}
                        {selectedTab === 1 ? <PhoneInput
                            ref={phoneInput}
                            defaultValue={phoneNumber}
                            defaultCode="IN"
                            layout="first"
                            withShadow={true}
                            withDarkTheme={true}
                            onChangeText={setPhoneNumber}
                            onChangeFormattedText={() => setCountryCode('+' + phoneInput.current?.getCallingCode()?.toString())}
                            containerStyle={{ borderRadius: 10, marginTop: "5%", width: "99%", backgroundColor: Colors.aubergine, }}
                            textContainerStyle={{ backgroundColor: Colors.aubergine, borderRadius: 10, }}
                            codeTextStyle={{ color: Colors.Gray78, fontFamily: Fonts.PoppinsRegular, fontSize: 14, fontWeight: "400", lineHeight: 21 }} textInputStyle={{ color: Colors.Gray78, fontFamily: Fonts.PoppinsRegular, fontSize: 14, fontWeight: "400", lineHeight: 21 }} /> :
                            <CustomInput
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Email"
                                keyboardType="email-address" label={"Email"}
                                containerStyle={false}
                            />}
                    </View>
                    <PrimaryButton
                        isLoading={false}
                        text="Continue"
                        onPress={handleContinue} style={{ marginTop: "32%" }} />
                </ScrollView>
            </ImageBackground>
        </View>
    )
}

export default ForgotPassword;
