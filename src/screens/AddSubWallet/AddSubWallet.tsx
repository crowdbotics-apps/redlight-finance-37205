import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, ImageBackground, Platform, Text, TouchableOpacity, View } from "react-native";
import CheckBox from "react-native-check-box";
import LeftArrow from "../../assets/Icons/LeftArrow";
import Images from "../../assets/Images";
import CustomHeader from "../../components/CustomHeader";
import CustomInput from "../../components/CustomInput";
import PrimaryButton from "../../components/PrimaryButton";
import { addSubWallet } from "../../services/auth";
import { Colors } from "../../theme/Colors";
import { Strings } from "../../util/Strings";
import styles from "./styles";

const AddSubWallet = ({ route }: any) => {
    const { screen, refresh } = route.params
    const navigation = useNavigation()
    const [walletName, setWalletName] = useState<string>('')
    const [isDefault, setIsDefault] = useState(false)
    const goBackIconHandler = () => {
        return (
            navigation.goBack()
        )
    }
    const createButtonhandler = () => {
        const data = { wallet_name: walletName, is_default: isDefault }
        if (walletName !== "" && walletName !== undefined) {
            addSubWallet(data).then((response) => {
                setWalletName("")
                if (screen === "Walletscreen") {
                    navigation.navigate("WalletScreen")
                    refresh()
                }
                else {
                    // navigation.navigate("DashboardNavigaton", {refresh : "true"})
                    navigation.goBack()
                    refresh()
                }
            }).catch(error => {
                console.log(error.response)
            })
        }
        else {
            Alert.alert(Strings.PLEASE_ENTER_YOUR_WALLET_NAME)
        }
    }
    const cancelButtonHandler = () => {
        navigation.goBack()
    }
    return (
        <View>
            <ImageBackground source={Images.Background} resizeMode='cover' style={styles.Image}>
                <CustomHeader
                    name={Strings.ADD_SUB_WALLET}
                    Icon={<LeftArrow />}
                    isIconVisible={true}
                    headerStyle={{ marginTop: Platform.OS === 'ios' ? '12%' : 25 }}
                    onPress={goBackIconHandler} />
                <View style={styles.Container}>
                    <CustomInput
                        label="Account Name"
                        placeholder="Enter"
                        onChangeText={setWalletName}
                        value={undefined}
                        containerStyle={{ padding: "9%" }}
                        inputStyle={undefined}
                        leftIcon={false}
                        isleftIconVisible={false}
                        isRightIconVisible={false}
                        keyboardType={"default"}
                        secureTextEntry={false}
                    />
                    <CheckBox
                        checkedCheckBoxColor={Colors.RedBaron}
                        style={styles.checkBox}
                        onClick={() => setIsDefault(!isDefault)}
                        isChecked={isDefault}
                        uncheckedCheckBoxColor={Colors.Gray78}
                        rightText="Default Wallet"
                        rightTextStyle={styles.checkboxTextStyle}
                    />
                    <PrimaryButton
                        isLoading={false}
                        text="Create"
                        onPress={createButtonhandler}
                        style={{ paddingHorizontal: "5%", marginTop: "10%" }}
                        btnStyle={undefined}
                        disabled={undefined}
                    />
                    <TouchableOpacity onPress={cancelButtonHandler}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

export default AddSubWallet