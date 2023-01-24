import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, ImageBackground, Platform, SafeAreaView, Text, View } from "react-native";
import CheckBox from "react-native-check-box";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";
import Icons from "../../assets/Icons";
import LeftArrow from "../../assets/Icons/LeftArrow";
import Images from "../../assets/Images";
import CustomHeader from "../../components/CustomHeader";
import CustomInput from "../../components/CustomInput";
import PrimaryButton from "../../components/PrimaryButton";
import { deleteWallet, editSubWallet } from "../../services/auth";
import { Colors } from "../../theme/Colors";
import { Strings } from "../../util/Strings";
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
    const deleteSubWalletHandler = () => {
        deleteWallet(id).then((response) => {
            Alert.alert(walletName + " got deleted!")
            navigation.navigate("WalletScreen")
        }).catch(error => {
            console.log(error.response)
        })
    }
    return (
        <View>
            <ImageBackground source={Images.Background} resizeMode='cover' style={styles.Image}>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <CustomHeader
                        name={Strings.EDIT_SUB_WALLET}
                        Icon={<LeftArrow />}
                        isIconVisible={true}
                        headerStyle={{ marginTop: Platform.OS === 'ios' ? '12%' : 25 }}
                        onPress={goBackIconHandler}
                    />
                    <SvgXml
                        xml={Icons.Trash}
                        width={32}
                        height={32}
                        style={{ marginTop: "7%", }}
                        onPress={deleteSubWalletHandler}
                    />
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