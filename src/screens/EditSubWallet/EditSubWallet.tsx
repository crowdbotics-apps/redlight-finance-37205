import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ImageBackground, Text, View } from "react-native";
import CheckBox from "react-native-check-box";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";
import Icons from "../../assets/Icons";
import Images from "../../assets/Images";
import CustomInput from "../../components/CustomInput";
import PrimaryButton from "../../components/PrimaryButton";
import { editSubWallet } from "../../services/auth";
import { Colors } from "../../theme/Colors";
import styles from "./styles";

const EditSubwallet = ({ route }: any) => {
    const navigation = useNavigation()
    const { wallet_name, id, is_default } = route.params
    const [walletName, setWalletName] = useState<String>(wallet_name)
    const [isDefault, setIsDefault] = useState<boolean>(is_default)
    const goBackIconHandler = () => {
        navigation.goBack()
    }
    const saveButtonHandler = () => {
        const data = { wallet_name: walletName, is_default: isDefault }
        editSubWallet(data, id).then((response) => {
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
                <View style={styles.Header}>
                    <TouchableOpacity onPress={goBackIconHandler}>
                        <Icons.LeftArrow />
                    </TouchableOpacity>
                    <Text style={styles.HeaderText}>Edit Sub Wallet</Text>
                    <TouchableOpacity onPress={() => { }}>
                        <SvgXml
                            xml={Icons.Trash}
                            width={30}
                            height={30}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.Container}>
                    <CustomInput
                        label="Account Name"
                        placeholder="Enter"
                        onChangeText={setWalletName}
                        value={walletName}
                        containerStyle={{ padding: "9%" }}
                        inputStyle={undefined}
                        leftIcon={false}
                        isleftIconVisible={false}
                        isRightIconVisible={false}
                        keyboardType={"default"}
                    />
                    <CheckBox
                        checkBoxColor={Colors.Gray78}
                        style={styles.checkBox}
                        onClick={() => setIsDefault(!isDefault)}
                        isChecked={isDefault}
                        checkedCheckBoxColor={Colors.RedBaron}
                        uncheckedCheckBoxColor={Colors.Gray78}
                        rightText="Default wallet"
                        rightTextStyle={styles.checkboxTextStyle}
                    />
                    <PrimaryButton
                        isLoading={false}
                        text="Save"
                        onPress={saveButtonHandler}
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

export default EditSubwallet