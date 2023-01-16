import { useNavigation } from "@react-navigation/native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import React, { useState } from "react";
import { Alert, ImageBackground, Platform, Text, TouchableOpacity, View } from "react-native";
import LeftArrow from "../../assets/Icons/LeftArrow";
import Images from "../../assets/Images";
import CustomHeader from "../../components/CustomHeader";
import PrimaryButton from "../../components/PrimaryButton";
import { Strings } from "../../util/Strings";
import styles from "./styles";

const ConfirmPin = ({ route }: any) => {
    const code = route.params
    const navigation = useNavigation()
    const [pin, setPin] = useState<string>()
    const backArrowHandler = () => {
        navigation.goBack()
    }
    const setConfirmPinButtonHandler = () => {
        if (pin?.length === 6) {
            if (code === pin) {
                navigation.navigate("SettingScreen", { pinPopUp: true })
                setPin("")
            } else {
                Alert.alert(Strings.PIN_AND_CONFIRM_PIN_ARE_NOT_SAME)
            }
        } else {
            Alert.alert(Strings.PIN_SHOULD_BE_6_DIGITS)
        }
    }
    return (
        <View>
            <ImageBackground source={Images.Background} style={styles.image} resizeMode="cover">
                <CustomHeader
                    name={Strings.CONFIRM_PIN}
                    Icon={<LeftArrow />}
                    isIconVisible={true}
                    headerStyle={{ marginTop: Platform.OS === 'ios' ? '12%' : 25 }}
                    onPress={backArrowHandler}
                />
                <View style={styles.Container}>
                    <Text style={styles.contentText}>Massa posuere donec dolor amet molestie. Arcu euismod nam elementum gravida euismod.</Text>
                    <OTPInputView
                        style={styles.inputContainer}
                        pinCount={6}
                        code={pin}
                        onCodeChanged={setPin}
                        autoFocusOnLoad
                        codeInputFieldStyle={styles.textInput}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    />
                    <PrimaryButton
                        isLoading={false}
                        text="Confirm Pin"
                        onPress={setConfirmPinButtonHandler}
                        style={{ paddingHorizontal: "7%", marginTop: "15%" }}
                    />
                </View>
            </ImageBackground>
        </View>
    )
}

export default ConfirmPin
