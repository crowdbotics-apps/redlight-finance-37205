import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, ImageBackground, Modal, Text, TouchableOpacity, View } from "react-native";
import Icons from "../../assets/Icons";
import Images from "../../assets/Images";
import DeleteModal from "../../components/DeleteModal";
import { deleteAccount } from "../../services/auth";
import { removeItem } from "../../util";
import { Strings } from "../../util/Strings";
import styles from './styles'

const Setting = () => {
    const [isPopupVisible, setIsPopUpVisible] = useState(false)
    const [password, setPassword] = useState<string>("")
    const navigation = useNavigation();
    const ChangePassword = () => {
        navigation.navigate('ChangePasswordScreen')
    }
    const CreditLimits = () => {
        navigation.navigate('')
    }
    const SetPinCode = () => {
        navigation.navigate('')
    }
    const DeleteAccount = () => {
        setIsPopUpVisible(true)
    }
    const onDeleteAccountHandler = () => {
        const data = { "password": password }
        console.log(password, data)
        deleteAccount(data).then((response) => {
            console.log(response)
            if (response?.status == 400) {
                console.log("error occured")
                Alert.alert(Strings.incorrectPassword)
                return
            }
            console.log('res', response, 'data', data)
            setPassword("")
            removeItem("token")
            navigation.navigate("SigninScreen")
        })
    }
    const RowContainer = ({ tabName, onPressFunction }: any) => {
        return (
            <View style={styles.Tab}>
                <TouchableOpacity onPress={onPressFunction}>
                    <Text style={styles.tabName}>{tabName}</Text>
                </TouchableOpacity>
                <View>
                    <Icons.RightArrow />
                </View>
            </View>
        )
    }
    return (
        <View>
            <ImageBackground source={Images.Background} resizeMode='cover' style={styles.Image}>
                <Text style={styles.HeaderText}>Settings</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text>GoBack</Text>
                </TouchableOpacity>
                <View style={styles.Container}>
                    <Text style={styles.Heading}>Account</Text>
                    <RowContainer
                        tabName="Change Password"
                        onPressFunction={ChangePassword} />
                    <RowContainer
                        tabName="Credit Limits"
                        onPressFunction={CreditLimits} />
                    <Text style={styles.Heading}>Security</Text>
                    <RowContainer
                        tabName="Set PIN code"
                        onPressFunction={SetPinCode} />
                    <RowContainer
                        tabName="Enable Biometrics"
                        onPressFunction={ChangePassword} />
                    <TouchableOpacity onPress={DeleteAccount}>
                        <Text style={styles.deleteAccount}>Delete Account</Text>
                    </TouchableOpacity>
                    <DeleteModal
                        isPopupVisible={isPopupVisible}
                        Heading={Strings.deleteMsg}
                        buttonLabel="Delete Account"
                        setIsPopupVisible={setIsPopUpVisible}
                        password={password}
                        setPassword={setPassword}
                        onPressFunction={onDeleteAccountHandler} />
                </View>
            </ImageBackground>
        </View>
    )
}

export default Setting