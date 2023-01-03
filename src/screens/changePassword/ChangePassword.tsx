import React, { useState } from "react";
import { Alert, ImageBackground, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../../theme/Colors";
import Images from "../../assets/Images";
import styles from "./styles";
import CustomInput from "../../components/CustomInput";
import PrimaryButton from "../../components/PrimaryButton";
import { changePassword } from "../../services/auth";
import { isValidPassword, removeItem, setItem } from "../../util";
import { useNavigation } from "@react-navigation/core";

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState();
    const [newPassword, setNewPassword] = useState<any>();
    const [confirmPassword, setConfirmPassword] = useState<any>();
    const navigation = useNavigation();

    const updatePassword = () => {
        const data = { old_password: currentPassword, password1: newPassword, password2: confirmPassword }
        if (!isValidPassword(newPassword) || !isValidPassword(confirmPassword)) {
            Alert.alert("Weak Password")
            return
        }
        if (newPassword === confirmPassword) {
            console.log("password matched")
            changePassword(data).then((response) => {
                if (response?.status == 400) {
                    console.log(response)
                    Alert.alert("Current Password is incorrect!")
                    return
                }
                console.log('res', response, 'data', data)
                setNewPassword("")
                setConfirmPassword("")
                Alert.alert("Password Changed successfully")
                removeItem("token")
                setItem("token", response?.token)
            }).catch(error => {
                console.log(error.response);
            })
        }
        else {
            Alert.alert("Password doesn't match")
            return
        }
    }
    return (
        <View>
            <ImageBackground source={Images.Background} resizeMode='cover' style={styles.image}>
                <Text style={styles.HeaderText}>Change Password</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text>GoBack</Text>
                </TouchableOpacity>
                <View style={{ width: "98%", height: "90%", marginTop: "10%", backgroundColor: Colors.phoneInputBackground, borderRadius: 10 }}>
                    <View style={styles.children}>
                        <View style={styles.elevation}>
                            <CustomInput
                                label="Current Password"
                                placeholder="somestrongpasssword"
                                isRightIconVisible={true}
                                onChangeText={setCurrentPassword}
                                value={currentPassword}
                                containerStyle={{ elevation: 40 }}
                            />
                        </View>
                        <CustomInput
                            label="New Password"
                            placeholder="somestrong_passsword345"
                            isRightIconVisible={true}
                            onChangeText={setNewPassword}
                            value={newPassword}
                            containerStyle={{ elevation: 20 }}
                        />
                        <CustomInput
                            label="Confirm New Password"
                            placeholder="somestrong_passsword345"
                            isRightIconVisible={true}
                            onChangeText={setConfirmPassword}
                            value={confirmPassword}
                            containerStyle={{ elevation: 20 }}
                        />
                    </View>
                    <PrimaryButton
                        text="Update Password"
                        isLoading={false}
                        onPress={updatePassword}
                        btnStyle={{ marginTop: "54%", width: "88%", alignSelf: 'center' }} />
                </View>
            </ImageBackground>
        </View>
    )
}

export default ChangePassword