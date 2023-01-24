import { useNavigation } from "@react-navigation/native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import React, { useState } from "react";
import { Alert, ImageBackground, Platform, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import LeftArrow from "../../assets/Icons/LeftArrow";
import Images from "../../assets/Images";
import CustomHeader from "../../components/CustomHeader";
import PrimaryButton from "../../components/PrimaryButton";
import { Strings } from "../../util/Strings";
import styles from './styles'

const SetPin = () => {
    const navigation = useNavigation()
    const [code, setCode] = useState<string>()
    const backArrowHandler = () => {
        navigation.goBack()
    }
    const setPinButtonHandler = () => {
        if (code?.length === 6) {
            navigation.navigate("ConfirmPinScreen", code)
        }
        else {
            Alert.alert(Strings.PIN_SHOULD_BE_6_DIGITS)
        }
    }
    return (
        <View>
            <ImageBackground source={Images.Background} style={styles.image} resizeMode="cover">
                <CustomHeader
                    name={Strings.SET_PIN}
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
                        code={code}
                        onCodeChanged={setCode}
                        autoFocusOnLoad
                        codeInputFieldStyle={styles.textInput}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    />
                    <PrimaryButton
                        isLoading={false}
                        text="Set Pin"
                        onPress={setPinButtonHandler}
                        style={{ paddingHorizontal: "7%", marginTop: "15%" }}
                    />
                </View>
            </ImageBackground>
        </View>
    )
}

export default SetPin
