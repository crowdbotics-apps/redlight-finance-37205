import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import CheckBox from "react-native-check-box";
import { Fonts } from "../../assets/fonts";
import Icons from "../../assets/Icons";
import Images from "../../assets/Images";
import CustomInput from "../../components/CustomInput";
import PrimaryButton from "../../components/PrimaryButton";
import { addSubWallet } from "../../services/auth";
import { Colors } from "../../theme/Colors";
import styles from "./styles";

const AddSubWallet = () => {
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
        addSubWallet(data).then((response) => {
            setWalletName("")
            navigation.navigate("WalletScreen")
        }).catch(error => {
            console.log(error.response)
        })
    }
    const cancelButtonHandler = () => {
        navigation.navigate("WalletScreen")
    }
    return (
        <View>
            <ImageBackground source={Images.Background} resizeMode='cover' style={styles.Image}>
                <View style={{ display: "flex", flexDirection: "row", marginTop: "12%", width: "100%", padding: "5%" }}>
                    <TouchableOpacity onPress={goBackIconHandler}>
                        <Icons.LeftArrow />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: Fonts.PoppinsSemibold, fontSize: 18, fontWeight: "700", lineHeight: 27, color: Colors.white, marginLeft: "28%" }}>Add Sub Wallet</Text>
                </View>
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
                    />
                    <CheckBox
                        checkedCheckBoxColor={Colors.RedBaron}
                        style={styles.checkBox}
                        onClick={() => setIsDefault(!isDefault)}
                        isChecked={isDefault}
                        uncheckedCheckBoxColor = {Colors.Gray78}
                        rightText = "Default Wallet"
                        rightTextStyle = {styles.checkboxTextStyle}
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